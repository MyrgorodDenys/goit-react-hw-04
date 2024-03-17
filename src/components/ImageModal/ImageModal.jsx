import { useEffect } from "react";
import Modal from "react-modal";
import { RiCloseLine } from "react-icons/ri";
import css from "./ImageModal.module.css";
import PropTypes from "prop-types";

const ImageModal = ({ isOpen, onCloseModal, image }) => {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <Modal
      overlayClassName={css.backdrop}
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={onCloseModal}
    >
      <button className={css.closeButton} onClick={onCloseModal}>
        <RiCloseLine size="40" />
      </button>
      {image && (
        <div className={css.containerModal}>
          <div className={css.imgContainer}>
            {image.urls && image.urls.regular && (
              <img
                className={css.image}
                src={image.urls.regular}
                alt={image.alt_description}
              />
            )}
          </div>
          <div className={css.moreInform}>
            <p className={css.author}>
              Author:{" "}
              <a
                className={css.linkAuthor}
                href={image.user.social.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {image.user.name}
              </a>
            </p>
            <p className={css.likes}>
              Likes: <span className={css.likesSpan}>{image.likes}</span>
            </p>
            {image.description && (
              <p className={css.description}>{image.description}</p>
            )}
            <ul className={css.tagsList}>
              {image.tags.map((tag, index) => (
                <li className={css.tagItem} key={index}>
                  #{tag.title}
                </li>
              ))}
            </ul>
            {image.user.location && (
              <p className={css.location}>Location: {image.user.location}</p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool,
  onCloseModal: PropTypes.func,
  image: PropTypes.shape({
    urls: PropTypes.shape({
      regular: PropTypes.string,
    }),
    alt_description: PropTypes.string,
    user: PropTypes.shape({
      social: PropTypes.shape({
        portfolio_url: PropTypes.string,
      }),
      name: PropTypes.string,
      location: PropTypes.string,
    }),
    likes: PropTypes.number,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
      })
    ),
  }),
};

export default ImageModal;
