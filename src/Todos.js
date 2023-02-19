import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import { RiCheckboxCircleLine} from "react-icons/ri"
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const Todos = ({ item, handleDelete, handleComplete, todoState }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="todo-list" key={item.id}>
      <div className="todo-list-item" onClick={handleShow}>
        <h3
          style={{
            textDecoration: item.status ? "line-through" : "",
            color: item.status ? "#DE3163" : "rgb(0, 230, 122)"

          }}
        >
          {item.title}
        </h3>
      </div>
      <div>
        <AiOutlineDelete
          className="icon"
          onClick={() => handleDelete(item.id)}
        />
       {!todoState ? <RiCheckboxCircleLine
          className="check-icon"
          onClick={() => handleComplete(item.id)}
        />:""}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>{item.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>{item.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Todos;
