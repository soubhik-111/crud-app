import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the productData state domain
 */

const selectProductDataDomain = state => state.productData || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductData
 */

const makeSelectProductData = () =>
  createSelector(
    selectProductDataDomain,
    substate => substate,
  );

export default makeSelectProductData;
export { selectProductDataDomain };
