import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './login.css';
import { useDispatch } from 'react-redux';
import {  getUser, signInUser } from '../../Redux/UserSlice';


const Login = ({ onClose, toggleForm,setNavVisible }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: (values) => {
      dispatch(signInUser(values));
      onClose();
      setNavVisible(false)
    }
  });

  return (
    <div>
      <div className="card-front">
        <h1 className="header">
          Sign in
          <span>
            <button onClick={onClose}>X</button>
          </span>
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="example@gmail.com"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter a valid password"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}

          <button className="submit-btn" type="submit">Sign in</button>
          <p className="toggle-link" onClick={toggleForm}>Don't have an account? Register</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
