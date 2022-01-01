import { useState, useEffect } from 'react';

const Delivery = ({AccountData, setAccountData, email, setEmail, setTitle, API_URL}) => {
	const [locPost, setLocPost] = useState("");
	const [nearAccounts, setNearAccounts] = useState([]);

	const account = AccountData.filter(AccountData => ((AccountData.email).toLowerCase()).includes(email.toLowerCase()));
	
	const checkPostcodes = async (pos) => {
		const options = {
			method: 'GET'
		}
		const result = await fetch(`https://api.postcodes.io/postcodes?lon=${pos.coords.longitude}&lat=${pos.coords.latitude}`, options);
		const respJson = await result.json();
		setLocPost(respJson.result[0].postcode);
		
		if (locPost) {
			const result2 = await fetch (`https://api.postcodes.io/postcodes/${locPost}/nearest`, options)
			const respJson2 = await result2.json();
			const nearbyPost = respJson2.result.map((o) => {
				return o.postcode;
			});
			setNearAccounts(AccountData.filter((a) => {
				if (nearbyPost.includes(a.post)) {
					return a;
				}
			}));
		}
	}
	
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(checkPostcodes);
	}, [])
	return (
		<>
			{setTitle("Delivery")}
			<label>{locPost === "" ? "" : `Your current postcode is ${locPost}.`}</label>
			<br/>
			<button onClick={() => {navigator.geolocation.getCurrentPosition(checkPostcodes)}}>Click to see nearby volunteers</button>
			<br/>
			<label>{nearAccounts.length} nearby volunteer{nearAccounts.length === 1 ? "" : "s"} {nearAccounts.length === 1 ? "was" : "were"} found: </label>
			<ul>
				{nearAccounts.map((acc) => (
					<>
						<label>Name: {acc.name}</label>
						<br/>
						<label>Address: {acc.houseNum} {acc.address1}, {acc.address2}, {acc.post}</label>
						<br/>
						<br/>
					</>
				))}
			</ul>
		</>
	)
}

export default Delivery;