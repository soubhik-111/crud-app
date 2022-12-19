/**
 *
 * ProductData
 *
 */

import React, { useState, useEffect, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, createStore } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProductData from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  getProductsData,
  addProductsData,
  removeProductsData,
  editProductsData,
} from './actions';

export function ProductData(props) {
  useInjectReducer({ key: 'productData', reducer });
  useInjectSaga({ key: 'productData', saga });
  const addProduct = useRef(null);

  // console.log("props.productData.repos.products ",props.productData.repos.products);

  useEffect(() => {
    if (
      props.productData &&
      props.productData.repos &&
      props.productData.repos.length === 0
    ) {
      props.getProductsData1();
    }
    console.log('line 39 index I am woking ');
  }, [
    props.productData.repos.products,
    props.productData.isNewProductAdded,
    props.productData.isProductRemove,
    props.productData.isTitleChange,
  ]);

  // console.log("props.productData.repos.products", props.productData.repos.products);
  // let productsVal = props.productData.repos.products

  const addData = () => {
    const { value } = addProduct.current;
    console.log(value);
    props.addProductsData1(value);
  };

  const editData = id => {
    const newTitle = addProduct.current.value;
    console.log('index val', newTitle, 'id', id);
    props.editProductsData1(id, newTitle);
  };

  const deleteData = e => {
    props.removeProductsData1(e);
  };

  return (
    <div>
      <Helmet>
        <title>ProductData</title>
        <meta name="description" content="Description of ProductData" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <input id="productInput" placeholder="Enter Product" ref={addProduct} />
      <button onClick={addData}>Add</button>
      {props.productData.repos &&
        props.productData.repos.products &&
        props.productData.repos.products.map(data => (
          <div key={data.title}>
            <p>
              + {data.title}{' '}
              <button
                onClick={() => {
                  editData(data.id);
                }}
              >
                Edit
              </button>{' '}
              <button
                onClick={() => {
                  deleteData(data.id);
                }}
              >
                Delete
              </button>
            </p>
          </div>
        ))}
    </div>
  );
}

ProductData.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getProductsData1: PropTypes.func,
  addProductsData1: PropTypes.func,
  removeProductsData1: PropTypes.func,
  editProductsData1: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  productData: makeSelectProductData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductsData1: () => dispatch(getProductsData()),
    addProductsData1: data => dispatch(addProductsData(data)),
    removeProductsData1: id => dispatch(removeProductsData(id)),
    editProductsData1: (id, newTitle) =>
      dispatch(editProductsData(id, newTitle)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductData);
