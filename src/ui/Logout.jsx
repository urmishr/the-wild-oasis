import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useLogout } from "../features/authentication/useLogout";
import SpinnerApi from "./SpinnerApi";

export default function Logout() {
  const { isPending, logout } = useLogout();
  return (
    <ButtonIcon onClick={logout} disabled={isPending}>
      {isPending ? (
        <SpinnerApi $colorHex={"#5046E5"} />
      ) : (
        <HiArrowRightOnRectangle />
      )}
    </ButtonIcon>
  );
}
