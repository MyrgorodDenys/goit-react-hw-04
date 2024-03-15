import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import css from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    const formattedSearch = values.search.trim().toLowerCase();
    if (formattedSearch === "") {
      toast.error("Please enter a search query");
    } else {
      onSubmit(formattedSearch);
      actions.resetForm();
    }
  };

  return (
    <>
      <header className={css.searchHeader}>
        <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {" "}
              <Field
                className={css.inputSearch}
                type="text"
                name="search"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
              <button className={css.btnSearch} type="submit">
                Search
              </button>
            </Form>
          )}
        </Formik>
      </header>
      <ToastContainer />{" "}
    </>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchBar;
