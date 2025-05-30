import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { HiMiniPencilSquare, HiMiniTrash } from "react-icons/hi2";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";

import Modal from "../../ui/Modal";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";

const DeleteButton = styled(HiMiniTrash)`
  color: indianred;
  font-size: 2rem;
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  border-radius: 3px;

  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const EditButton = styled(HiMiniPencilSquare)`
  color: var(--color-brand-500);
  font-size: 2rem;
`;

const EditCabins = styled.div`
  display: flex;
  gap: 1rem;
`;
export default function CabinRow({ cabin }) {
  const { deleteCabin, isDeleting } = useDeleteCabin();

  const {
    id: cabinId,
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
  } = cabin;

  return (
    <Table.Row>
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>
        {maxCapacity} {maxCapacity > 1 ? "Guests" : "Guest"}
      </div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <EditCabins>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Modal.Open opens="edit-cabin">
                <Menus.Button icon={<EditButton />} $iconColor={"#1C86EE"}>
                  Edit Cabin
                </Menus.Button>
              </Modal.Open>

              <Modal.Open opens={"deleteConfirm"}>
                <Menus.Button icon={<DeleteButton />} $iconColor={"#F00"}>
                  Delete
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-cabin" overlay={true}>
              <CreateCabinForm type={"modal"} editCabinData={cabin} />
            </Modal.Window>

            <Modal.Window name="deleteConfirm">
              <ConfirmDelete
                onConfirm={() => deleteCabin(cabinId)}
                resourceName="Cabin"
                disabled={isDeleting}
                isDeleting={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </EditCabins>
    </Table.Row>
  );
}
