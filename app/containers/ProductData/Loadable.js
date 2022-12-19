/**
 *
 * Asynchronously loads the component for ProductData
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
