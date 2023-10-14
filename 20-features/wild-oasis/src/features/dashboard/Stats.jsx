import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;

  //Total Sales:
  const sales = bookings.reduce((acc, cur) => {
    return acc + cur.totalPrice;
  }, 0);

  //Total check ins:
  const checkIns = confirmedStays.length;

  //Occupancy Rate (number of checked in nights/ all available nights = (numNights*numCabins))
  const occupancy = confirmedStays.reduce((acc, cur) => {
    return acc + cur.numNights;
  }, 0);

  const occupancyRate = (occupancy / (numDays * cabinCount)) * 100;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupancyRate)} %`}
      />
    </>
  );
}

export default Stats;
