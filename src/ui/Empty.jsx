import styled from "styled-components";

const Error = styled.p`
  margin: auto;
  font-size: 2rem;
`;

function Empty({ resourceName }) {
  return <Error>No {resourceName} could be found.</Error>;
}

export default Empty;
