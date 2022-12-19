import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  GET_PRODUCTS_DATA,
  ADD_PRODUCTS_DATA,
  REMOVE_PRODUCTS_DATA,
  EDIT_PRODUCTS_DATA,
} from './constants';
import {
  getProductsDataSuccess,
  addProductsDataSuccess,
  removeProductsDataSuccess,
  editProductsDataSuccess,
} from './actions';

export function* getProductsData() {
  const reqURL = 'https://dummyjson.com/products';
  try {
    const repos = yield call(request, reqURL);
    yield put(getProductsDataSuccess(repos));
    console.log('Saga file Products ->', repos);
  } catch (err) {
    console.log('error -> ', err);
  }
}

export function* addProductsData(action) {
  const reqURL = 'https://dummyjson.com/products/add';
  try {
    const jsonData = {
      method: 'POST',
      body: action.data,
    };
    const newProduct = yield call(request, reqURL, jsonData);
    console.log('new Product is ', newProduct);
    if (newProduct) {
      yield put(
        addProductsDataSuccess({
          isNewProductAdded: true,
          newProductId: newProduct.id,
        }),
      );
    }
  } catch (err) {
    console.log('Error in add product ', err);
  }
}

export function* removeProductsData(action) {
  console.log('acton .id in line 43 saga =->', action.pid);
  const reqURL = `https://dummyjson.com/products/${action.pid}`;
  try {
    const jsonData = {
      method: 'DELETE',
    };
    const isRemoved = yield call(request, reqURL, jsonData);
    console.log('deleted Product is ', isRemoved);
    if (isRemoved) {
      yield put(
        removeProductsDataSuccess({
          isProductRemove: true,
        }),
      );
    }
  } catch (err) {
    console.log('Error in delete product ', err);
  }
}

export function* editProductsData(action) {
  console.log('action.id line 66 saga', action.id);
  const reqURL = `https://dummyjson.com/products/${action.id}`;
  try {
    const jsonData = {
      method: 'PUT',
      body: { title: action.newTitle },
    };
    const editedProduct = yield call(request, reqURL, jsonData);
    console.log('editedProduct Product is ', editedProduct);
    if (editedProduct) {
      yield put(
        editProductsDataSuccess({
          isTitleChange: true,
        }),
      );
    }
  } catch (err) {
    console.log('Error in edit product ', err);
  }
}
// Individual exports for testing
export default function* productDataSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_PRODUCTS_DATA, getProductsData);
  yield takeLatest(ADD_PRODUCTS_DATA, addProductsData);
  yield takeLatest(REMOVE_PRODUCTS_DATA, removeProductsData);
  yield takeLatest(EDIT_PRODUCTS_DATA, editProductsData);
}

// export default function* productDataSaga() {
//   // See example in containers/HomePage/saga.js
//   yield takeLatest(ADD_PRODUCTS_DATA, addProductsData);
// }
