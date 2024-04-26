import React from 'react'
import {Link} from 'react-router-dom'

export default function Dashboard () {
  return (
    <>
      <div className='container -right-3'>
        <div className='row py-lg-5 my-lg-5'>
          <div className='card' style={{width: "18rem"}}>
            <div className='card-body'>
              <h5 className='card-title'>List Task</h5>
              <p className='card-text'>
                All Task List 
              </p>
              <Link to='/list-task' className='btn btn-primary'>
                Go List
              </Link>
            </div>
          </div>
          &nbsp;
          <div className='card' style={{width: "18rem"}}>
            <div className='card-body'>
              <h5 className='card-title'>Create Task</h5>
              <p className='card-text'>
                Create A new Task Here...
              </p>
              <Link to='/add-task' className='btn btn-primary'>
                Go Add
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
