import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

const IMAGE_ARRAY = [	['https://www.laurierathletics.com/images/news/art10381_pic1.jpg',"MRUG falls in Battle of Waterloo to Warriors","Golden Hawks miss out on opportunity to compete for OUA Championship; will play in consolation bracket of playoffs"],
						['https://www.laurierathletics.com/images/news/art10401_pic1.jpg',"James' late try propels MRUG past Western","Golden Hawks knock off the Mustangs 36-31 in the OUA consolation quarter-finals"],
						['https://www.laurierathletics.com/images/news/art10445_pic1.jpg',"MRUG overwhelms RMC en route to securing fifth place","Golden Hawks score 45 unanswered points to crusie past the Paladins 50-12 in consolation final"],
						['https://www.laurierathletics.com/images/news/art10428_pic1.jpg',"MRUG knocks off McMaster in consolation semifinals","Golden Hawks advance to play for fifth place after doubling up on the Marauders 38-19"]
					];


class SlideShowImage extends React.Component {
	constructor(props, inputtedTier) {
        super(props);
    };

	render() {
		return (
			<div>
				<Carousel>		
					{IMAGE_ARRAY.map(subImgArr => (
						<Carousel.Item>
							<img className="d-block w-100" src={subImgArr[0]} alt="First slide"/>

							<Carousel.Caption>
						  		<h3>{subImgArr[1]}</h3>
						  		<p>{subImgArr[2]}</p>
							</Carousel.Caption>
						</Carousel.Item>
					))}
				</Carousel>
			</div>
		);
	}
}

export default SlideShowImage;