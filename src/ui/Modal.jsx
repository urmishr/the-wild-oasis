import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  border: 1px solid var(--color-brand-500);
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(50%) translateY(-50%);
  transition: all 0.2s;
  position: absolute;
  top: 0rem;
  right: 0rem;
  background-color: var(--color-brand-600);
  color: white;
  border-radius: 50%;
  /* padding: 0.2rem 1rem; */
  width: 2.5rem;
  height: 2.5rem;
  z-index: 2000;
  font-size: 2rem;

  &:hover {
    background-color: indianred;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.3);
  }

  &:focus {
    outline: none;
  }
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

export default function Modal({ children }) {
  const [windowName, setWindowName] = useState("");
  const open = setWindowName;
  const close = () => setWindowName("");
  return (
    <ModalContext.Provider value={{ open, close, windowName }}>
      {children}
    </ModalContext.Provider>
  );
}
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => {
      open(opensWindowName);
    },
  });
}

function Window({ children, name, overlay = true }) {
  const { windowName, close } = useContext(ModalContext);
  if (name !== windowName) return;

  const isOverlay = overlay ? (
    <Overlay onClick={close}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <Button onClick={close}>&times;</Button>
        <div>{cloneElement(children, { closeModal: close })}</div>
      </StyledModal>
    </Overlay>
  ) : (
    <StyledModal>
      <Button onClick={close}>&times;</Button>
      <div>{children}</div>
    </StyledModal>
  );
  return createPortal(isOverlay, document.body);
}

Modal.Open = Open;
Modal.Window = Window;
