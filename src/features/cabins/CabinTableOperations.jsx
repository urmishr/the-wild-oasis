import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterName="discount"
        options={[
          { label: "All", value: "all" },
          { label: "No Discount", value: "no-discount" },
          { label: "With Discount", value: "with-discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by Name (A-Z)" },
          { value: "name-dec", label: "Sort by Name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by Price (low-high)" },
          { value: "regularPrice-dec", label: "Sort by Price (high-low)" },
          { value: "maxCapacity-asc", label: "Sort by Capacity (low-high)" },
          { value: "maxCapacity-dec", label: "Sort by Capacity (high-low)" },
        ]}
        value={"sortBy"}
      />
    </TableOperations>
  );
}
