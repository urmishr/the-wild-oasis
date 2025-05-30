import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import {
  Area,
  AreaChart,
  CartesianAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Heading from "../../ui/Heading";

import { useDarkMode } from "../../contexts/DarkModeContext";
import { eachDayOfInterval, subDays, format, isSameDay } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

export default function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  const eachDays = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = eachDays.map((day) => {
    return {
      label: format(day, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(day, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(day, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extraPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as={"h2"}>
        Sales from {format(eachDays.at(0), "MMM dd yyyy")} to{" "}
        {format(eachDays.at(-1), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer height={300} width={"100%"}>
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis
            dataKey={"label"}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit={"$"}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Area
            dataKey={"totalSales"}
            stroke={colors.totalSales.stroke}
            type={"monotone"}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total Sales"
            unit={"$"}
          />
          <Area
            dataKey={"extrasSales"}
            type={"monotone"}
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras Sales"
            unit={"$"}
          />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}
