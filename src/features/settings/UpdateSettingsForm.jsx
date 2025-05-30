import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "./../../ui/Spinner";
import { useUpdateSettings } from "./useUpdateSettings";
function UpdateSettingsForm() {
  const { settings, isSettingsLoading } = useSettings();
  const { isUpdatingSettings, updateSettings } = useUpdateSettings();

  function handleEvent(e, type) {
    const isSame = settings[type] === Number(e.target.value);

    const newData = {
      [type]: Number(e.target.value),
    };

    if (!isSame) return updateSettings(newData);
  }
  if (isSettingsLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          defaultValue={settings?.minBookingLength}
          id="min-nights"
          disabled={isUpdatingSettings}
          onBlur={(e) => handleEvent(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          defaultValue={settings?.maxBookingLength}
          disabled={isUpdatingSettings}
          onBlur={(e) => handleEvent(e, "maxBookingLength")}
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdatingSettings}
          onBlur={(e) => handleEvent(e, "maxGuestPerBooking")}
          defaultValue={settings?.maxGuestPerBooking}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdatingSettings}
          onBlur={(e) => handleEvent(e, "breakfastPrice")}
          defaultValue={settings?.breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
