import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Signup() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData((old) => ({
            ...old,
            [name]: value
        }));
    };

    const postData = async (e) => {
        e.preventDefault();
        if (data.password === data.cpassword) {
            try {
                let response = await axios.post("http://127.0.0.1:8000/api/signUp/", data);
                const responseData = response.data;
                navigate(`/login`)
                toast.success(responseData.message)
            } catch (error) {
                console.error('Error while signing up:', error);
                setShow(true);
                setMessage("An error occurred while signing up. Please try again.");
            }
        } else {
            setShow(true);
            setMessage("Password and Confirm Password Don't Match!!!!");
        }
    };

    return (
        <div className="container-fluid my-3">
            <div className="w-75 m-auto">
                <h5 className='text-center bg-primary p-2 text-light'><span className='text-warning fs-3'>Create</span> Your Account</h5>
                {show &&
                    <p className='text-danger text-center p-2'>{message}</p>
                }
                <form onSubmit={postData}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Name</label>
                            <input type="text" name="name" onChange={getInputData} placeholder='Full Name' className='form-control' />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Username</label>
                            <input type="text" name="username" placeholder='User Name' className='form-control' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Email</label>
                            <input type="email" name="email" onChange={getInputData} placeholder='Email Address' className='form-control' />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Phone</label>
                            <input type="text" name="phone"  placeholder='Phone Number' className='form-control' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Password</label>
                            <input type="password" name="password" onChange={getInputData} placeholder='Password' className='form-control' />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Confirm Password</label>
                            <input type="password" name="cpassword" onChange={getInputData} placeholder='Confirm Password' className='form-control' />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="btn-group w-100">
                            <Link to="/login" className='btn btn-success'>Login</Link>
                            <button type="submit" className='btn btn-primary'>Signup</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
