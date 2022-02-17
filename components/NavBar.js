import React from 'react';
import {NavLink} from "react-router-dom";

export default() => {
    return (
        <div className="navigation">
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        DeCharity Homepage
                    </NavLink>
                    <div>
                        <u1 className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Home
                                    <span className="sr-only">(current)</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to = "/about">
                                    About
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">
                                    Contact
                                </NavLink>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to = "/blog">
                                        Blog
                                    </NavLink>
                                </li>
                            </li>
                        </u1>
                    </div>
                </div>
            </nav>
        </div>
    );
};