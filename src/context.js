import { createContext } from 'react';

const UserContext = createContext({});
const CartContext = createContext({});
const CondosContext = createContext({});
const AuthenticationContext = createContext({});

export {
  AuthenticationContext,
  CartContext,
  CondosContext,
  UserContext,
}