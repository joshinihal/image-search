import React from "react";
import classes from "./Images.module.css";
import InfiniteScroll from "react-infinite-scroll-component";

import Image from "./Image";

const Images = (props) => {
  const handleShowModal = (image) => {
    props.onShowModal(image);
  };

  const handleNext = () => {
    props.fetchMore();
  };

  return (
    <InfiniteScroll
      dataLength={props.imagesList.length}
      hasMore={true}
      next={handleNext}
      loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all.</b>
        </p>
      }
    >
      <div className={classes["images-container"]}>
        {props.imagesList.map((el, index) => {
          return (
            <Image
              onShowModal={handleShowModal}
              key={el.id}
              image={el.image}
              id={el.id}
            ></Image>
          );
        })}
      </div>
    </InfiniteScroll>
  );
};

export default Images;
