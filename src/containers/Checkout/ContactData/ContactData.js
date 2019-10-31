import React, { Component } from "react";
import { useFormik } from "formik";

import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import validationSchema from "./validateSchema";
import Input from "../../../components//UI/Input/Input";
import styles from "./ContactData.css";

const initialValues = {
  name: "",
  email: "",
  street: "",
  postal: "",
  country: "",
  deliveryMethod: "fastest"
};

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: "",
        email: "",
        street: "",
        postal: "",
        country: "",
        deliveryMethod: ""
      },
      loading: false
    };
  }

  orderHandler = async () => {
    console.log(this.props);
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
    const Form = () => {
      const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
          this.setState({ orderForm: { ...values } }, () => {
            this.orderHandler();
          });
        }
      });
      const {
        values,
        touched,
        errors,
        handleBlur,
        handleChange,
        handleSubmit
      } = formik;
      return (
        <form onSubmit={handleSubmit}>
          <Input
            inputtype="input"
            type="text"
            value={values.name}
            name="name"
            id="name"
            placeholder="Your Name"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && <div className={styles.errors}>{errors.name}</div>}
          <Input
            inputtype="input"
            value={values.email}
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && <div className={styles.errors}>{errors.email}</div>}
          <Input
            inputtype="input"
            value={values.street}
            type="text"
            name="street"
            id="street"
            placeholder="Your Street"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.street && (
            <div className={styles.errors}>{errors.street}</div>
          )}
          <Input
            inputtype="input"
            value={values.country}
            type="text"
            name="country"
            id="country"
            placeholder="Your Country"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.country && (
            <div className={styles.errors}>{errors.country}</div>
          )}
          <Input
            inputtype="input"
            value={values.postal}
            type="number"
            name="postal"
            id="postal"
            placeholder="Your Postal Code"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.postal && (
            <div className={styles.errors}>{errors.postal}</div>
          )}
          <Button btntype="Success" type="submit">
            ORDER
          </Button>
        </form>
      );
    };
    return (
      <div className={styles.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {this.state.loading ? <Spinner /> : <Form />}
      </div>
    );
  }
}

export default ContactData;
