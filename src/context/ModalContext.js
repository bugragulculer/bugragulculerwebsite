import React, { createContext, useState } from "react";
import useOuterClick from "../hooks/useOuterClick";

export const ModalContext = createContext({
  onPresent: () => null,
  onDismiss: () => null,
  setCloseOnOverlayClick: () => true,
});

const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalNode, setModalNode] = useState();
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true);
  const handlePresent = (node) => {
    setModalNode(node);
    setIsOpen(true);
  };
  const handleDismiss = () => {
    setModalNode(undefined);
    setIsOpen(false);
  };
  const handleOverlayDismiss = () => {
    if (closeOnOverlayClick) {
      handleDismiss();
    }
  };

  const modalRef = useOuterClick(() => setIsOpen(!isOpen));

  return (
    <ModalContext.Provider
      value={{
        onPresent: handlePresent,
        onDismiss: handleDismiss,
        setCloseOnOverlayClick,
      }}
    >
      {isOpen && (
        <div className="modal__wrapper">
          <div className="modal__component" ref={modalRef}>
            {/*<Overlay show onClick={handleOverlayDismiss} />*/}
            {React.isValidElement(modalNode) &&
              React.cloneElement(modalNode, {
                onDismiss: handleDismiss,
              })}
          </div>
        </div>
      )}
      {children}
    </ModalContext.Provider>
  );
};
export default ModalProvider;
