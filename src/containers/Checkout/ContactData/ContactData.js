import React, { Component } from "react";
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import styles from "./ContactData.css";

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: {
        street: "",
        postalCode: ""
      },
      loading: false
    };
  }

  orderHandler = async event => {
    console.log("orderHandler", this.props);
    this.setState({ loading: true });
    const orderBody = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customerId: 1
    };
    try {
      const orderRes = await axios.post("/orders.json", orderBody);
      console.log(orderRes);
      this.setState({ loading: false });
      this.props.history.push("/");
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
  };

  render() {
    let forms = (
      <form>
        <input
          className={styles.Input}
          type="text"
          name="name"
          id="name"
          placeholder="Your Name"
        />
        <input
          className={styles.Input}
          type="email"
          name="email"
          id="email"
          placeholder="Your Email"
        />
        <input
          className={styles.Input}
          type="text"
          name="street"
          id="street"
          placeholder="Your Street"
        />
        <input
          className={styles.Input}
          type="text"
          name="postal"
          id="postal"
          placeholder="Your Postal Code"
        />
        <Button
          btnType="Success"
          clicked={e => {
            e.preventDefault();
            this.orderHandler();
          }}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      forms = <Spinner />;
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {forms}
      </div>
    );
  }
}

export default ContactData;
