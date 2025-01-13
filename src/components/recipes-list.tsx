import React, { use } from "react";
import { Link } from "react-router";
import { getRecipes } from "../api";

const recipesResource = getRecipes();

export const RecipesList: React.FC = () => {
  const recipes = use(recipesResource);

  return (
    <ul>
      {recipes?.map((recipe) => (
        <li key={recipe.id}>
          <Link to={`${recipe.id}`}>{recipe.title}</Link>
        </li>
      ))}
    </ul>
  );
};
