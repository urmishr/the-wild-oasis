import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "./../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabin } from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "./../check-in-out/TodayActivity";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { isLoadingRecentBooking, recentBookings } = useRecentBookings();
  const { recentStays, isLoadingRecentStays, confirmedStays, getDays } =
    useRecentStays();
  const { cabins, isPending } = useCabin();

  if (isLoadingRecentBooking || isLoadingRecentStays || isPending)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings}
        confirmedStays={confirmedStays}
        numNights={getDays}
        cabinsTotal={cabins.length}
      />
      <TodayActivity />
      <DurationChart stays={recentStays} />
      <SalesChart bookings={recentBookings} numDays={getDays} />
    </StyledDashboardLayout>
  );
}
