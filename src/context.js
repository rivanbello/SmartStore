import { createContext } from 'react';

const UserContext = createContext({});
const CartContext = createContext({});
const AuthenticationContext = createContext({});

export {
  AuthenticationContext,
  CartContext,
  UserContext,
}