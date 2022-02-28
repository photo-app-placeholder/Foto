import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/noodles">Your Profile</Link>
      <Link to="/noodles/album1">Album1</Link>
      <Link to="/addImage">Add Image</Link>
      <Link to="/noodles/album1/photo1">Album1's photo</Link>
      <Link to="/noodles/album1/photo1/edit">Edit Album1's photo</Link>
    </header>
  );
}
