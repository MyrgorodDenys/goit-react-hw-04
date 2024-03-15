import { Hourglass } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.container}>
      <Hourglass
        className={css.loader}
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#5c6297", "#fff"]}
      />
    </div>
  );
};

export default Loader;
