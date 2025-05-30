import styled from "styled-components";
import Heading from "./Heading";
import GlobalStyles from "../styles/GlobalStyles";
import Button from "./Button";

import DarkModeToggle from "./DarkModeToggle";

const StyledErrorFallback = styled.main`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: indianred;
  }
`;

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyles />

      <StyledErrorFallback>
        <Box>
          <Heading as={"h1"}>Something Went wrong 🧐</Heading>
          <p>{error.message}</p>
          <Button $size="large" onClick={resetErrorBoundary}>
            Try Again
          </Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}
