import React from 'react';
import { Link } from 'react-router-dom'

const SplashPage = () => (
  <div className="col-md-6 col-md-offset-3">
    <h2>Welcome to Checkable!</h2>
    <p>Checkable is a simple to use collaborative productivity appliaction. With checkable users can create lists which can be
      user to track the progress of tasks to do, serve as reminders or even as grocery lists. After creating checklists users can 
      add other users to them and assign list items to those users. Click below to login or if you don't have an account yet, sign up.
    </p>
    <li><Link to={'/login'}>Login</Link></li>
    <li><Link to={'/sign-up'}>Sign Up</Link></li>
  </div>
)

export { SplashPage };