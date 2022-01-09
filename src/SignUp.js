import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiRequest from './apiRequest'
	
const SignUp = ( {AccountData, setAccountData, setTitle, API_URL} ) => {
	const [errLabel, setErrLabel] = useState("");
	
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [post, setPost] = useState("");
	const [address1, setAddress1] = useState("");
	const [address2, setAddress2] = useState("");
	const [houseNum, setHouseNum] = useState("");
	const navigate = useNavigate();

	const onSubmit = async (e) => {
		e.preventDefault();
		if (!errLabel) {
			const newAccount = {id: AccountData[AccountData.length-1].id+1, email: email, password: pass, name: name, phone: phone, houseNum: houseNum, address1: address1, address2: address2, post: post.toUpperCase(), role: "R", times : {m: false, t: false, w: false, th: false, f: false, s: false, su: false}};
			const data = [...AccountData, newAccount];
			setAccountData(data);
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newAccount)
			}
			await apiRequest(`${API_URL}`, options);
			
			navigate("/");
		} else {
			setErrLabel("This postcode is invalid.");
		}
	}
	
	const onCancel = () => {
		navigate("/");
	}
	return (
		<form onSubmit={onSubmit} onLoad={setTitle("Sign-Up")} className="SignUp">
			<label>Your Email Address: </label>
			<br/>
			<input
				required
				type="email"
				onChange={(e) => {
					const notOk = AccountData.filter(AccountData => ((AccountData.email).toLowerCase()).includes(e.target.value.toLowerCase()))[0];
					setErrLabel(notOk ? "This email already exists." : "");
					setEmail(e.target.value)
				}}
			/>
			<span className="validity"></span>
			<br/>
			<label>Your Full Name: </label>
			<br/>
			<input
				required
				type="text"
				onChange={(e) => {setName(e.target.value)}}
			/>
			<span className="validity"></span>
			<br/>
			<label>Your Phone Number: </label>
			<br/>
			<input
				required
				type="tel"
				pattern="^\s*\(?(020[7,8]{1}\)?[ ]?[1-9]{1}[0-9{2}[ ]?[0-9]{4})|(0[1-8]{1}[0-9]{3}\)?[ ]?[1-9]{1}[0-9]{2}[ ]?[0-9]{3})\s*$"
				onChange={(e) => {setPhone(e.target.value)}}
			/>
			<span className="validity"></span>
			<br/>
			<label>Your House Name/Number: </label>
			<br/>
			<input
				required
				type="text"
				onChange={(e) => {setHouseNum(e.target.value)}}
			/>
			<span className="validity"></span>
			<br/>
			<label>Your Address Line 1: </label>
			<br/>
			<input
				type="text"
				onChange={(e) => {setAddress1(e.target.value)}}
			/>
			<span className="validity"></span>
			<br/>
			<label>Your Address Line 2: </label>
			<br/>
			<input
				type="text"
				onChange={(e) => {setAddress2(e.target.value)}}
			/>
			<span className="validity"></span>
			<br/>
			<label>Your Postcode: </label>
			<br/>
			<input
				required
				type="text"
				onChange={ async (e) => {
					const options = {
						method: 'GET'
					}
					const result = await fetch(`https://api.postcodes.io/postcodes/${e.target.value}/validate`, options);
					const respJson = await result.json();
					setErrLabel(respJson.result ? "" : "This postcode is invalid.");
					setPost(e.target.value);
				}}
			/>
			<span className="validity"></span>
			<br/>
			<label>Your Password For This Website: </label>
			<br/>
			<input
				required
				type="password"
				pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
				title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
				onChange={(e) => {setPass(e.target.value)}}
			/>
			<span className="validity"></span>
			<br/>
			<label className="wrong">{errLabel}</label>
			<br/>
			<button type="submit">Create Account</button>
			<button className="cancelButton" onClick={onCancel}>Cancel</button>
		</form>
	)
}

export default SignUp;
