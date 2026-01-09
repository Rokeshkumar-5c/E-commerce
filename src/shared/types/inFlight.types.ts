/**
 * InFlight Status Enum
 * Tracks the status of async operations
 */
export enum InFlightStatuses {
  INITIAL = 'INITIAL',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

/**
 * InFlight Names for Products
 */
export enum ProductsInFlightNames {
  fetchProductsInFlight = 'fetchProductsInFlight',
  fetchProductByIdInFlight = 'fetchProductByIdInFlight',
}

/**
 * InFlight Names for Cart
 */
export enum CartInFlightNames {
  addToCartInFlight = 'addToCartInFlight',
  removeFromCartInFlight = 'removeFromCartInFlight',
  updateQuantityInFlight = 'updateQuantityInFlight',
  clearCartInFlight = 'clearCartInFlight',
}

/**
 * InFlight Status Type
 */
export interface InFlightStatus {
  status: InFlightStatuses;
}
