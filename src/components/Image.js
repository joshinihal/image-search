import React from "react";
import classes from "./Image.module.css";

const Image = (props) => {
  const handleimageClick = () => {
    // don't open modal if modal already open i.e. image already zoomed
    if (!props.zoom) {
      props.onShowModal({ id: props.id, image: props.image });
    }
  };

  // increase size of image if zoomed
  const containerClasses = props.zoom
    ? ` ${classes["image-container"]} ${classes["image-container-zoomed"]}`
    : ` ${classes["image-container"]} ${classes["image-container-normal"]}`;

  return (
    <div className={containerClasses}>
      <img
        onClick={handleimageClick}
        className={classes["image"]}
        alt={props.id}
        src={props.image}
      ></img>
    </div>
  );
};

export default Image;
