import { useLocation } from "react-router-dom";

export const useQueryParam = () => {
  const location = useLocation();

  return [location.search];
};
