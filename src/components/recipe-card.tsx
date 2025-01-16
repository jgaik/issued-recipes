import React, { ComponentRef, useLayoutEffect, useRef } from "react";
import { IssuedRecipe } from "../types";
import { Link } from "react-router";
import "./recipe-card.scss";

export const RecipeCard: React.FC<IssuedRecipe> = ({
  id,
  title,
  // description,
}) => {
  const linkRef = useRef<ComponentRef<typeof Link>>(null);
  const sectionRef = useRef<ComponentRef<"section">>(null);
  const imgRef = useRef<ComponentRef<"img">>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !imgRef.current) return;

    const img = imgRef.current;

    const observer = new ResizeObserver(([entry]) => {
      img.style.height = `${entry.contentRect.height}px`;
    });

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <article
      className="recipe-card"
      onClick={() => {
        linkRef.current?.click();
      }}
      role="presentation"
    >
      <section ref={sectionRef}>
        <h5>
          <Link aria-hidden ref={linkRef} to={id.toString()}>
            {title}
          </Link>
        </h5>
        {/* <p>{description}</p> */}
      </section>
      {/* {picture && <img ref={imgRef} src={picture} alt={title} />} */}
    </article>
  );
};
