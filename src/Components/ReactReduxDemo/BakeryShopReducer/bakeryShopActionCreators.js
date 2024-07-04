import REDUCER_ACTION_TYPES from "./bakeryShopActionTypes";

export const buyCake = () => ({
  type: REDUCER_ACTION_TYPES.BUY_CAKE,
});

export const buyIceCream = () => ({
  type: REDUCER_ACTION_TYPES.BUY_ICECREAM,
});

// IN TEKION CODEBASE, STORE HAS ALREADY BEEN ENHANCED WITH THUNK MIDDLEWARE. SO ALMOST ALL ACTION-CREATORS ARE LIKE THIS ONLY.

// export const buyCake = () => (dispatch) => {
//   dispatch({ type: REDUCER_ACTION_TYPES.BUY_CAKE });
// };

// export const buyIceCream = () => (dispatch) => {
//   dispatch({ type: REDUCER_ACTION_TYPES.BUY_ICECREAM });
// };
