import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
const _ = require("lodash");

const INGREDIENT_PRICES = {
  salad: 0.2,
  cheese: 0.5,
  meat: 1.5,
  bacon: 1.3
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 5,
      purchaseStatus: false,
      purchasing: false
    };
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("You Continue");
  };

  updatePurchaseStatus = ingredients => {
    let ingredientsCounts = _.sum(_.values(ingredients));
    this.setState({ purchaseStatus: ingredientsCounts > 0 });
  };

  addIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = updatedCount;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredient
    });
    this.updatePurchaseStatus(updatedIngredient);
  };

  removeIngredientHandler = type => {
    const updatedCount =
      this.state.ingredients[type] - 1 >= 0
        ? this.state.ingredients[type] - 1
        : 0;
    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = updatedCount;
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredient
    });
    this.updatePurchaseStatus(updatedIngredient);
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseContinue={this.purchaseContinueHandler}
            purchaseCancel={this.purchaseCancelHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          purchaseStatus={this.state.purchaseStatus}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disableInfo}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
