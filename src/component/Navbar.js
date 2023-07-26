import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export  class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex' ,padding:'1rem',color:"blue" , textDecoration: 'none',backgroundColor:'whitesmoke'}}>
        <Link to="/" style={{textDecoration: 'none',paddingRight:'1rem'}}><h1 >Movies App</h1></Link>
        <Link to='/favourite' style={{padding:'0.5rem' ,textDecoration: 'none'}}><h2 >Favourite</h2></Link>
      </div>
    )
  }
}


export default Navbar;