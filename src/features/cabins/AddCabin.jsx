import Button from "../../ui/Button";

import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <div style={{ width: "fit-content" }}>
          <Button>Add new Cabin</Button>
        </div>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm type={"modal"} />
      </Modal.Window>
    </Modal>
  );
}
