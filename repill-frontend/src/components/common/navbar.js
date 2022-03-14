import { Link } from 'react-router-dom';
import React from 'react'

function navbar() {
  return (
    <div>
      <Link to="/notice">notice</Link> ||
      <Link to="/product">product</Link> ||
      <Link to="/login">login</Link>
    </div>
  )
}

export default navbar