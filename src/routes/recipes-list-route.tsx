import { Suspense } from "react";
import { getRecipes } from "../api";
import { RecipesList } from "../components";

export const RecipesListRoute: React.FC = () => {
  const recipesResource = getRecipes();

  return (
    <Suspense fallback={"Recipes loading"}>
      <RecipesList recipesResource={recipesResource} />
    </Suspense>
  );
};
