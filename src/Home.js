import React from 'react';
import './components/Home.css';
import SlideShowImage from './components/SlideShowImage';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';
import {GameCard, OpponentImage, GameInfo, GameTitle, GameDate, GameResult, ScoreText} from './Schedule';

var moment = require('moment');


const RECENT_GAME = gql`
    query GetSchedules {
        allSchedules(orderBy: GAME_TIME_DESC first:1) {
            nodes {
                gameId
                gameTime
                laurierScore
                otherTeamId
                otherTeamScore
                teamByOtherTeamId {
                    schoolName
                    teamName
                    homefield
                    imageUrl
                }
            }
        }
    }
`;


export const Home = () => (
    <div class='siteBody'>
    	{/*Slide show component */}
    	<SlideShowImage />

    	{/*Repurposed component from schedule, to display most recent game on home page*/}
	    <div class='recentGame'>
	        <Query
	            query={RECENT_GAME}
	        >
	            {({ loading, error, data }) => {
	                if (loading) return <p>Loading...</p>;
	                if (error) {
	                    console.log(error);
	                    return <p>Error</p>
	                };

	                return data.allSchedules.nodes.map(({
	                    gameId,
	                    gameTime,
	                    teamByOtherTeamId,
	                    laurierScore,
	                    otherTeamScore,
	                }) => {
	                    const { schoolName, teamName, imageUrl } = teamByOtherTeamId;
	                    const gameResult = laurierScore > otherTeamScore ? 'W' : (laurierScore === otherTeamScore ? 'T' : 'L');

	                    return (
	                        <GameCard key={gameId}>
	                            <OpponentImage src={imageUrl} />
	                            <GameInfo>
	                                <GameTitle>{(`Laurier Golden Hawks VS ${schoolName} ${teamName}`).toUpperCase()}</GameTitle>
	                                <GameDate>{moment(gameTime).format('MMMM Do, YYYY @ h:mm a')}</GameDate>
	                            </GameInfo>
	                            <GameResult>
	                                <ScoreText>
	                                    {`${gameResult} ${gameResult === 'W' ? laurierScore : otherTeamScore}
	                                    - ${gameResult === 'W' ? otherTeamScore : laurierScore}`}
	                                </ScoreText>
	                            </GameResult>
	                        </GameCard>
	                    );
	                })
	            }}
	        </Query>
	        <div style={{ marginBottom: '4em' }} />
	    </div>
    </div>
)

