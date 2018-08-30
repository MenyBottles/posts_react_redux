import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">Posts</Link>
            </nav>  
        </div>
    )
}

export default NavBar;