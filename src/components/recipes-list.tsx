import React from "react";
import { RecipeCard } from "./recipe-card";
import { api } from "../api";
import { Loading } from "@yamori-design/react-components";
import "./recipe-list.scss";

export const RecipesList: React.FC = () => {
  const { data: recipes, isLoading } = api.useGetRecipesQuery();

  if (isLoading) return <Loading />;

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
