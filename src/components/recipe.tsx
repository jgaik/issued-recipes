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
        <img src={picture} alt={title} style={{ maxWidth: "100%" }} />
      )}
      <h3>Ingredients</h3>
      <b>Portions: {portions}</b>
      <List>
        {ingredients.map((ingredient) => (
          <List.Item key={ingredient} label={ingredient} />
        ))}
      </List>
      <h3>Steps</h3>
      <List ordered>
        {steps.map((step) => (
          <List.Item key={step} label={step} />
        ))}
      </List>
    </article>
  );
};
