import ImageCard from "../ImageCard/ImageCard";
import PropTypes from "prop-types";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ imageList, openModal }) => {
  const imageClick = (event) => {
    openModal(event);
  };
  return (
    <section className={css.containerGallery}>
      {imageList.length > 0 && (
        <ul className={css.gallery}>
          {imageList.map((img) => {
            return (
              <li
                className={css.galleryItem}
                key={img.id}
                data-id={img.id}
              >
                <ImageCard
                  imageItem={img}
                  imageClick={() => imageClick(img)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

ImageGallery.propTypes = {
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ),
  openModal: PropTypes.func,
};

export default ImageGallery;
