import { legacy_createStore as createStore, combineReducers } from "redux"; // createStore is deprecated

// ADD "type": "module" below version in package.json or add .mjs extension

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

const buyCake = () => ({
  // action creator -> function that returns the action. This should return an object with 'type' key
  type: BUY_CAKE, // whose value is a string(a unique action). It could also contain some other keys as well.
});

const buyIcecream = () => ({
  type: BUY_ICECREAM,
});

const initialCakeState = {
  // initial global state
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  // reducer performs the required action. It takes state & action and
  console.log('cakeReducer2');
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  console.log('iceCreamReducer2');
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  // since createStore accepts just 1 reducer, so we combine both of them.
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer); // store is created. [JUST LIKE SHOP IS CREATED AFTER HIRING CAKE SELLER & ICE_CREAM SELLER]

const unsubscribeStore = store.subscribe(() =>
  console.log("Updated State: ", store.getState())
);
// subscribe method helps you register a callback that Redux store will call when an action has been dispatched.
// As soon as the Redux state has been updated, the view will re-render automatically. It also returns a method to
// unsubscribe store.

// store.dispatch(buyCake()); // ordering to perform the required action.
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// store.dispatch(buyIcecream());
// store.dispatch(buyIcecream());

unsubscribeStore();
