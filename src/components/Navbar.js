import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav class="navbar shadow-none px-5 w-100" style={{ position: 'absolute' }}>
            <span class="navbar-brand mb-0 h1">Notatki</span>
        </nav>
    )
}

export default Navbar;