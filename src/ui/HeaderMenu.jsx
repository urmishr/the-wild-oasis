import styled from "styled-components";
import Logout from "./Logout";

import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import UserAvatar from "../features/authentication/UserAvatar";
import DarkModeToggle from "./DarkModeToggle";

const StyledList = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

export default function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledList>
      <li>
        <UserAvatar />
      </li>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledList>
  );
}
