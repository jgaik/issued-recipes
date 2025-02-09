import { RecipeFilter, RecipesList } from "../components";

export const RecipesListRoute: React.FC = () => {
  return (
    <div>
      <title>Issued Recipes</title>
      <RecipeFilter />
      <RecipesList />
    </div>
  );
};
