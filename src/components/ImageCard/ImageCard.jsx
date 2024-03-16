import css from "./ImageCard.module.css";
import PropTypes from "prop-types";

const ImageCard = ({
  imageItem: {
    alt_description,
    likes,
    urls: { small },
    user: { name },
  },
  imageClick,
}) => {
  return (
    <div
      className={css.galleryThumb}
      onClick={() => imageClick()}
    >
      <img
        className={css.galleryImage}
        src={small}
        alt={alt_description}
        width="360"
      />
      <div className={css.thumbBlock}>
        <p className={css.textPhoto}>
          <strong>Author</strong>
          <br />
          {name}
        </p>
        <p className={css.textPhoto}>
          <strong>Likes: </strong>
          {likes}
        </p>
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  imageItem: PropTypes.shape({
    alt_description: PropTypes.string,
    likes: PropTypes.number,
    urls: PropTypes.shape({
      small: PropTypes.string,
    }),
    user: PropTypes.shape({
      name: PropTypes.string,
      social: PropTypes.shape({
        portfolio_url: PropTypes.string,
      }),
    }),
  }),
};

export default ImageCard;
