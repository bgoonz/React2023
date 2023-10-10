import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "./../../ui/TableOperations";
function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "Full Price" },
          { value: "with-discount", label: "Discounted" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          {
            value: "regularPrice-asc",
            label: "Sort by price (from lowest to highest)",
          },
          {
            value: "regularPrice-desc",
            label: "Sort by price (from highest to lowest)",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by capacity (from lowest to highest)",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort by capacity (from highest to lowest)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
