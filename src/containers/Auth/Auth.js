import React, { Component } from "react";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import { auth } from "../../store/actions/index";
import styles from "./Auth.css";

const formValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("Email Is Required"),
  password: Yup.string().required("Password Is Required")
});

class Auth extends Component {
  state = { isSignup: true };

  switchSignupHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  MyForm = props => {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit
    } = props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
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
            value={values.password}
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && (
            <div className={styles.errors}>{errors.password}</div>
          )}
          <Button type="submit" btntype="Success">
            SUBMIT
          </Button>
        </form>
      </div>
    );
  };

  MyEnhancedForm = withFormik({
    mapPropsToValues: () => ({
      email: "",
      password: ""
    }),
    validationSchema: formValidationSchema,
    handleSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      let { email, password } = values;
      const { isSignup } = this.state;
      this.props.onAuth({ email, password, isSignup });
    },
    displayName: "AuthenticationForm"
  })(this.MyForm);
  render() {
    const { isSignup } = this.state;
    const { loading, error } = this.props;
    let errorMessage = null;
    if (error) {
      errorMessage = <p>{error.message}</p>;
    }
    return (
      <div className={styles.Auth}>
        {errorMessage}
        {loading ? (
          <Spinner />
        ) : (
          <>
            <this.MyEnhancedForm />
            <Button clicked={this.switchSignupHandler} btntype="Danger">
              SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
            </Button>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { loading, error } = state.auth;
  return { loading, error };
};
const mapDispatchToProps = dispatch => {
  return { onAuth: payload => dispatch(auth(payload)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
