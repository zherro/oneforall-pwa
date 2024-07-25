"use client";

import {
  useMemo,
  useReducer,
  useContext,
  createContext,
  PropsWithChildren,
  useEffect,
  useCallback,
} from "react";
import { useToast } from '@chakra-ui/react';

// TYPES
import { ActionType, InitialState, ContextProps } from "./types";
// DATA
import { INITIAL_CART } from "./data";
import theme from "theme";
import { getTheme } from "@utils/utils";
// import { initGA, logPageView } from "@lib/gtag";
import { useRouter } from "next/navigation";

const INITIAL_STATE = { theme: 'GREEN', cart: INITIAL_CART, isHeaderFixed: false, notify: {}};

export const AppContext = createContext<ContextProps>({
  state: INITIAL_STATE,
  dispatch: () => {}
});

const reducer = (state: InitialState, action: ActionType) => {
  switch (action.type) {
    case "THEME":
      return {...state, theme: action.payload };

    case "NOTIFY":
      console.log('setou')
      return { ...state, notify: action.payload };

    case "TOGGLE_HEADER":
      return { ...state, isHeaderFixed: action.payload };

    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;
      let exist = cartList.find((item) => item.id === cartItem.id);

      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter((item) => item.id !== cartItem.id);
        return { ...state, cart: filteredCart };
      }

      // IF PRODUCT ALREADY EXITS IN CART
      if (exist) {
        const newCart = cartList.map((item) =>
          item.id === cartItem.id ? { ...item, qty: cartItem.qty } : item
        );

        return { ...state, cart: newCart };
      }

      return { ...state, cart: [...cartList, cartItem] };

    default: {
      return state;
    }
  }
};

export function AppProvider({ children }: PropsWithChildren<any>) {
  const router = useRouter()
  const toast = useToast()
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  const notifyToast = useCallback(() => {
    if(state.notify.status != null) {
      toast({
        position: state.notify.position || 'top',
        status: state.notify.status,
        title: state.notify.title,
        description: state.notify.description,
        variant: state.notify.variant || 'left-accent',
        isClosable: true,
      })
    }
  }, [state.notify]);

  useEffect(() => notifyToast(), [state.notify]);

  // useEffect(() => {
  //   if (!window.gtag) {
  //     initGA();
  //   }
  //   logPageView(window.location.pathname);
  //   router.events?.on("routeChangeComplete", logPageView);
  //   return () => {
  //     router.events?.off("routeChangeComplete", logPageView);
  //   };
  // }, [router.events]);


  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext<ContextProps>(AppContext);

export const useLaraTheme = () => {
  const { state } = useAppContext();
  return theme(state.theme);
}
