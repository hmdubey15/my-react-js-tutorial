import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import bakeryShopReducer from "../Components/ReactReduxDemo/BakeryShopReducer/bakeryShopReducer";
import usersListReducer from "../Components/ReactReduxDemo2/UserListReducer/userListReducer";

const rootReducer = combineReducers({
  bakeryShop: bakeryShopReducer,
  usersList: usersListReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
