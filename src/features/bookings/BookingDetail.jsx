import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "./../../ui/Spinner";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingById } from "./useBookingById";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  HiArrowDownOnSquare,
  HiExclamationCircle,
  HiMiniTrash,
} from "react-icons/hi2";
import { useUpdateCheckOut } from "../check-in-out/useUpdateCheckOut";
import SpinnerApi from "../../ui/SpinnerApi";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Error = styled.h1`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  & svg {
    color: #ff2d2d;
  }
`;

function BookingDetail() {
  const { isPending, booking } = useBookingById();

  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { isCheckingOut, checkOut } = useUpdateCheckOut();
  const { isDeletingBooking, deleteBooking } = useDeleteBooking();
  if (isPending) return <Spinner />;
  if (!booking)
    return (
      <Error>
        <HiExclamationCircle />
        <span> No Booking could be found</span>
      </Error>
    );
  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check In
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            onClick={() =>
              checkOut({ id: bookingId, obj: { status: "checked-out" } })
            }
          >
            {isCheckingOut ? <SpinnerApi $margin={5} /> : "Check out"}
          </Button>
        )}
        <Modal>
          <Modal.Open opens={"deleteConfirm"}>
            <Button $variation={"danger"}>
              <HiMiniTrash /> <span>Delete </span>
            </Button>
          </Modal.Open>
          <Modal.Window name={"deleteConfirm"}>
            <ConfirmDelete
              resourceName={"Booking"}
              isDeleting={isDeletingBooking}
              disabled={isDeletingBooking}
              onConfirm={() => {
                deleteBooking(bookingId, {
                  onSettled: () => navigate("/bookings"),
                });
              }}
            />
          </Modal.Window>
        </Modal>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
