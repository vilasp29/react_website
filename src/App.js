import Header from './Header.js';
import Footer from './Footer.js';
import Login from './Login.js';
import Data from './Data.js';
import SignUp from './SignUp.js';
import About from './About.js';

import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';


function App() {
	//const API_URL = 'http://192.168.0.23:3500/accounts';
	const API_URL = 'https://my-json-server.typicode.com/vilasp29/react_website/accounts';
	const day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()];
	const [title, setTitle] = useState("");
	const [email, setEmail] = useState("");
    const [AccountData, setAccountData] = useState([]);
    
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(API_URL);
				const json = await response.json();
				setAccountData(json);
			} catch (err) {
				console.log(err.stack);
			}
		}
	    (async () => await fetchData())();		
	}, [])
    return (
		<div className="App">
	    	<Header title={title} />
		    	<Routes>
					<Route path="/" >
				    	<Route index element={
	                    	<Login AccountData={AccountData} setAccountData={setAccountData} email={email} setEmail={setEmail} setTitle={setTitle} />
						} />
						<Route path="data" element={
				  			<Data AccountData={AccountData} setAccountData={setAccountData} email={email} setEmail={setEmail}  setTitle={setTitle} day={day}/>
						} />
						<Route path="sign-up" element={
				 	 		<SignUp AccountData={AccountData} setAccountData={setAccountData} setTitle = {setTitle} API_URL={API_URL} />
					 	} />
						<Route path="about" element={
				  			<About setTitle={setTitle} />
						} />
					</Route>
		  		</Routes>
			<Footer title={title} />
	   </div>
    )
}

export default App
