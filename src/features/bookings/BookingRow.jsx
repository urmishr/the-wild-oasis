import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";

import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiEye,
  HiMiniArrowLeftCircle,
  HiMiniTrash,
  HiOutlineEllipsisVertical,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useUpdateCheckOut } from "./../check-in-out/useUpdateCheckOut";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Spinner from "../../ui/Spinner";
import { useDeleteBooking } from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    // created_at,
    startDate,
    endDate,
    numNights,
    // numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const { isCheckingOut, checkOut } = useUpdateCheckOut();
  const { isDeletingBooking, deleteBooking } = useDeleteBooking();

  if (isCheckingOut) return <Spinner />;
  function handleCheckout() {
    const checkOutData = {
      status: "checked-out",
    };

    checkOut({ id: bookingId, obj: checkOutData });
  }

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} icon={<HiOutlineEllipsisVertical />} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
              $iconColor={"#1C86EE"}
            >
              Details
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                $iconColor={"#3CB371"}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check In
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                icon={<HiMiniArrowLeftCircle />}
                onClick={handleCheckout}
                $iconColor={"#F90"}
              >
                Check out
              </Menus.Button>
            )}
            <Modal.Open opens={"deleteBooking"} overlay="true">
              <Menus.Button icon={<HiMiniTrash />} $iconColor={"#F00"}>
                Delete
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name={"deleteBooking"}>
            <ConfirmDelete
              resourceName={"Booking"}
              onConfirm={() => deleteBooking(bookingId)}
              isDeleting={isDeletingBooking}
              disabled={isDeletingBooking}
            ></ConfirmDelete>
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
