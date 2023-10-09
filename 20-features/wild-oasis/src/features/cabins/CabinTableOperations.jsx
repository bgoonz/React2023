import Filter from "../../ui/Filter";
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
    </TableOperations>
  );
}

export default CabinTableOperations;
