import React from 'react';
import './Alumni.css';
import styled from 'styled-components'

const TIER_CLASSES = ['tierBackgroundPurple','tierBackgroundYellow'];
const GOLD_TIER = ['CHARLIE HORNER - Class of 2011', 'Matt Goldman - Class of 1989','Russell Horner - Class of 1970','Russell Horner - Class of 1996','Mike Fish - Class of 1983','Russell Goldman - Class of 2019','Matt Horner - Class of 1961','Charlie Horner - Class of 2002','Charlie Fish - Class of 1968','Ben Horner - Class of 1968','Mike Taylor - Class of 1967'];
const PURPLE_TIER = ['Mike Goldman - Class of 2000','Mike Goldman - Class of 2017','Charlie Goldman - Class of 2019','Russell Taylor - Class of 1983','Russell Smith - Class of 1966','Russell Fish - Class of 2002','Russell Smith - Class of 1997','Russell Smith - Class of 1969','Matt Smith - Class of 2008','Ben Taylor - Class of 1993'];

class AlumniTier extends React.Component {
	constructor(props, inputtedTier) {
        super(props);
    };

	render() {
		var tierData = [];
		var hiddenIconClass = 'hideLi';

		if(this.props.inputtedTier === 0){
			var tierData =[...PURPLE_TIER];
			var hiddenIconClass = hiddenIconClass + 'Purple';
		} else if (this.props.inputtedTier === 1) {
			var tierData =[...GOLD_TIER];
			var hiddenIconClass = hiddenIconClass + 'Yellow';
		}

		{/*Assign column item sizes */}
		var tierDataLength = tierData.length;
		var col1Size = Math.ceil(tierDataLength/2);
		var col2Size = Math.floor(tierDataLength/2);

		{/*Splice data into two arrays*/}
		var col1 = tierData.splice(0, col1Size);
		var col2 = [...tierData];

		{/*Check if columns are different size. If so add a blank item to second col*/}
		if(col1Size !== col2Size){
			col2.push('-');
		}

		return (
			<div class={TIER_CLASSES[this.props.inputtedTier]}>
				<ul class='twoColList'>
					{col1.map(donator => (
						<li>{donator}</li>
					))}
					
				</ul>
				<ul class='twoColList'>
					{col2.map(donator => (
						donator === '-' ? <li class={hiddenIconClass}>{donator}</li> : <li>{donator}</li>
					))}
				</ul>
			</div>
		);
	}
}


export default AlumniTier;


