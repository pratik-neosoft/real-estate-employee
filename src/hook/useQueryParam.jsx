import { useCallback } from "react";
import { useLocation } from "react-router-dom";

export const useQueryParam = (query) => {
  const location = useLocation();

  const setQuery = useCallback(
    (value) => {
      console.log(value, location, query);
    },
    [location, query]
  );

  return [location.search, setQuery];
};
