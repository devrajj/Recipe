import styled from "styled-components";
import { keyframes } from "styled-components";

const NoTransactionContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  min-height: 100px;
`;

const rotate = keyframes`
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          `;

const Loader = styled.div`
  height: 24px;
  width: 24px;
  align-self: center;
  border: 3px solid #fff;
  border-radius: 50%;
  animation: ${rotate} 1.2s cubic-bezier(0.25, 0, 0.5, 1) infinite;
  border-color: #6a39ea transparent transparent transparent;
  margin-top: 10px;
  &:nth-child(1) {
    animation-delay: -0.4s;
  }
  &:nth-child(2) {
    animation-delay: -0.3s;
  }
  &:nth-child(3) {
    animation-delay: -0.2s;
  }
`;

export default function LoaderComponent({ extraSpace = false, loaderStyle }) {
  return (
    <>
      {extraSpace ? (
        <NoTransactionContainer>
          <Loader style={loaderStyle} />
        </NoTransactionContainer>
      ) : (
        <Loader />
      )}
    </>
  );
}
