/*
 *
 * ProductData reducer
 *
 */
import produce from 'immer';
import {
  ADD_PRODUCTS_DATA,
  ADD_PRODUCTS_DATA_SUCCESS,
  DEFAULT_ACTION,
  GET_PRODUCTS_DATA_SUCCESS,
  REMOVE_PRODUCTS_DATA,
  REMOVE_PRODUCTS_DATA_SUCCESS,
  EDIT_PRODUCTS_DATA,
  EDIT_PRODUCTS_DATA_SUCCESS,
} from './constants';

export const initialState = {
  repos: [],
  isNewProductAdded: false,
  isProductRemove: false,
  newProductId: null,
  isTitleChange: false,
  errorMsg: '',
};

/* eslint-disable default-case, no-param-reassign */
const productDataReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PRODUCTS_DATA_SUCCESS:
        draft.repos = action.response;
        return draft;
      case DEFAULT_ACTION:
        break;
      case ADD_PRODUCTS_DATA:
        draft.repos.products.unshift({
          id: action.newProductId,
          title: action.data,
        });
        return draft;
      case ADD_PRODUCTS_DATA_SUCCESS:
        draft.isNewProductAdded = action.response.isNewProductAdded;
        return draft;
      case REMOVE_PRODUCTS_DATA:
        let { products } = state.repos;
        products = products.filter(item => item.id != action.pid);
        draft.repos.products = products;
        console.log('I am in line number 40 products = ', draft.repos.products);
        return draft;
      case REMOVE_PRODUCTS_DATA_SUCCESS:
        draft.isProductRemove = action.response.isProductRemove;
        return draft;
      case EDIT_PRODUCTS_DATA:
        const productArr = state.repos.products;
        for (let i = 0; i < productArr.length; i++) {
          if (action.id === productArr[i].id) {
            productArr[i].title = action.newTitle;
          }
          console.log(productArr[i]);
        }
        draft.repos.products = productArr;
        return draft;
      case EDIT_PRODUCTS_DATA_SUCCESS:
        draft.isTitleChange = action.response.isTitleChange;
        return draft;
    }
  });

export default productDataReducer;
