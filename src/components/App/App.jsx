import { getImagesUnplash } from "../../images-api";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import "../../../node_modules/modern-normalize/modern-normalize.css";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";

import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import LoaderMore from "../Loader/LoaderMore";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]); // Стан для зберігання списку зображень
  const [page, setPage] = useState(1); // Стан для зберігання поточної сторінки результатів
  const [totalPages, setTotalPages] = useState(1); // Стан для зберігання загальної кількості сторінок результатів
  const [search, setSearch] = useState(""); // Стан для зберігання поточного пошукового запиту
  const [error, setError] = useState(false); // Стан для відображення помилки
  const [loading, setLoading] = useState(false); // Стан для відображення завантаження основного контенту
  const [loadingMore, setLoadingMore] = useState(false); // Стан для відображення завантаження додаткового контенту
  const [isSearching, setIsSearching] = useState(false); // Стан для відображення процесу пошуку нових зображень
  const [selectedImage, setSelectedImage] = useState(null); // Стан для зберігання вибраного зображення для модального вікна
  const [modalIsOpen, setModalIsOpen] = useState(false); // Стан для відображення/приховування модального вікна

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleSearch = async (searchQuery) => {
    try {
      setLoading(true);
      setIsSearching(true);
      setImages([]);
      setPage(1);
      setSearch(searchQuery);
      const dataImg = await getImagesUnplash(searchQuery, 1);
      setTotalPages(dataImg.total_pages);
      setImages(dataImg.results);

      if (searchQuery.trim() === "") {
        toast.error("The search field cannot be empty!");
        return;
      } else if (!dataImg.total) {
        toast(
          "Sorry, we have not found the photos for your request. Try to write it differently.",
          {
            duration: 5000,
          }
        );
      } else {
        toast.success(`Wow! We found ${dataImg.total} pictures`);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const dataImages = await getImagesUnplash(search, nextPage);
      setImages((prevImages) => {
        return [...prevImages, ...dataImages.results];
      });
      setPage(nextPage);
    } catch (error) {
      setError(true);
    } finally {
      setLoadingMore(false);
    }
  };

  const isVisible = () => {
    return totalPages !== 0 && totalPages !== page && !loadingMore;
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: css.toastTextCenter,
        }}
      />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <ImageGallery imageList={images} openModal={openModal} />
      {!loadingMore && !isSearching && (
        <LoadMoreBtn onClick={handleLoadMore} isVisible={isVisible} />
      )}
      {loadingMore && <LoaderMore />}
      <ImageModal
        isOpen={modalIsOpen}
        image={selectedImage}
        onCloseModal={closeModal}
      />
    </>
  );
}

export default App;
