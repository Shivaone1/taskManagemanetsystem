import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  let navigate = useNavigate();
  
  function logout() {
    localStorage.clear();
    navigate('/login');
  }
  
  return (
    <div className='container-fluid bg-primary'>
      <div className='container'>
        <nav className='navbar navbar-dark navbar-expand-lg py-0'>
          <Link to='/' className='btn btn-success'> Home </Link>
          <button type='button' className='navbar-toggler me-0' data-bs-toggle='collapse' data-bs-target='#navbarCollapse' >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse bg-transparent' id='navbarCollapse'>
            <div className='navbar-nav ms-auto mx-xl-auto p-0'>
              {localStorage.getItem("login") ? (
                <>
                  <Link to='/list-task' className='btn btn-success'> List Task </Link>&nbsp;
                  <Link to='/add-task' className='btn btn-success'> Add Task </Link>
                </>
              ) : (
                <h1 className="text-center">Please Login</h1>
              )}
            </div>
          </div>
          <div className='d-xl-flex flex-shrink-0'>
            <div className='d-flex align-items-center justify-content-center ms-4'>
              {localStorage.getItem('login') ? (
                <div className='nav-item dropdown bg-danger'>
                  <Link to='#' className='nav-link dropdown-toggle text-light' data-bs-toggle='dropdown'>
                    {localStorage.getItem('name')}
                  </Link>
                  <div className='dropdown-menu fade-up m-0'>
                    {localStorage.getItem('role') === '1' && (
                      <>
                        <Link to='/Dashboard' className='dropdown-item'> Dashboard </Link>
                        <Link to='/add-task' className='dropdown-item'> Add Task </Link>
                        <Link to='/list-task' className='dropdown-item'> List Task </Link>
                      </>
                    )}
                    <button className='dropdown-item' onClick={logout}>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to='/login' className='btn btn-primary p-3'>Login </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
