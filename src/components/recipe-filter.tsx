import {
  Button,
  MultiSelect,
  SearchInput,
} from "@yamori-design/react-components";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { useAppSelector } from "../store";

export const RecipeFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useAppSelector((state) => state.data.categories);

  const [filterValues, setFilterValues] = useState({
    q: searchParams.get("q") ?? "",
    category: decodeURIComponent(searchParams.get("category") ?? ""),
  });

  return (
    <div>
      <SearchInput
        placeholder="Search"
        value={filterValues.q}
        onChange={(q) => setFilterValues((prev) => ({ ...prev, q }))}
      />
      <MultiSelect
        value={
          categories.length > 0 && filterValues.category.length > 0
            ? filterValues.category.split(",")
            : []
        }
        onChange={(categories) =>
          setFilterValues((prev) => ({
            ...prev,
            category: categories.join(","),
          }))
        }
      >
        {categories.map((category) => (
          <MultiSelect.Option key={category} value={category}>
            {category}
          </MultiSelect.Option>
        ))}
      </MultiSelect>
      <Button
        onClick={() =>
          setSearchParams((prev) => {
            Object.entries(filterValues).forEach(([key, val]) => {
              if (val) prev.set(key, val);
            });

            return prev;
          })
        }
      >
        Apply Filter
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          setSearchParams((prev) => {
            Object.keys(filterValues).forEach((key) => {
              prev.delete(key);
            });
            return prev;
          });
          setFilterValues({
            q: "",
            category: "",
          });
        }}
        disabled={!Object.values(filterValues).some(Boolean)}
      >
        Clear Filter
      </Button>
    </div>
  );
};
