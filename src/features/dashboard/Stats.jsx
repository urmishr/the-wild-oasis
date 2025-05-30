import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiMiniArrowTrendingUp,
  HiOutlineArrowDownCircle,
  HiOutlineBanknotes,
  HiOutlineBriefcase,
} from "react-icons/hi2";
export default function Stats({
  recentBookings,
  confirmedStays,
  numNights,
  cabinsTotal,
}) {
  const totalBooking = recentBookings.length;

  const sales = recentBookings?.reduce(
    (prevSale, currentSale) => prevSale + currentSale.totalPrice,
    0,
  );

  const totalCheckIns = confirmedStays?.length;

  const occupancy =
    (confirmedStays?.reduce((acc, curr) => acc + curr.numNights, 0) /
      (numNights * cabinsTotal)) *
    100;

  return (
    <>
      <Stat
        title={"Bookings"}
        color={"blue"}
        value={totalBooking}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title={"Check Ins"}
        color={"indigo"}
        value={totalCheckIns}
        icon={<HiOutlineArrowDownCircle />}
      />
      <Stat
        title={"Occupancy Rate"}
        color={"yellow"}
        value={`${Math.round(occupancy)}%`}
        icon={<HiMiniArrowTrendingUp />}
      />
      <Stat
        title={"Sales"}
        color={"green"}
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
      />
    </>
  );
}
