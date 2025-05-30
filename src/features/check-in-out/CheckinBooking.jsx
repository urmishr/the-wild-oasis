import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import CheckBox from "./../../ui/CheckBox";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingById } from "../bookings/useBookingById";
import Spinner from "../../ui/Spinner";
import SpinnerApi from "../../ui/SpinnerApi";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useUpdateCheckIn } from "./useUpdateCheckIn";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { settings, isSettingsLoading } = useSettings();
  const { isPending, booking } = useBookingById();
  const { isUpdatingCheckIn, updateCheckin } = useUpdateCheckIn();
  const moveBack = useMoveBack();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
    setAddBreakfast(booking?.hasBreakfast ?? false);
  }, [booking]);

  if (isPending || isSettingsLoading) return <Spinner />;
  const breakfastPrice = settings?.breakfastPrice;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    status,
  } = booking;

  const totalBreakfastPrice = numGuests * numNights * breakfastPrice;

  function handleCheckin() {
    let newData;
    if (!hasBreakfast && addBreakfast) {
      newData = {
        isPaid: true,
        status: "checked-in",
        extraPrice: totalBreakfastPrice,
        hasBreakfast: true,
        totalPrice: totalPrice + totalBreakfastPrice,
      };
    } else {
      newData = {
        isPaid: true,
        status: "checked-in",
      };
    }

    const updateCheckInData = { id: bookingId, obj: newData };

    updateCheckin(updateCheckInData);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <CheckBox
          onChange={() => {
            setAddBreakfast((add) => !add);
            setConfirmPaid(false);
          }}
          checked={addBreakfast}
          id="addBreakfast"
          disabled={addBreakfast}
        >
          Add additional breakfast option for{" "}
          {formatCurrency(totalBreakfastPrice)} ( {numGuests} Guests /{" "}
          {numNights} night).
        </CheckBox>
      </Box>
      <Box>
        <CheckBox
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          checked={confirmPaid}
          id="confirm"
          disabled={confirmPaid}
        >
          I Confirm that booking {guests.fullName} has paid total of{" "}
          {addBreakfast
            ? `${formatCurrency(totalPrice + totalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(totalBreakfastPrice)})`
            : `${formatCurrency(totalPrice)}`}
        </CheckBox>
      </Box>

      <ButtonGroup>
        {status !== "checked-in" && (
          <Button onClick={handleCheckin} disabled={!confirmPaid}>
            {isUpdatingCheckIn ? (
              <SpinnerApi $margin={4} />
            ) : (
              `Check in booking #${bookingId}`
            )}
          </Button>
        )}
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
