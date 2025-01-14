import React, { use } from "react";
import { getRecipes } from "../api";
import { RecipeCard } from "./recipe-card";
import "./recipe-list.scss";

const recipesResource = getRecipes();

export const RecipesList: React.FC = () => {
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
