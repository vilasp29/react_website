import Header from './Header.js';
import Footer from './Footer.js';
import Login from './Login.js';
import Data from './Data.js';
import SignUp from './SignUp.js';
import About from './About.js';

import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';


function App() {
	//const API_URL = 'http://192.168.0.23:3500/accounts';
	const API_URL = 'https://my-json-server.typicode.com/vilasp29/react_website/accounts';
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
		    	<Switch>
			    	<Route exact path="/">
                    	<Login AccountData={AccountData} setAccountData={setAccountData} email={email} setEmail={setEmail} setTitle = {setTitle} />
					</Route>
					<Route exact path="/data">
			  			<Data AccountData={AccountData} setAccountData={setAccountData} email={email} setEmail={setEmail}  setTitle = {setTitle}  API_URL={API_URL} />
					</Route>
					<Route exact path="/sign-up">
			 	 		<SignUp AccountData={AccountData} setAccountData={setAccountData} setTitle = {setTitle} API_URL={API_URL} />
					</Route>
						<Route exact path="/about" >
			  		<About setTitle={setTitle} />
					</Route>
		  		</Switch>
	    	<Footer />
	   </div>
    )
}

export default App
