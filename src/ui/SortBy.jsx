import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options, value }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSort = searchParams?.get(value);

  function handleChange(e) {
    searchParams.set(value, e.target.value || selectedSort);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      onChange={handleChange}
      $type={"white"}
      value={selectedSort || ""}
    />
  );
}
