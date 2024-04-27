import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const postData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/login/`, {
                email: data.email,
                password: data.password
            });
            const responseData = response.data;
            console.log(responseData.message);
            if (responseData) {
                localStorage.setItem("login", true);
                localStorage.setItem("name", responseData.data.name);
                localStorage.setItem("email", responseData.data.email);
                localStorage.setItem("role", responseData.data.role);
                localStorage.setItem("mobile", responseData.data.mobileNumber);

                if (responseData.data.role === 1) {
                    navigate(`/dashboard`);
                    toast.success('Login Successfully!!!');
                }
            } else {
                toast.error('Some Thing Wrong...');
            }

        } catch (error) {
            setShowError(true);
            toast.error('Error while logging in:', error);
        }
    };

    return (
        <div className="container-fluid my-3">
            <div className="w-75 m-auto">
                <h5 className='text-center bg-primary p-2 text-light'><span className='text-warning fs-3'>Login</span> to Your Account</h5>
                {showError &&
                    <p className='text-danger text-center p-2'>Invalid Email ID or Password</p>
                }
                <form onSubmit={postData}>
                    <div className="mb-3">
                        <label>Email ID</label>
                        <input type="text" name="email" onChange={getInputData} placeholder='User Email ID' className='form-control' />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" name="password" onChange={getInputData} placeholder='Password' className='form-control' />
                    </div>
                    <div className="mb-3">
                        <div className="btn-group w-100">
                            <Link to="/signup" className='btn btn-success'>Signup</Link>
                            <button type="submit" className='btn btn-primary'>Login</button>
                        </div>
                        <Link to="#">Forget Password</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
