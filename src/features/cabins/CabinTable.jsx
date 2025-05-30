import Spinner from "./../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

import { useCabin } from "./useCabin";

export default function CabinTable() {
  const { cabins, error, isPending } = useCabin();
  const [searchParams] = useSearchParams();

  //filtering cabins
  const filterDiscount = searchParams.get("discount") || "all";

  let filteredCabins;

  if (filterDiscount)
    filteredCabins = cabins?.filter((cabin) =>
      filterDiscount === "no-discount"
        ? cabin.discount === 0
        : filterDiscount === "with-discount"
          ? cabin.discount > 0
          : cabin,
    );

  // sorting cabin

  const sortBy = searchParams.get("sortBy") || "name-asc";

  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins?.sort((a, b) => {
    const valA = a[field];
    const valB = b[field];

    if (typeof valA === "string" && typeof valB === "string") {
      return valA.localeCompare(valB) * modifier;
    } else {
      return (valA - valB) * modifier;
    }
  });

  if (isPending) return <Spinner />;
  if (error) return <pre>{error?.message}</pre>;

  if (!sortedCabins.length) return <Empty resourceName={"Cabins"} />;
  return (
    <Menus>
      <Table $columns="0.5fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
