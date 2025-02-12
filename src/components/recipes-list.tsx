import React from "react";
import { RecipeCard } from "./recipe-card";
import { api } from "../api";
import { Loading } from "@yamori-design/react-components";
import "./recipes-list.scss";

export const RecipesList: React.FC = () => {
  const { data: recipes, isLoading } = api.useGetRecipesQuery();

  return (
    <ul className="recipes-list">
      {isLoading && (
        <li>
          <Loading />
        </li>
      )}
      {recipes?.map((recipe) => (
        <li key={recipe.id}>
          <RecipeCard {...recipe} />
        </li>
      ))}
    </ul>
  );
};
