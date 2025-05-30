import styled from "styled-components";
import Tag from "../../ui/Tag";

import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { HiMiniMoon, HiOutlineArrowDownCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useUpdateCheckOut } from "./useUpdateCheckOut";
import SpinnerApi from "../../ui/SpinnerApi";
import Modal from "../../ui/Modal";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 8rem 2rem 1fr 6rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

const Nights = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;
export default function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;
  const { isCheckingOut, checkOut } = useUpdateCheckOut();
  return (
    <StyledTodayItem>
      {status === "unconfirmed" ? (
        <Tag type="green">Arriving</Tag>
      ) : (
        <Tag type="blue">Departing</Tag>
      )}
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.nationality}`} />
      <Guest>{guests.fullName}</Guest>
      <Nights>
        {numNights} <HiMiniMoon />
      </Nights>
      {status === "unconfirmed" && (
        <Button
          $size="small"
          $variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check In
        </Button>
      )}

      {status === "checked-in" && (
        <Button
          $size="small"
          $variation="danger"
          disabled={isCheckingOut}
          onClick={() => checkOut({ id, obj: { status: "checked-out" } })}
        >
          {isCheckingOut ? <SpinnerApi /> : "Check Out"}
        </Button>
      )}
    </StyledTodayItem>
  );
}
