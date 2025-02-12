import React, { useMemo } from "react";
import { useSearchParams } from "react-router";
import { RecipeCard } from "./recipe-card";
import { api } from "../api";
import { Loading } from "@yamori-design/react-components";
import "./recipes-list.scss";

export const RecipesList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { data: recipes, isLoading } = api.useGetRecipesQuery();

  const filteredRecipes = useMemo(() => {
    if (searchParams.has("q") || searchParams.has("category")) {
      const queries = searchParams.get("q")?.split(" ");
      const categories = searchParams.get("category")?.split(" ");

      return recipes?.filter(({ category, query }) => {
        const matchCategory = categories?.includes(category) ?? true;
        const matchQuery = queries?.every((q) => query.includes(q)) ?? true;

        return matchCategory && matchQuery;
      });
    }

    return recipes;
  }, [recipes, searchParams]);

  return (
    <ul className="recipes-list">
      {isLoading && (
        <li>
          <Loading />
        </li>
      )}
      {filteredRecipes?.map((recipe) => (
        <li key={recipe.id}>
          <RecipeCard {...recipe} />
        </li>
      ))}
    </ul>
  );
};
