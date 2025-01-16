import { request } from "@octokit/request";
import { IssuedRecipe } from "./types";
import { getNonNullable, Nullable } from "@yamori-shared/react-utilities";

const COMMON_FETCH_PROPS = {
  owner: "jgaik",
  repo: "issued-recipes",
};

// type IssuedRecipeBodyInfo = Pick<
//   IssuedRecipe,
//   "description" | "category" | "portions" | "ingredients" | "steps" | "picture"
// >;

// function parseIssueBody(body: string): IssuedRecipeBodyInfo {
//   const checkResponse = (value: string) =>
//     /_no response_/i.test(value) ? null : value;

const parsedBody = (body: string) =>
  Object.fromEntries(
    body.matchAll(/### (.+)/g).map((match) => {
      const startIdx = match.index + match[0].length;

      let endIdx: Nullable<number> = body.indexOf("###", startIdx);

      if (endIdx === -1) endIdx = undefined;

      return [match[1].toLowerCase(), body.slice(startIdx, endIdx).trim()];
    })
  );

//   return {
//     description: checkResponse(parsedBody.description),
//     category: parsedBody.category,
//     portions: Number(parsedBody.portions),
//     ingredients: parsedBody.ingredients.split(/[\r\n]+/).map((ingredient) => {
//       const { name, amount, unit } =
//         /^- *(?<name>[^:]+): *(?<amount>(?:[0-9]*[.])?[0-9]+) *(?<unit>[a-zA-Z]+)?$/.exec(
//           ingredient
//         )?.groups ?? {};

//       return {
//         name,
//         unit,
//         amount: Number(amount),
//       };
//     }),
//     steps: parsedBody.steps.split(/[\r\n]+/).map((step) => {
//       const { order, description } =
//         /^(?<order>\d). *(?<description>.+)$/.exec(step)?.groups ?? {};
//       return { order, description };
//     }),
//     picture: checkResponse(parsedBody.picture)?.match(/\((.+)\)/)?.[1],
//   };
// }

function mapIssueToRecipe(issue: {
  number: number;
  title: string;
  body?: string | null;
}): IssuedRecipe {
  alert(parsedBody(getNonNullable(issue.body, "issue body")));
  return {
    id: issue.number,
    title: issue.title,
    // ...parseIssueBody(getNonNullable(issue.body, "issue body")),
  };
}

let recipesCache: Record<number, IssuedRecipe | Promise<IssuedRecipe>> = {};

export async function getRecipes() {
  const issuedRecipes = await request(
    "GET /repos/{owner}/{repo}/issues",
    COMMON_FETCH_PROPS
  ).then(({ data }) => data.map(mapIssueToRecipe));

  recipesCache = Object.fromEntries(
    issuedRecipes.map((recipe) => [recipe.id, recipe])
  );

  return issuedRecipes;
}

export async function getRecipe(id: number) {
  if (recipesCache[id]) return recipesCache[id];

  const issuedRecipe = request(
    "GET /repos/{owner}/{repo}/issues/{issue_number}",
    {
      ...COMMON_FETCH_PROPS,
      issue_number: id,
    }
  ).then(({ data }) => mapIssueToRecipe(data));

  recipesCache[id] = issuedRecipe;

  return issuedRecipe;
}
