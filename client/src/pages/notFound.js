import React from 'react'
import '../styles/Error.css'
import {Link} from 'react-router-dom'
const NotFound = () => {
  return (
    <div>
      <h1 className='text-center'>Page Not Found</h1>
      <img src="/assets/images/404error.png" alt="error" className='center'/>
      <Link className='btn btn-success' to="/">
      Go Back
      </Link>
    </div>
  )
}

export default NotFound
