/*
 *
 * Category actions
 *
 */

import { useNavigate } from "react-router-dom"; // Updated import for navigation
import { toast } from "react-toastify"; // Updated import for notifications
import axios from "axios";

import {
  CATEGORY_SELECT,
  FETCH_CATEGORIES,
  FETCH_STORE_CATEGORIES,
  FETCH_CATEGORY,
  CATEGORY_CHANGE,
  CATEGORY_EDIT_CHANGE,
  SET_CATEGORY_FORM_ERRORS,
  SET_CATEGORY_FORM_EDIT_ERRORS,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  SET_CATEGORIES_LOADING,
  RESET_CATEGORY,
} from "./constants";

import handleError from "../../utils/error";
import { formatSelectOptions, unformatSelectOptions } from "../../utils/select";
import { allFieldsValidation } from "../../utils/validation";
import { API_URL } from "../../constants";

export const categoryChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: CATEGORY_CHANGE,
    payload: formData,
  };
};

export const categoryEditChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: CATEGORY_EDIT_CHANGE,
    payload: formData,
  };
};

export const categorySelect = (value) => {
  return {
    type: CATEGORY_SELECT,
    payload: value,
  };
};

export const resetCategory = () => {
  return (dispatch) => {
    dispatch({ type: RESET_CATEGORY });
  };
};

// fetch store categories api
export const fetchStoreCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/category/list`);

      dispatch({
        type: FETCH_STORE_CATEGORIES,
        payload: response.data.categories,
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch categories api
export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/category`);
      dispatch({
        type: FETCH_CATEGORIES,
        payload: response.data.categories,
      });
      return response.data.categories; // Return the categories for further use
    } catch (error) {
      handleError(error, dispatch);
      return []; // Return an empty array in case of error
    }
  };
};

// fetch category api
export const fetchCategory = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/category/${id}`);

      response.data.category.products = formatSelectOptions(
        response.data.category.products
      );

      dispatch({
        type: FETCH_CATEGORY,
        payload: response.data.category,
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// add category api
export const addCategory = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: "required",
        description: "required|max:200",
        products: "required",
      };

      const category = getState().category.categoryFormData;

      const newCategory = {
        name: category.name,
        description: category.description,
        products: unformatSelectOptions(category.products),
      };

      const { isValid, errors } = allFieldsValidation(newCategory, rules, {
        "required.name": "Name is required.",
        "required.description": "Description is required.",
        "max.description":
          "Description may not be greater than 200 characters.",
        "required.products": "Products are required.",
      });

      if (!isValid) {
        return dispatch({ type: SET_CATEGORY_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post(`${API_URL}/category/add`, newCategory);

      if (response.data.success === true) {
        toast.success(response.data.message); // Updated notification
        dispatch({
          type: ADD_CATEGORY,
          payload: response.data.category,
        });
        dispatch(resetCategory());

        const navigate = useNavigate();
        navigate(-1); // Updated navigation
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// update category api
export const updateCategory = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: "required",
        slug: "required|alpha_dash",
        description: "required|max:200",
        products: "required",
      };

      const category = getState().category.category;

      const newCategory = {
        name: category.name,
        slug: category.slug,
        description: category.description,
        products: category.products && unformatSelectOptions(category.products),
      };

      const { isValid, errors } = allFieldsValidation(newCategory, rules, {
        "required.name": "Name is required.",
        "required.slug": "Slug is required.",
        "alpha_dash.slug":
          "Slug may have alpha-numeric characters, as well as dashes and underscores only.",
        "required.description": "Description is required.",
        "max.description":
          "Description may not be greater than 200 characters.",
        "required.products": "Products are required.",
      });

      if (!isValid) {
        return dispatch({
          type: SET_CATEGORY_FORM_EDIT_ERRORS,
          payload: errors,
        });
      }

      const response = await axios.put(`${API_URL}/category/${category._id}`, {
        category: newCategory,
      });

      if (response.data.success === true) {
        toast.success(response.data.message); // Updated notification
        dispatch(resetCategory());

        const navigate = useNavigate();
        navigate(-1); // Updated navigation
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// activate category api
export const activateCategory = (id, value) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${API_URL}/category/${id}/active`, {
        category: {
          isActive: value,
        },
      });

      if (response.data.success === true) {
        toast.success(response.data.message); // Updated notification
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// delete category api
export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_URL}/category/delete/${id}`);

      if (response.data.success === true) {
        toast.success(response.data.message); // Updated notification
        dispatch({
          type: REMOVE_CATEGORY,
          payload: id,
        });

        const navigate = useNavigate();
        navigate(-1); // Updated navigation
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
