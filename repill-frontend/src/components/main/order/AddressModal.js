import React from "react";
import DaumPostcode from "react-daum-postcode";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

function AddressModal({ modal, setModal, setAddress }) {
  const handleClose = () => setModal(false);
  const onComplete = (data) => {
    console.log(data);
    setAddress(data);
    setModal(false);
  };
  return (
    <>
      <div>
        <Modal
          closeIcon
          open={modal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{
            width: "500px",
          }}
        >
          <DaumPostcode
            autoClose
            onComplete={onComplete}
            style={{ height: "600px" }}
          />
        </Modal>
      </div>
    </>
  );
}

export default AddressModal;
