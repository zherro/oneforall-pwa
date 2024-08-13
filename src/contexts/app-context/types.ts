import SessionUtils from "@supabaseutils/session";

export interface ContextProps {
  state: InitialState;
  dispatch: (args: ActionType) => void;
}

export interface InitialState {
  theme: string;
  cart: CartItem[];
  isHeaderFixed: boolean;
  notify: NotifyMessage;
  session?: SessionUtils;
}

export interface NotifyMessage  {
  status?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  description?: string;
  duration?: number;
  isClosable?: boolean;
  variant?: 'solid' | 'subtle' | 'left-accent' | 'top-accent';
  position?: 
    'top' |
    'top-right' |
    'top-left' |
    'bottom' |
    'bottom-right' |
    'bottom-left';
}

export interface CartItem {
  qty: number;
  name: string;
  slug?: string;
  price: number;
  imgUrl?: string;
  id: string | number;
}

interface NotifyActionType {
  type: "NOTIFY";
  payload: NotifyMessage;
}

interface CartActionType {
  type: "CHANGE_CART_AMOUNT";
  payload: CartItem;
}

interface LayoutActionType {
  type: "TOGGLE_HEADER";
  payload: boolean;
}

interface ThemeActionType {
  type: "THEME";
  payload: string;
}

interface SessionActionType {
  type: "SESSION";
  payload: SessionUtils;
}


export type ActionType = CartActionType | LayoutActionType | NotifyActionType | ThemeActionType | SessionActionType;
