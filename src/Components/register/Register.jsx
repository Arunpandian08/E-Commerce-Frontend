import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './register.css';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Redux/UserSlice';



const Register = ({ onClose, toggleForm, setNavVisible }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(
        {
            email: '',
            password: '',
            confirmPassword: ''
        }
    )

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
    });

    const handleSubmit = async (values) => {
        try {
            await dispatch(registerUser(values));
            setFormData({
                email: '',
                password: '',
                confirmPassword: ''
            })
            setNavVisible(false)
            onClose()
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <>
            <div className="card-back">
                <h1 className="header">
                    Register
                    <span>
                        <button onClick={onClose}>X</button>
                    </span>
                </h1>
                <Formik
                    initialValues={formData}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <label htmlFor="reg-email">Email:</label>
                            <Field type="email" name="email" autoComplete="email" placeholder="example@gmail.com" />
                            <ErrorMessage name="email" component="div" className="error" />

                            <label htmlFor="reg-password">Password:</label>
                            <Field type="password" name="password" autoComplete="new-password" placeholder="Enter your password" />
                            <ErrorMessage name="password" component="div" className="error" />

                            <label htmlFor="confirm-password">Confirm Password:</label>
                            <Field type="password" name="confirmPassword" autoComplete="new-password" placeholder="Confirm your password" />
                            <ErrorMessage name="confirmPassword" component="div" className="error" />

                            <button className="submit-btn" type="submit">Register</button>
                            <p className="toggle-link" onClick={toggleForm}>Already have an account? Sign in</p>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default Register;
