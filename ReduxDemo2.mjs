import { legacy_createStore as createStore, combineReducers } from "redux";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const INITIAL_STATE = {
  numOfCakes: 10,
  numOfIceCreams: 20,
};

const ACTION_TYPES = {
  BUY_CAKES: "BUY_CAKES",
  BUY_ICECREAMS: "BUY_ICECREAMS",
};

const buyCakes = createAction(ACTION_TYPES.BUY_CAKES);
const buyIcecreams = createAction(ACTION_TYPES.BUY_ICECREAMS);

const cakeReducer = produce((draft, action) => {
  console.log('cakeReducer');
  const { payload } = action;
  draft.numOfCakes = draft.numOfCakes - payload;
});

const iceCreamReducer = produce((draft, action) => {
  console.log('iceCreamReducer');
  const { payload } = action;
  draft.numOfIceCreams = draft.numOfIceCreams - payload;
});

const REDUCER_MAP = {
  [ACTION_TYPES.BUY_CAKES]: cakeReducer,
  [ACTION_TYPES.BUY_ICECREAMS]: iceCreamReducer,
};

// const rootReducer = combineReducers({
//   cake: cakeReducer,
//   iceCream: iceCreamReducer,
// });

const store = createStore(handleActions(REDUCER_MAP, INITIAL_STATE));

const unsubscribeStore = store.subscribe(() =>
  console.log("Updated State: ", store.getState())
);

store.dispatch(buyCakes(2));
// store.dispatch(buyCakes(2));
// store.dispatch(buyCakes(2));
// store.dispatch(buyIcecreams(4));
// store.dispatch(buyIcecreams(4));

unsubscribeStore();
