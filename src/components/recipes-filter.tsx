import {
  Button,
  MultiSelect,
  SearchInput,
} from "@yamori-design/react-components";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useAppSelector } from "../store";
import { FilterIcon } from "@yamori-design/icons";
import { BemClassNamesCreator } from "@yamori-shared/react-utilities";
import "./recipes-filter.scss";

export const RecipesFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useAppSelector((state) => state.data.categories);

  const [searchValue, setSearchValue] = useState(searchParams.get("q") ?? "");
  const [showFilter, setShowFilter] = useState(false);
  const [filterValues, setFilterValues] = useState({
    category: decodeURIComponent(searchParams.get("category") ?? ""),
  } satisfies Record<string, string>);

  const bemClassNames = BemClassNamesCreator.create(
    "recipes-filter",
    undefined,
    "filter",
    "buttons"
  );

  useEffect(() => {
    if (!searchValue) {
      setSearchParams((prev) => {
        prev.delete("q");
        return prev;
      });

      return;
    }

    const timeoutId = setTimeout(
      () =>
        setSearchParams((prev) => {
          prev.set("q", searchValue.trim().replace(/\s+/, " ").toLowerCase());
          return prev;
        }),
      500
    );

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchValue, setSearchParams]);

  return (
    <div className={bemClassNames["recipes-filter"]}>
      <SearchInput
        placeholder="Search"
        value={searchValue}
        onChange={setSearchValue}
      />
      <Button
        aria-expanded={showFilter}
        aria-controls="filter"
        onClick={() => setShowFilter(!showFilter)}
      >
        <FilterIcon />
      </Button>
      {showFilter && (
        <div className={bemClassNames["filter"]} id="filter">
          <label htmlFor="category">Category: </label>
          <MultiSelect
            id="category"
            placeholder="Select category"
            value={
              categories.length > 0 && filterValues.category.length > 0
                ? filterValues.category.split(" ")
                : []
            }
            onChange={(categories) =>
              setFilterValues((prev) => ({
                ...prev,
                category: categories.join(" "),
              }))
            }
          >
            {categories.map((category) => (
              <MultiSelect.Option key={category} value={category}>
                {category}
              </MultiSelect.Option>
            ))}
          </MultiSelect>
          <div className={bemClassNames["buttons"]}>
            <Button
              onClick={() => {
                setSearchParams((prev) => {
                  Object.entries(filterValues).forEach(([key, val]) => {
                    prev.set(key, val);
                  });
                  return prev;
                });
              }}
            >
              Apply
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
                  category: "",
                });
              }}
              disabled={!Object.values(filterValues).some(Boolean)}
            >
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
