import React from "react";
import { connect } from "react-redux";
// import REDUCER_ACTION_TYPES from "./BakeryShopReducer/bakeryShopActionTypes";
import {
  buyCake,
  buyIceCream,
} from "./BakeryShopReducer/bakeryShopActionCreators";

const BakeryShop = (props) => {
  return (
    <div>
      <h2>Number of cakes = {props.numOfCakes}</h2>
      <button onClick={props.buyCake}>Buy Cake</button>
      <h2>Number of ice creams = {props.numOfIceCreams}</h2>
      <button onClick={props.buyIceCream}>Buy Ice Cream</button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    numOfCakes: state.bakeryShop.numOfCakes,
    numOfIceCreams: state.bakeryShop.numOfIceCreams,
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     buyCake: () => dispatch({ type: REDUCER_ACTION_TYPES.BUY_CAKE }),
//     buyIceCream: () => dispatch({ type: REDUCER_ACTION_TYPES.BUY_ICECREAM }),
//   };
// };

const mapDispatchToProps = {
  buyCake,
  buyIceCream,
};

export default connect(mapStateToProps, mapDispatchToProps)(BakeryShop);
