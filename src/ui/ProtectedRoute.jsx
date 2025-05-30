import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Fullpage = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isPending, fetchStatus } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isPending && fetchStatus !== "fetching")
      navigate("/login");
  }, [isAuthenticated, navigate, isPending, fetchStatus]);

  if (isPending)
    return (
      <Fullpage>
        <Spinner />
      </Fullpage>
    );

  if (isAuthenticated) return children;
}
