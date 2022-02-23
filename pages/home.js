import React, {Component} from "react";
import { Link } from '../routes';
import ReactDOM from "react-dom";
// import "./index.css";
// import * as serviceWorker from "./serviceWorker";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import {
//     NavBar as NavBar,
//     Footer as Footer,
//     Home as Home,
//     About as About,
//     Contact as Contact
// } from "../../components";

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Home from '../components/Home';
import About from '../components/About';
import Contact from '../components/Contact';

class Homepage extends Component {
    render() {
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" elements={<Contact />} />
            </Routes>
            <Footer />
        </Router>

        // document.getElementById("root")
    };
}

// serviceWorker.unregister();