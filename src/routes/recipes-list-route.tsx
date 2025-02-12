import { RecipeFilter, RecipesList } from "../components";

export const RecipesListRoute: React.FC = () => {
  return (
    <>
      <title>Issued Recipes</title>
      <RecipeFilter />
      <RecipesList />
    </>
  );
};
