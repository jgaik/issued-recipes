import { request } from "@octokit/request";
import { IssuedRecipe } from "./types";
import {
  assertNonNullable,
  getNonNullable,
  getTypedObjectKeys,
} from "@yamori-shared/react-utilities";

const COMMON_FETCH_PROPS = {
  owner: "jgaik",
  repo: "issued-recipes",
};

type IssuedRecipeBodyInfo = Pick<
  IssuedRecipe,
  "description" | "category" | "portions" | "ingredients" | "steps" | "picture"
>;

function parseIssueBody(body: string): IssuedRecipeBodyInfo {
  const regExpGenerators: Record<keyof IssuedRecipeBodyInfo, string> = {
    description: "Short Description",
    category: "Category",
    portions: "Portions",
    ingredients: "Ingredients",
    steps: "Steps",
    picture: "Picture",
  };

  const checkResponse = (value: string) =>
    /_no response_/i.test(value) ? null : value;

  const getRegExpString = (key: keyof IssuedRecipeBodyInfo) =>
    `### ${regExpGenerators[key]}(?<${key}>.+)`;

  const regExpMatch = new RegExp(
    getTypedObjectKeys(regExpGenerators).map(getRegExpString).join("") + "$",
    "s"
  ).exec(body);

  assertNonNullable(regExpMatch, "issue body regexp match");

  const { description, category, portions, ingredients, steps, picture } =
    getNonNullable(regExpMatch.groups, "matched groups");

  return {
    description: checkResponse(description.trim()),
    category: category.trim(),
    portions: Number(portions),
    ingredients: ingredients.trim().split(/[\r\n]+/),
    steps: steps.trim().split(/[\r\n]+/),
    picture: checkResponse(picture.trim())?.match(/\((.+)\)/)?.[1],
  };
}

function mapIssueToRecipe(issue: {
  number: number;
  title: string;
  body?: string | null;
}): IssuedRecipe {
  return {
    id: issue.number,
    title: issue.title,
    ...parseIssueBody(getNonNullable(issue.body, "issue body")),
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
