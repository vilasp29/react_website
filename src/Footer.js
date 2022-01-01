import { Link } from 'react-router-dom';
const Footer = () => {
	return (
		<footer className="Footer" >
			<table>
				<td style={{width: "200px"}}><Link to="/about" >About</Link> </td>
				<td style={{width: "200px", whiteSpace: "nowrap"}}>Made by Cargo Clickers. </td>
			</table>
		</footer>
	)
}

//style={{alignitems: "left"}}

export default Footer