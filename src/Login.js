import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ( {AccountData, setAccountData, email, setEmail, setTitle} ) => {
	const [pass, setPass] = useState('');
	const [label, setLabel] = useState('');
	const navigate = useNavigate();
	
	const checkData = (e) => {
		e.preventDefault();
		const account = AccountData.filter(AccountData => ((AccountData.email).toLowerCase()).includes(email.toLowerCase()));
		
		if (account[0]) {
			if (account[0].password === pass) {
				navigate("/data");
				return;
			}
		}
		setLabel("Your account or password is incorrect.");
	}
	return (
		<form className="Login" onSubmit={checkData} onLoad={setTitle("Login")}>
			<label>Email: </label>
			<input 
				required 
				type="email" 
				onChange={(e) => {setEmail(e.target.value)}}
			/>
			<br/>
			<label>Password: </label>
			<input
				required 
				type="password"
				onChange={(e) => {setPass(e.target.value)}}
			/>
			{label && <br/>}
			<label className="wrong">{label}</label>
			<br/>
			<label>Don't have an account? </label><Link to="/sign-up">Create one!</Link>
			<br/>
			<button 
				type="submit"
			>
				Login
			</button>
		</form>
	)
}

export default Login