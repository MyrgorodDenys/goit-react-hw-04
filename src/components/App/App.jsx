import { getImagesUnplash } from "../../images-api";
import { useEffect, useState } from "react";
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
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (search.trim() === "") {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const dataImg = await getImagesUnplash(search, page);
        setTotalPages(dataImg.total_pages);
        setImages((prevState) => {
          return [...prevState, ...dataImg.results];
        });
        if (!dataImg.total) {
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

    fetchData();
  }, [search, page]);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    setIsSearching(true);
    setImages([]);
    setPage(1);
    setSearch(searchQuery);
  };

  const handleLoadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  const isVisible = () => {
    return totalPages !== 0 && totalPages !== page && !loading;
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
      {!isSearching && isVisible() && (
        <LoadMoreBtn onClick={handleLoadMore} isVisible={isVisible} />
      )}
      {loading && <LoaderMore />}
      <ImageModal
        isOpen={modalIsOpen}
        image={selectedImage}
        onCloseModal={closeModal}
      />
    </>
  );
}

export default App;
