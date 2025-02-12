import { useState } from "react";
import { IssuedRecipe } from "../types";
import { Button, List, NumberInput } from "@yamori-design/react-components";
import { CloseIcon } from "@yamori-design/icons";
import "./recipe.scss";

export const Recipe: React.FC<IssuedRecipe> = ({
  title,
  description,
  ingredients,
  steps,
  portions,
  picture,
}) => {
  const [currentPortions, setCurrentPortions] = useState(portions);

  return (
    <article className="recipe">
      <title>{`${title} • Issued Recipes `}</title>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {picture && (
        <img
          src={picture}
          alt={title}
          style={{ maxWidth: "100%", aspectRatio: "1 / 1" }}
        />
      )}
      <h3>Ingredients</h3>
      <label>
        <b>Portions:</b>
        <NumberInput
          value={currentPortions}
          onChange={(value) => setCurrentPortions(value ?? portions)}
          size={4}
          suffix={
            <Button
              className="reset-portions-button"
              variant="text"
              onClick={() => setCurrentPortions(portions)}
              disabled={portions === currentPortions}
            >
              <CloseIcon />
            </Button>
          }
          min={0}
          step={portions}
        />
      </label>
      <List bulleted>
        {ingredients.map(({ name, amount, unit }) => (
          <List.Item
            key={name}
            label={`${name}: ${
              Math.round(((amount * currentPortions) / portions) * 100) / 100
            } ${unit ?? ""}`}
          />
        ))}
      </List>
      <h3>Steps</h3>
      <List ordered>
        {steps.map(({ order: key, description: value }) => (
          <List.Item key={key} label={value} />
        ))}
      </List>
    </article>
  );
};
