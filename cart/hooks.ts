import React from "react";

import CartContext from "./context";
import CheckoutContext from "./context";
import {getTotal, getCount} from "./selectors";
import {CartItem} from "./types";
import {MEDIOS_PAGO} from "./constants"

export function useCart() {
  const {
    state: {items, cart, checkout},
    actions: {add, remove, confirmCheckout, selectPago},
  } = React.useContext(CartContext);

  return {
    add,
    remove,
    confirmCheckout,
    selectPago,
    MEDIOS_PAGO,
    cart,
    items,
    checkout,
    count: getCount(items),
    total: getTotal(items),
  };
}

export function useProductCartCount(id: CartItem["product"]) {
  const {
    state: {items},
  } = React.useContext(CartContext);

  return items.filter((item) => item.product === id).reduce((count, item) => count + item.count, 0);
}

export function useCheckout() {
  const {
    state: {checkout},
  } = React.useContext(CheckoutContext);

  return checkout;
}

export function useCheckoutActions() {
  const {
    actions: {confirmCheckout},
  } = React.useContext(CheckoutContext);

  return {confirmCheckout};
}