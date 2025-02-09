import { useParams } from "react-router";
import { api, skipToken } from "../api";
import { Recipe } from "../components";
import { Loading } from "@yamori-design/react-components";

export const RecipeRoute: React.FC = () => {
  const { id } = useParams();

  const { data: recipe, isLoading } = api.useGetRecipeQuery(
    id ? parseInt(id) : skipToken
  );

  if (isLoading || !recipe) return <Loading />;

  return <Recipe {...recipe} />;
};
