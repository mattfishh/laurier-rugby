import React from 'react';
import './components/Alumni.css';
import AlumniTier from './components/AlumniTier';
import Button from 'react-bootstrap/Button';

const donationLink = 'https://www.laurieralumni.ca/s/1681/15/adoptahawk-interior.aspx?sid=1681&gid=2&sitebuilder=1&pgid=1747'

export const Alumni = () => (
    <div>
        <h3 class='cardHeader'>FOUNDERS CLUB</h3>
        <div class='tierBackgroundPurple'>
        	<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    	</div>
        <h3 class='cardHeader'>GOLD TIER ($500+ PER YEAR)</h3>
        <AlumniTier inputtedTier={1}/>

        <h3 class='cardHeader'>PURPLE TIER ($100+ PER YEAR)</h3>
        <AlumniTier inputtedTier={0}/>

        <div class='centerButton'>
	        <Button variant="warning" href={donationLink} size="lg">
	    		JOIN THE FOUNDERS CLUB
	  		</Button>
  		</div>
    </div>
)