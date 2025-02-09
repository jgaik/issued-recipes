import { RecipesList } from "../components";

export const RecipesListRoute: React.FC = () => {
  return [
    <title key="title">Issued Recipes</title>,
    <RecipesList key="recipes-list" />,
  ];
};
