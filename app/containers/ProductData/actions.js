/*
 *
 * ProductData actions
 *
 */

import {
  DEFAULT_ACTION,
  ADD_PRODUCTS_DATA,
  GET_PRODUCTS_DATA,
  GET_PRODUCTS_DATA_SUCCESS,
  ADD_PRODUCTS_DATA_SUCCESS,
  REMOVE_PRODUCTS_DATA,
  REMOVE_PRODUCTS_DATA_SUCCESS,
  EDIT_PRODUCTS_DATA,
  EDIT_PRODUCTS_DATA_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getProductsData() {
  return {
    type: GET_PRODUCTS_DATA,
  };
}
export function getProductsDataSuccess(response) {
  return {
    type: GET_PRODUCTS_DATA_SUCCESS,
    response,
  };
}

export function addProductsData(data) {
  console.log('Add product ! ', data);
  return {
    type: ADD_PRODUCTS_DATA,
    data,
  };
}
export function addProductsDataSuccess(response) {
  return {
    type: ADD_PRODUCTS_DATA_SUCCESS,
    response,
  };
}

export function removeProductsData(productId) {
  return {
    type: REMOVE_PRODUCTS_DATA,
    pid: productId,
  };
}
export function removeProductsDataSuccess(response) {
  return {
    type: REMOVE_PRODUCTS_DATA_SUCCESS,
    response,
  };
}

export function editProductsData(id, newTitle) {
  return {
    type: EDIT_PRODUCTS_DATA,
    id,
    newTitle,
  };
}
export function editProductsDataSuccess(response) {
  return {
    type: EDIT_PRODUCTS_DATA_SUCCESS,
    response,
  };
}
