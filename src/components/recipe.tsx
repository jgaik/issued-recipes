import { ComponentRef, useMemo, useRef } from "react";
import { IssuedRecipe } from "../types";
import { Button, List, NumberInput } from "@yamori-design/react-components";
import { CloseIcon } from "@yamori-design/icons";
import { useSearchParams } from "react-router";
import { isNil } from "@yamori-shared/react-utilities";
import "./recipe.scss";

export const Recipe: React.FC<IssuedRecipe> = ({
  title,
  description,
  ingredients,
  steps,
  portions,
  picture,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const numberInputRef = useRef<ComponentRef<typeof NumberInput>>(null);

  const currentPortions = useMemo(() => {
    const paramsPortions = searchParams.get("portions");

    if (paramsPortions) return parseFloat(paramsPortions);
    return portions;
  }, [portions, searchParams]);

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
      <label className="recipe__portions">
        <b>Portions:</b>
        <NumberInput
          ref={numberInputRef}
          value={currentPortions}
          onChange={(value) => {
            const nextParams = new URLSearchParams();
            if (!isNil(value) && value !== portions) {
              nextParams.set("portions", value.toString());
            }
            setSearchParams(nextParams, { replace: true });
          }}
          size={4}
          min={0}
          step={portions}
        />
        <Button
          aria-label="Reset portions"
          className="recipe__reset-portions"
          variant="text"
          onClick={() => {
            setSearchParams(new URLSearchParams(), { replace: true });
            numberInputRef.current?.focus();
          }}
          disabled={portions === currentPortions}
          title="Reset"
        >
          <CloseIcon />
        </Button>
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
