import { Suspense } from "react";
import { useParams } from "react-router";
import { getRecipe } from "../api";
import { Recipe } from "../components";

export const RecipeRoute: React.FC = () => {
  const { id } = useParams();

  const resource = getRecipe(Number(id));

  return (
    <Suspense fallback={"Recipe loading"}>
      <Recipe recipeResource={resource} />
    </Suspense>
  );
};
