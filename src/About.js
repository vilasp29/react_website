import { useHistory } from 'react-router-dom';
const About = ( {setTitle} ) => {
	const history = useHistory();
	return (
		<div className='about'>
		{setTitle("About")}
			<p>
				Cargo Clickers is a team that is helping everyone have faster deliveries.<br/>
				We have an idea to make missed parcels a thing of the past.<br/>
				We plan to have local people (in your post code ie. up to 30 houses) accept parcels when you are out, so you can collect from them later.<br/>
				Register to accept parcels, detailing when you could take parcels or have them collected from you. Delivery firms can then use this information to deliver parcels locally:<br/>
				<p>
					<ol>
						<li> Avoiding redelivery costs</li>
					    <li> You get your parcels sooner</li>
						<li> Get to know your community</li>
						<li> Reduce energy costs (help the environment) by reducing repeat deliveries.</li>
					</ol>
				</p>
			</p>
			<button onClick={history.goBack}>Return to previous page</button>
		</div>
	)
}

export default About;