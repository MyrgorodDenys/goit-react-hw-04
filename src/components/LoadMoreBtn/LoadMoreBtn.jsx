import css from "./LoadMoreBtn.module.css";
import PropTypes from "prop-types";

const LoadMoreBtn = ({ onClick, isVisible }) => {
  return (
    <div className={css.btnThumb}>
      {isVisible() && (
        <button className={css.btnLoad} onClick={onClick}>
          Load More
        </button>
      )}
    </div>
  );
};
LoadMoreBtn.propTypes = {
  onClick: PropTypes.func,
  isVisible: PropTypes.func,
};

export default LoadMoreBtn;
