import React from 'react';
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
  <>
   <ul>
          <li><NavLink to="/addImage">ADD USER</NavLink></li>
          <li><NavLink to="/all">ALL USER</NavLink></li>
        </ul>
  </>
  )}
export default Home;
