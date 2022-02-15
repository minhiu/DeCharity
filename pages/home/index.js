import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
// import * as serviceWorker from "./serviceWorker";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    NavBar,
    Footer,
    Home,
    About,
    Contact
} from "./components";

ReactDOM.render(
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
);

// serviceWorker.unregister();