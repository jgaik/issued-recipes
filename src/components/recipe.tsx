import { use } from "react";
import { IssuedRecipe } from "../types";
import { List } from "@yamori-design/react-components";

type RecipeProps = {
  recipeResource: Promise<IssuedRecipe>;
};

export const Recipe: React.FC<RecipeProps> = ({ recipeResource }) => {
  const { title, description, ingredients, steps, portions, picture } =
    use(recipeResource);

  return (
    <article>
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
      <b>Portions: {portions}</b>
      <List>
        {ingredients.map(({ name, amount, unit }) => (
          <List.Item key={name} label={`${name}: ${amount} ${unit ?? ""}`} />
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
