import React from 'react';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';
import styled from 'styled-components'
import { laurier_purple, white, black } from './colours';
var moment = require('moment');


const GET_SCHEDULE = gql`
    query GetSchedules {
        allSchedules(orderBy: GAME_TIME_DESC) {
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

// pixels
const mobileMaxWidth = 700;

export const Schedule = () => (
    <>
        <div style={{ marginTop: '2em' }} />
        <Query
            query={GET_SCHEDULE}
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
    </>
);

export const GameCard = styled.div`
    display: flex;
    flex-direction: row;
    border: 5px solid ${laurier_purple};
    height: 8em;
    margin: 0em 0.5em;
    margin-bottom: 1em;
`;

export const OpponentImage = styled.img`
    flex: 1;
    max-width: 6em;
    height: auto;
    margin: 1em 2em 1em 2em;

    @media screen and (max-width: ${mobileMaxWidth}px) {
        max-width: 5em;
        margin-left: 0.75em;
        margin-right: 0.5em;
    }
`;

export const GameInfo = styled.div`
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1em 2em 1em 0em;

    @media screen and (max-width: ${mobileMaxWidth}px) {
        margin-left: 0.5em;
        margin-right: 0.75em;
    }
`;

export const GameTitle = styled.p`
    color: ${black};
    font-style: normal;
    font-weight: bold;
    font-size: 1em;
    line-height: 1.2em;
    margin: 0em 0em 0.5em 0em;

    @media screen and (max-width: ${mobileMaxWidth}px) {
        font-size: 1em;
        font-size: 0.75em;
    }
`;

export const GameDate = styled.p`
    color: ${black};
    font-style: normal;
    font-size: 1em;
    line-height: 1.2em;
    margin: 0;

    @media screen and (max-width: ${mobileMaxWidth}px) {
        font-size: 0.75em;
    }
`;

export const GameResult = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${laurier_purple};
`;

export const ScoreText = styled.p`
    color: ${white};
    font-style: normal;
    font-weight: 800;
    font-size: 1.7em;
    line-height: 41px;
    text-align: center;

    @media screen and (max-width: ${mobileMaxWidth}px) {
        font-size: 0.85em;
    }
`;