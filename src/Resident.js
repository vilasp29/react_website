import apiRequest from './apiRequest';
const Resident = ( {AccountData, setAccountData, email, setEmail, setTitle, API_URL} ) => {
	const account = AccountData.filter(AccountData => ((AccountData.email).toLowerCase()).includes(email.toLowerCase()));
	const newData = account;
	
	
	const processCheck = async (day) => {
		switch (day) {
			case "m": newData[0].times.m = !newData[0].times.m; break;
			case "t": newData[0].times.t = !newData[0].times.t;break;
			case "w": newData[0].times.w = !newData[0].times.w;break;
			case "th": newData[0].times.th = !newData[0].times.th;break;
			case "f": newData[0].times.f = !newData[0].times.f;break;
			case "s": newData[0].times.s = !newData[0].times.s;break;
			case "su": newData[0].times.su = !newData[0].times.su;break;
		}
		setAccountData(AccountData.map((e) => {
			if (e.email === email) {
				return newData[0];
			} else {
				return e;
			}
		}));
		
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newData[0])
		}
		const requrl = `${API_URL}/${newData[0].id}`;
		await apiRequest(requrl, options);
		
	}
	
	const signOut = () => {
		setEmail("");
	} 
	
	
	
	return (
			<>
				<label className="statusMsg">Signed in as {account[0].name}</label>
				<table onLoad={setTitle("Availability")}>
					<tbody>
						<tr>
							<th>Day</th>
							<th>Availablity</th>
						</tr>
						<tr>
							<td>Monday</td>
							<td><input type="checkbox" defaultChecked={account[0].times.m} id="m" onClick={ async () => processCheck("m")} /></td>
						</tr>
						<tr>
							<td>Tuesday</td>
							<td><input type="checkbox" defaultChecked={account[0].times.t} id="t" onClick={ async () => processCheck("t")} /></td>
						</tr>
						<tr>
							<td>Wednesday</td>
							<td><input type="checkbox" defaultChecked={account[0].times.w} id="w" onClick={ async () => processCheck("w")} /></td>
						</tr>
						<tr>
							<td>Thursday</td>
							<td><input type="checkbox" defaultChecked={account[0].times.th} id="th" onClick={ async () => processCheck("th")} /></td>
						</tr>
						<tr>
							<td>Friday</td>
							<td><input type="checkbox" defaultChecked={account[0].times.f} id="f" onClick={ async () => processCheck("f")} /></td>
						</tr>
						<tr>
							<td>Saturday</td>
							<td><input type="checkbox" defaultChecked={account[0].times.s} id="s" onClick={ async () => processCheck("s")} /></td>
						</tr>
						<tr>
							<td>Sunday</td>
							<td><input type="checkbox" defaultChecked={account[0].times.su} id="su" onClick={ async () => processCheck("su")}/></td>
						</tr>
					</tbody>
				</table>
				<button onClick={signOut}>Sign Out</button>
			</>
	)
}

export default Resident;