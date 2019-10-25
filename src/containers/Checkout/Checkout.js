import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";
import querystring from "querystring";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      price: 0
    };
  }

  componentWillMount() {
    const parsedQuery = {
      ...querystring.parse(this.props.location.search.replace("?", ""))
    };
    let { price, ...ingredients } = parsedQuery;
    for (const key in ingredients) {
      ingredients[key] = parseInt(ingredients[key]);
    }
    this.setState({ ingredients, price });
  }

  checkoutCancelHandler = props => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = props => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
