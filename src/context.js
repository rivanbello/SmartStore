import { createContext } from 'react';

const UserContext = createContext({});
const LoadingContext = createContext({});
const CartContext = createContext({});

export {
  CartContext,
  LoadingContext,
  UserContext,
}