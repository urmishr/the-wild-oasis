import styled from "styled-components";

const StyledLoader = styled.div`
  border: ${(props) =>
    `${props.$width ? `${props.$width}px` : "3px"} solid ${props.$colorHex ? `${props.$colorHex}4D` : "rgba(255,255,255,0.3)"}`};

  border-radius: 50%;
  border-right: ${(props) =>
    `${props.$width ? `${props.$width}px` : "3px"} solid ${props.$colorHex ? `${props.$colorHex}` : "rgba(255,255,255)"}`};

  animation: spin 1s linear infinite;
  height: ${(props) => (props.$size ? `${props.$size}rem` : "2rem")};
  width: ${(props) => (props.$size ? `${props.$size}rem` : "2rem")};
  margin: ${(props) => `0 ${props.$margin ? props.$margin : 0}rem`};
  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function SpinnerApi({ $size, $width, $colorHex, $margin }) {
  return (
    <StyledLoader
      $size={$size}
      $width={$width}
      $colorHex={$colorHex}
      $margin={$margin}
    ></StyledLoader>
  );
}
