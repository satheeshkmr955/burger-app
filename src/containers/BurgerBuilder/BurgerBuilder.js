import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import _ from "lodash";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

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
      ingredients: null,
      totalPrice: 5,
      purchaseStatus: false,
      purchasing: false,
      loading: false,
      error: false
    };
  }

  componentDidMount() {
    axios
      .get("https://burger-app-4d747.firebaseio.com/ingredients.json")
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const orderBody = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customerId: 1
    };
    axios
      .post("/orders.json", orderBody)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
        console.log(response);
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
        console.log(error);
      });
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
    let orderSummary = null;
    let burger = this.state.error ? (
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        Ingredients Can't be Loaded
      </p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseContinue={this.purchaseContinueHandler}
          purchaseCancel={this.purchaseCancelHandler}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
