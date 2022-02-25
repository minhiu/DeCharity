import React from 'react';
import Link from 'next/link';

export default function NavBar() {
    return (
        <div className="navigation">
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        DeCharity Homepage
                    </Link>
                    <div>
                        <u1 className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to = "/about">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">
                                    Contact
                                </Link>
                                <li className="nav-item">
                                    <Link className="nav-link" to = "/blog">
                                        Blog
                                    </Link>
                                </li>
                            </li>
                        </u1>
                    </div>
                </div>
            </nav>
        </div>
    );
};