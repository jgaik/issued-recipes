import React, { ComponentRef, useRef } from "react";
import { IssuedRecipe } from "../types";
import { Link } from "react-router";
import { Card } from "@yamori-design/react-components";
import "./recipe-card.scss";

export const RecipeCard: React.FC<IssuedRecipe> = ({
  id,
  title,
  description,
  picture,
}) => {
  const linkRef = useRef<ComponentRef<typeof Link>>(null);

  return (
    <Card
      className="recipe-card"
      onClick={() => {
        linkRef.current?.click();
      }}
      role="presentation"
      header={
        <Link ref={linkRef} to={id.toString()}>
          {title}
        </Link>
      }
      image={picture ? <img src={picture} alt={title} /> : null}
    >
      {description}
    </Card>
  );
};
