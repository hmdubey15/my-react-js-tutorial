import REDUCER_ACTION_TYPES from "./bakeryShopActionTypes";

const initialBakeryShopState = {
  numOfCakes: 10,
  numOfIceCreams: 20,
};

const bakeryShopReducer = (state = initialBakeryShopState, action) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPES.BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case REDUCER_ACTION_TYPES.BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

export default bakeryShopReducer;
