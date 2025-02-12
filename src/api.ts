import { Octokit, RequestError } from "octokit";
import { GitHubIssue, IssuedRecipe } from "./types";
import { getNonNullable, Nullable } from "@yamori-shared/react-utilities";
import { createApi, skipToken } from "@reduxjs/toolkit/query/react";
import { Endpoints, RequestParameters } from "@octokit/types";

const octokit = new Octokit();

type IssuedRecipeBodyInfo = Pick<
  IssuedRecipe,
  "description" | "category" | "portions" | "ingredients" | "steps" | "picture"
>;

function parseIssueBody(body: string): IssuedRecipeBodyInfo {
  const checkResponse = (value: string) =>
    /_no response_/i.test(value) ? null : value;

  const parsedBody = Object.fromEntries(
    getNonNullable(body.match(/### (.+)/g), "body with ###").map((match) => {
      const startIdx = body.indexOf(match) + match.length;

      let endIdx: Nullable<number> = body.indexOf("###", startIdx);

      if (endIdx === -1) endIdx = undefined;

      return [
        match.replace("### ", "").toLowerCase(),
        body.slice(startIdx, endIdx).trim(),
      ];
    })
  );

  return {
    description: checkResponse(parsedBody.description),
    category: parsedBody.category,
    portions: Number(parsedBody.portions),
    ingredients: parsedBody.ingredients.split(/[\r\n]+/).map((ingredient) => {
      const { name, amount, unit } =
        /^- *(?<name>[^:]+): *(?<amount>(?:[0-9]*[.])?[0-9]+) *(?<unit>[a-zA-Z]+)?$/.exec(
          ingredient
        )?.groups ?? {};

      return {
        name,
        unit,
        amount: Number(amount),
      };
    }),
    steps: parsedBody.steps.split(/[\r\n]+/).map((step) => {
      const { order, description } =
        /^(?<order>\d). *(?<description>.+)$/.exec(step)?.groups ?? {};
      return { order, description };
    }),
    picture: checkResponse(parsedBody.picture)?.match(/\((.+)\)/)?.[1],
  };
}

function mapIssueToRecipe({
  title,
  number: id,
  body,
}: GitHubIssue): IssuedRecipe {
  const recipeBody = parseIssueBody(getNonNullable(body, "issue body"));

  return {
    id,
    title,
    ...recipeBody,
    query: [title, recipeBody.description, recipeBody.category]
      .join(" ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase(),
  };
}

export const api = createApi({
  baseQuery: (args: [keyof Endpoints] | [keyof Endpoints, RequestParameters]) =>
    octokit
      .request(args[0], args[1])
      .then(({ data }) => ({ data }))
      .catch((error: RequestError) => ({ error })),
  tagTypes: ["Issues"],
  endpoints: (builder) => ({
    getRecipes: builder.query<IssuedRecipe[], void>({
      query: () => [
        "GET /repos/{owner}/{repo}/issues",
        {
          owner: "jgaik",
          repo: "issued-recipes",
        },
      ],
      transformResponse: (result: GitHubIssue[]) =>
        result.map(mapIssueToRecipe),
      providesTags: (result) =>
        result?.map(({ id }) => ({ type: "Issues", id })) ?? ["Issues"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then(({ data }) => {
          data.map((recipe) =>
            dispatch(api.util.upsertQueryData("getRecipe", recipe.id, recipe))
          );
        });
      },
    }),
    getRecipe: builder.query<IssuedRecipe, number>({
      query: (issueNumber) => [
        "GET /repos/{owner}/{repo}/issues/{issue_number}",
        {
          owner: "jgaik",
          repo: "issued-recipes",
          issue_number: issueNumber,
        },
      ],
      transformResponse: mapIssueToRecipe,
      providesTags: (_, __, id) => [{ type: "Issues", id }],
    }),
  }),
});

export { skipToken };
