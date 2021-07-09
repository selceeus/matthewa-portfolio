import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './contact.styles.scss';

const {REACT_APP_API_URL} = process.env;

const authAxios = axios
    .create({
        baseUrl: REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
});

const Contact = props => {

    const [data, setData] = useState([]);
    const [requestError, setRequestError] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await authAxios
                    .get( `${REACT_APP_API_URL}wp-json/wp/v2/pages/14` )
                    .then( result => setData(result.data) );

            } catch(err) {
                setRequestError(err.message);
            }
            
        };
        
        fetchData();
    }, []);

    return(
        <section className="contact">
            <h1>Contact</h1>
            {console.log(data)}
        </section>
    );
}

export default Contact;