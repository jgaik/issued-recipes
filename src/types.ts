import { Nullable } from "@yamori-shared/react-utilities";

export type IssuedRecipe = {
  id: number;
  title: string;
  description: Nullable<string>;
  category: string;
  portions: number;
  ingredients: Array<string>;
  steps: Array<string>;
  picture: Nullable<string>;
};
