import styled from "styled-components";

import Row from "./Row";
import Heading from "./Heading";

import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 3rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
`;
export default function Header() {
  return (
    <StyledHeader>
      <HeaderMenu />
    </StyledHeader>
  );
}
