import { useNavigate } from 'react-router-dom';

import Resident from './Resident';
import Delivery from './Delivery';
const Data = ( {AccountData, setAccountData, email, setEmail, setTitle, API_URL, day} ) => {
	const navigate = useNavigate();

	const account = AccountData.filter(AccountData => ((AccountData.email).toLowerCase()).includes(email.toLowerCase()));
	
	return (
		<div className="Data">
			{email && 
				<>
					{account[0].role  === "R" &&
						<Resident AccountData={AccountData} setAccountData={setAccountData} email={email} setEmail={setEmail} setTitle = {setTitle}  API_URL={API_URL} />
					}
					{account[0].role  === "D" &&
						<Delivery AccountData={AccountData} setAccountData={setAccountData} email={email} setEmail={setEmail} setTitle = {setTitle}  API_URL={API_URL} day={day}/>
					}
				</>
			}
			{!email &&
				navigate("/")
			}
		</div>
	)
}

export default Data;