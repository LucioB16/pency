import {Product} from "../product/types";

export interface CartItem {
  id: string | Product["id"];
  product: Product["id"];
  count: number;
  category: Product["category"];
  subcategory: Product["subcategory"];
  price: Product["price"];
  title: Product["title"];
  description: Product["description"];
  options?: string;
}

export type Cart = Record<string, CartItem>;

export interface State {
  items: CartItem[];
  cart: Cart;
  checkout: Checkout;
}

export interface Actions {
  add: (product: Product) => void;
  remove: (id: CartItem["id"]) => void;
  confirmCheckout: (checkout: Checkout) => void;
  selectPago: (id: String) => void;
}

export interface Context {
  state: State;
  actions: Actions;
}

export type Status = "init" | "pending";

export interface Checkout{
  pago: string;
  monto?: string;
  domicilio: string;
}