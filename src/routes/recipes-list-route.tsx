import { Suspense } from "react";
import { getRecipes } from "../api";
import { RecipesList } from "../components";

export const RecipesListRoute: React.FC = () => {
  const recipes = getRecipes();

  return (
    <Suspense fallback={"Recipes loading"}>
      <RecipesList recipesResource={recipes} />
    </Suspense>
  );
};
