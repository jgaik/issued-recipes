import React from "react";
import { NavigationBarLayout } from "@yamori-design/react-components";
import { Route, Routes, useNavigate } from "react-router";
import { RecipeRoute, RecipesListRoute } from "./routes";
import { ErrorBoundary } from "react-error-boundary";
import "./app.scss";

export const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <NavigationBarLayout
      links={[
        {
          children: "Recipes",
          href: location.origin + "/issued-recipes",
          onClick: (e) => {
            e.preventDefault();
            navigate("/");
          },
        },
      ]}
      githubHref="https://github.com/jgaik/issued-recipes"
    >
      <ErrorBoundary onError={alert} fallback={"Error"}>
        <Routes>
          <Route path="/" element={<RecipesListRoute />} />
          <Route path="/:id" element={<RecipeRoute />} />
        </Routes>
      </ErrorBoundary>
    </NavigationBarLayout>
  );
};
