import React from 'react';
import reactDom from "react-dom";
import Image from '../Image';

import classes from './Modal.module.css';

const Backdrop = (props) => {
  // close if clicked anywhere in the backdrop of modal
    const handleCloseModal = () => {
      props.onCloseModal();
    };
    return <div className={classes["backdrop"]} onClick={handleCloseModal}></div>;
};

const ModalOverlay = (props) => {
    return (
      <React.Fragment>
          <div className={classes["modal-content"]}>
             <Image zoom={true} image={props.image} id={props.id}></Image>
          </div>
      </React.Fragment>
    );
  };

const Modal = (props) => {

    const handleCloseModal = () => {
        props.onCloseModal();
    };

    return (
        <React.Fragment>
          {reactDom.createPortal(
            <Backdrop onCloseModal={handleCloseModal} />,
            document.getElementById("image-modal")
          )}
          {reactDom.createPortal(
            <ModalOverlay image={props.image} id={props.id} onCloseModal={handleCloseModal} />,
            document.getElementById("image-modal")
          )}
        </React.Fragment>
      );
};

export default Modal;