import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

//Imported Components 
import Header from './components/header/header.component';
import Home from './pages/home/home.component';
import About from './pages/about/about.component';
import Solutions from './pages/solutions/solutions.component';
import Work from './pages/work/work.component';
import Journal from './pages/journal/journal.component';
import DetailedJournal from './pages/detailed-journal/detailed-journal.component';
import Contact from './pages/contact/contact.component';
import Footer from './components/footer/footer.component';

import './App.scss';

const apiUrl = "https://cms.matthewa.development/wp-json";

const loginData = {
    username: "selceeus",
    password: "1201ButterGus!"
};

axios
    .post('https://cms.matthewa.development/wp-json/jwt-auth/v1/token', loginData)
    .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_nicename', res.data.user_nicename);
        localStorage.setItem('user_email', res.data.user_email);
        localStorage.setItem('user_display_name', res.data.user_display_name);
    })
    .catch((err) => {
        console.log(err);
});

const authAxios = axios
    .create({
        baseUrl: apiUrl,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
});

function App() {

    const [data, setData] = useState([]);
    const [requestError, setRequestError] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const result = await authAxios
                    .get( apiUrl + "/wp/v2/pages/62" )
                    .then( result => setData(result.data) );

            } catch(err) {
                setRequestError(err.message);
            }
        };
        
        fetchData();
    }, []);

    return (
        <section className="App">
            
            <main role="main">

                <Router>

                    <section className="nav-container">
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                                <li>
                                    <Link to="/solutions">Solutions</Link>
                                </li>
                                <li>
                                    <Link to="/work">Work</Link>
                                </li>
                                <li>
                                    <Link to="/journal">Journal</Link>
                                </li>
                                <li>
                                    <Link to="/contact">Contact</Link>
                                </li>
                            </ul>
                        </nav>
                    </section>

                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/solutions">
                            <Solutions />
                        </Route>
                        <Route path="/work">
                            <Work />
                        </Route>
                        <Route path="/journal">
                            <Journal />
                        </Route>
                        <Route path="/journal/:journalId">
                            <DetailedJournal />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                    </Switch>

                </Router>

            </main>

            <Footer />
            
        </section>
    );
}

export default App;
