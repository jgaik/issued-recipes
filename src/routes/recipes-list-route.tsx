import { RecipesFilter, RecipesList } from "../components";

export const RecipesListRoute: React.FC = () => {
  return (
    <>
      <title>Issued Recipes</title>
      <RecipesFilter />
      <RecipesList />
    </>
  );
};
