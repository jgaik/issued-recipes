import React, { Suspense } from "react";
import { NavigationBarLayout } from "@yamori-design/react-components";
import { Route, Routes, useNavigate } from "react-router";
import { RecipesList } from "./components";
import { RecipeRoute } from "./routes";
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
      <Suspense fallback={"Loading"}>
        <Routes>
          <Route path="/" element={<RecipesList />} />
          <Route path="//:id" element={<RecipeRoute />} />
        </Routes>
      </Suspense>
    </NavigationBarLayout>
  );
};
