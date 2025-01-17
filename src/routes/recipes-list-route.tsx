import { Suspense } from "react";
import { getRecipes } from "../api";
import { RecipesList } from "../components";

const recipes = getRecipes();

export const RecipesListRoute: React.FC = () => {
  return (
    <Suspense fallback={"Recipes loading"}>
      <RecipesList recipesResource={recipes} />
    </Suspense>
  );
};
