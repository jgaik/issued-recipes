import React, { use } from "react";
import { RecipeCard } from "./recipe-card";
import { IssuedRecipe } from "../types";
import "./recipe-list.scss";

type RecipesListProps = {
  recipesResource: Promise<IssuedRecipe[]>;
};

export const RecipesList: React.FC<RecipesListProps> = ({
  recipesResource,
}) => {
  const recipes = use(recipesResource);

  return (
    <ul className="recipe-list">
      {recipes?.map((recipe) => (
        <li key={recipe.id}>
          <RecipeCard {...recipe} />
        </li>
      ))}
    </ul>
  );
};
