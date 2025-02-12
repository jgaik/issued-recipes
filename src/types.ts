import { Endpoints } from "@octokit/types";
import { Nullable } from "@yamori-shared/react-utilities";

export type RecipeStep = {
  order: string;
  description: string;
  steps?: Array<RecipeStep>;
};

export type RecipeIngredient = {
  name: string;
  amount: number;
  unit: Nullable<string>;
};

export type IssuedRecipe = {
  id: number;
  title: string;
  description: Nullable<string>;
  category: string;
  portions: number;
  ingredients: Array<RecipeIngredient>;
  steps: Array<RecipeStep>;
  picture: Nullable<string>;
  query: string;
};

export type GitHubIssue =
  Endpoints["GET /repos/{owner}/{repo}/issues/{issue_number}"]["response"]["data"];
