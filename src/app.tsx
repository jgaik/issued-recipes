import React from "react";
import { NavigationBarLayout } from "@yamori-design/react-components";
import "./app.scss";

export const App: React.FC = () => {
  return (
    <NavigationBarLayout
      links={[]}
      githubHref="https://github.com/jgaik/issued-recipes"
    >
      <div className="app" />
    </NavigationBarLayout>
  );
};
