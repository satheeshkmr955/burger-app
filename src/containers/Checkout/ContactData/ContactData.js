import React, { Component } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";

import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components//UI/Input/Input";
import styles from "./ContactData.css";
import validationSchema from "./validateSchema";
import { purchaseBurger } from "../../../store/actions/orders";

const initialValues = {
  name: "",
  email: "",
  street: "",
  postal: "",
  country: "",
  deliveryMethod: null
};

const deliveryOptions = [
  { value: "FASTEST", label: "Fastest" },
  { value: "CHEAPEST", label: "Cheapest" }
];

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
      }
    };
  }

  orderHandler = async () => {
    // console.log(this.props);
    const orderBody = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: this.state.orderForm
    };
    this.props.onOrderBurger(orderBody);
  };

  render() {
    const Form = () => {
      const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
          const deliveryMethod = values.deliveryMethod.value;
          this.setState({ orderForm: { ...values, deliveryMethod } }, () => {
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
        handleSubmit,
        setFieldValue,
        setFieldTouched
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
          <Input
            inputtype="select"
            options={deliveryOptions}
            type="select"
            name="deliveryMethod"
            id="deliveryMethod"
            value={values.deliveryMethod}
            placeholder="Your Delivery Method"
            onChange={value => setFieldValue("deliveryMethod", value)}
            onBlur={() => setFieldTouched("deliveryMethod", true)}
          />
          {touched.deliveryMethod && (
            <div className={styles.errors}>{errors.deliveryMethod}</div>
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
        {this.props.loading ? <Spinner /> : <Form />}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.orders.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: orderBody => dispatch(purchaseBurger(orderBody))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
