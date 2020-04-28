import React from 'react';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';
import styled from 'styled-components'
import { laurier_purple, white, black } from './colours';

const GET_PLAYERS = gql`
    query GetPlayers {
        allPlayers {
        nodes {
            eligible,
            firstName
            lastName
            position
            profileImageId
            mediaByProfileImageId {
            imageUrl
            }
            playerId
        }
        }
    }
    
`;

export const Roster = (props) => (
    <>
        <div style={{ marginTop: '2em' }} />
        <RosterFlex>
        <Query
            query={GET_PLAYERS}
        >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) {
                    console.log(error);
                    return <p>Error</p>
                };

                return data.allPlayers.nodes.map(({
                    firstName,
                    lastName,
                    position,
                    playerId,
                    eligible,
                    mediaByProfileImageId,
                }) => {
                    const { imageUrl } = mediaByProfileImageId;
                   
                    return (
                        <RosterFlex>
                        <RosterCard key={playerId} onClick={() => {
                                props.history.push({
                                    pathname: '/player-profile',
                                    playerId,
                            })
                        }}>
                            <RosterImage src={imageUrl} />
                            <PlayerName>
                                <PlayerNameText>{(`${firstName} ${lastName}`).toUpperCase()}</PlayerNameText>
                            </PlayerName>
                            <PlayerAttributes>
                                <AttributeText>
                                    {`Position: ${position}`}
                                </AttributeText>
                                <AttributeText>
                                    {`Eligibility Year: ${eligible}`}
                                </AttributeText>
                            </PlayerAttributes>
                        </RosterCard>
                        </RosterFlex>
                    );
                })
            }}
        </Query>
        </RosterFlex>
        <div style={{ marginBottom: '4em' }} />
    </>
)


const RosterFlex = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    align-items: flex-end;
`;
const RosterCard = styled.div`
    display: flex;
    flex-direction: column;

    height: 15em;
    margin: 0em 0.5em;
    margin-bottom: 10em;
`;

const RosterImage = styled.img`
    flex: 1;
    justify-content: center;
    min-width:100%

    width: 160;
    height: 230;
`;

const PlayerName = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin: 0.5em 0em 0em 0em;
`;

const PlayerNameText = styled.p`
    color: ${black};
    font-style: normal;

    display: flex;
    flex-direction: column;
    font-weight: bold;
    font-size: 1em;
    line-height: 1.2em;
    margin: 0em 0em 0.5em 0em;
`;

const PlayerAttributes = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    background-color: ${laurier_purple};
`;

const AttributeText = styled.p`
    color: ${white};
    font-style: normal;
    font-weight: 300;
    font-size: 1em;
    text-align: left;
    margin: 0em 0em 0.5em 0.5em;
`;
