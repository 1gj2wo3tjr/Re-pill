import React from "react";
import DaumPostcode from "react-daum-postcode";
import { Modal } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";

function AddressModal({ modal, setModal, setAddress }) {
  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const handleClose = () => setModal(false);

  const onComplete = (data) => {
    console.log(data);
    setAddress(data);
    setModal(false);
  };

  return (
    <>
      {isMobile ? (
        <div>
          <Modal
            open={modal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DaumPostcode
              autoClose
              onComplete={onComplete}
              style={{ height: "500px" }}
            />
          </Modal>
        </div>
      ) : (
        <div>
          <Modal
            closeIcon
            open={modal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
              width: "500px",
              position: "relative",
            }}
          >
            <DaumPostcode
              autoClose
              onComplete={onComplete}
              style={{ height: "600px" }}
            />
          </Modal>
        </div>
      )}
    </>
  );
}

export default AddressModal;
