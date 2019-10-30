import React, { Component } from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  async componentDidMount() {
    const fetchedOrders = [];
    try {
      const apiRes = await axios.get("/orders.json");
      const orderDetails = apiRes.data;
      for (const key in orderDetails) {
        fetchedOrders.push({ ...orderDetails[key], id: key });
      }
    } catch (err) {
      console.log(err);
    }
    this.setState({ loading: false, orders: fetchedOrders });
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            price={order.price}
            ingredients={order.ingredients}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
