import { useHistory } from 'react-router-dom';
import apiRequest from './apiRequest';

import Resident from './Resident';
import Delivery from './Delivery';
const Data = ( {AccountData, setAccountData, email, setEmail, setTitle, API_URL} ) => {
	const history = useHistory();

	const account = AccountData.filter(AccountData => ((AccountData.email).toLowerCase()).includes(email.toLowerCase()));
	const newData = account;
	
	
	return (
		<div className="Data">
			{email && 
				<>
					{account[0].role  === "R" &&
						<Resident AccountData={AccountData} setAccountData={setAccountData} email={email} setEmail={setEmail}  setTitle = {setTitle}  API_URL={API_URL} />
					}
					{account[0].role  === "D" &&
						<Delivery AccountData={AccountData} setAccountData={setAccountData} email={email} setEmail={setEmail}  setTitle = {setTitle}  API_URL={API_URL} />
					}
				</>
			}
			{!email &&
				history.push("/")
			}
		</div>
	)
}

export default Data;