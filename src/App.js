import React, { useState, useCallback, useEffect } from "react";
import classes from "./App.module.css";
import Images from "./components/Images";

import Header from "./components/UI/Header";
import Modal from "./components/UI/Modal";
import useHttp from "./hooks/use-http";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [imagesList, setImagesList] = useState([]);
  const [page, setPage] = useState(1);
  const { sendRequest: fetchImages, error, isLoading } = useHttp();

  const baseUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const format = "json";

  const [searchTerm, setSearchTerm] = useState("");

  // format images from received json, and append url into array
  const setImages = useCallback((images) => {
    const photoUrlList = [];
    images.photos.photo.forEach((el) => {
      const imageUrl = `https://live.staticflickr.com/${el.server}/${el.id}_${
        el.secret
      }_${"z"}.jpg`;
      photoUrlList.push({ image: imageUrl, id: el.id * Math.random() });
    });
    // concat to previous images without adding duplicate
    setImagesList((prev) => {
      return [...new Set([...prev, ...photoUrlList])];
    });
  }, []);

  const getDefaultImages = useCallback(() => {
    const method = "flickr.photos.getRecent";
    const url = `${baseUrl}/?method=${method}&api_key=${apiKey}&format=${format}&page=${page}&nojsoncallback=1`;
    fetchImages(url, setImages);
  }, [fetchImages, setImages, page, baseUrl, apiKey]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      getDefaultImages();
    } else if (searchTerm.trim() !== "") {
      // add a delay function so that requests aren't sent everytime, but only when user takes a pause
      const delayDebounceFn = setTimeout(() => {
        const method = "flickr.photos.search";
        const url = `${baseUrl}/?method=${method}&api_key=${apiKey}&format=${format}&text=${searchTerm}&page=${page}&nojsoncallback=1`;
        fetchImages(url, setImages);
      }, 1500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [
    searchTerm,
    getDefaultImages,
    fetchImages,
    baseUrl,
    apiKey,
    setImages,
    page,
  ]);

  const handleRetry = () => {
    getDefaultImages();
  };

  const handleShowModal = (image) => {
    setShowModal(true);
    setModalImage(image);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
    setPage(1);
    setImagesList([]);
  };

  const fetchMore = () => {
    setPage((prev) => {
      return prev + 1;
    });
  };

  let content = "";

  if (error) {
    content = (
      <div>
        <p className={classes["align-center"]}>{error}</p>
        <div className={classes["align-center"]}>
          <button className={classes["retry-btn"]} onClick={handleRetry}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading && imagesList.length < 1) {
    content = <p className={classes["align-center"]}>Loading...</p>;
  }

  if (imagesList.length > 0) {
    content = (
      <Images
        fetchMore={fetchMore}
        onShowModal={handleShowModal}
        onHideModal={handleHideModal}
        imagesList={imagesList}
      ></Images>
    );
  } else if (imagesList.length < 1 && !isLoading && !error) {
    content = <p className={classes["align-center"]}>No images found.</p>;
  }

  return (
    <React.Fragment>
      {showModal && (
        <Modal
          onCloseModal={handleCloseModal}
          image={modalImage.image}
          id={modalImage.id}
        />
      )}
      <Header onSearchChangeHandler={handleSearchChange} />
      {content}
    </React.Fragment>
  );
}

export default App;
