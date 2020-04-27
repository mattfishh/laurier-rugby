import React from 'react';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';
import styled from 'styled-components'
import { laurier_purple, white } from './colours';
import { useMediaQuery } from 'react-responsive'

const GET_SCHEDULE = gql`
    query GetPlayer($playerId: Int!) {
        playerByPlayerId(playerId: $playerId) {
            firstName
            lastName
            height
            weight
            birthDate
            position
            eligible
            program
            hometown
            mediaByProfileImageId {
                imageUrl
            }
        }
    }  
`;

// enumeration
const attributes = {
    HEIGHT: 'Height',
    WEIGHT: 'Weight',
    BIRTH_DATE: 'Birth Date',
    POSITION: 'Position',
    ELIGIBLE: 'Eligible',
    PROGRAM: 'Program',
    HOMETOWN: 'Hometown'
}

// pixels
const mobileMaxWidth = 768;

export const PlayerProfile = ({ playerId = 19 }) => {
    const isTabletOrMobile = useMediaQuery({ query: `(max-width: ${mobileMaxWidth}px)` })

    return (
        <Query
        query={GET_SCHEDULE}
        variables={{ playerId }}
        >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) {
                    console.log(error);
                    return <p>Error</p>
                };

                const {
                    firstName,
                    lastName,
                    height,
                    weight,
                    birthDate,
                    position,
                    eligible,
                    program,
                    hometown,
                    mediaByProfileImageId
                } = data.playerByPlayerId;
                const { imageUrl } = mediaByProfileImageId;

                if (isTabletOrMobile) {
                    return (
                        <PlayerCard>
                            <MobilePlayerImageGroup>
                                <PlayerPositionBlock>
                                    {renderPosition(position)}
                                </PlayerPositionBlock>
                                <PlayerImage src={imageUrl} />
                            </MobilePlayerImageGroup>
                            <PlayerInfo>
                                <PlayerName>{(`${firstName} ${lastName}`).toUpperCase()}</PlayerName>
                                {renderAttribute(attributes.HEIGHT, convertHeight(height))}
                                {renderAttribute(attributes.WEIGHT, weight)}
                                {renderAttribute(attributes.BIRTH_DATE, birthDate)}
                                {renderAttribute(attributes.ELIGIBLE, eligible)}
                                {renderAttribute(attributes.PROGRAM, program)}
                                {renderAttribute(attributes.HOMETOWN, hometown)}
                            </PlayerInfo>
                        </PlayerCard>
                    );
                }

                return (
                    <PlayerCard>
                        <PlayerImage src={imageUrl} />
                        <PlayerInfo>
                            <PlayerName>{(`${firstName} ${lastName}`).toUpperCase()}</PlayerName>
                            {renderAttribute(attributes.HEIGHT, convertHeight(height))}
                            {renderAttribute(attributes.WEIGHT, weight)}
                            {renderAttribute(attributes.BIRTH_DATE, birthDate)}
                            {renderAttribute(attributes.ELIGIBLE, eligible)}
                            {renderAttribute(attributes.PROGRAM, program)}
                            {renderAttribute(attributes.HOMETOWN, hometown)}
                        </PlayerInfo>
                        <PlayerPositionBlock>
                            {renderPosition(position)}
                        </PlayerPositionBlock>
                    </PlayerCard>
                
                );
            }}
        </Query>
    );
};

const renderPosition = (position) => {
    if (position.length > 2) {
        return <PlayerPositionSmaller>{position}</PlayerPositionSmaller>
    }

    return <PlayerPosition>{position}</PlayerPosition>;
}

const renderAttribute = (name, value) => {
    if (value === null) {
        return;
    }

    return (
        <PlayerInfoAttrGroup>
            <PlayerInfoAttrName>{name}:</PlayerInfoAttrName>
            <PlayerInfoAttrValue>{value}</PlayerInfoAttrValue>
        </PlayerInfoAttrGroup>
    );
}

const convertHeight = (value) => {
    value = value.replace("-", "'");
    value += '"';
    return value;
}

const PlayerCard = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 5em;
    height: 30em;
    border: 4px solid ${laurier_purple};
    background-color: ${laurier_purple};
`;

const MobilePlayerImageGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const PlayerImage = styled.img`
    flex: 3;
    max-width: 20em;
`;

const PlayerInfo = styled.div`
    flex: 3;
    padding-left: 2em;
    padding-top: 1.5em;
    background-color: ${laurier_purple};
    overflow-y: auto;
`;

const PlayerName = styled.p`
    font-family: Open Sans;
    font-weight: 800;
    font-size: 3em;
    line-height: 1.2em;
    color: ${white}
`;

const PlayerInfoAttrGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const PlayerInfoAttrName = styled.p`
    font-family: Open Sans;
    font-weight: 800;
    font-size: 1em;
    line-height: 1em;
    color: ${white};
    margin-right: 0.5em;
`;

const PlayerInfoAttrValue = styled(PlayerInfoAttrName)`
    font-weight: 400;
`;

const PlayerPositionBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 2;
    margin-top: 0.8em;
    margin-left: 0.5em;
    margin-right: 0.8em;
    max-height: 10em;
    max-width: 10em;
    background-color: ${white};

    @media screen and (max-width: ${mobileMaxWidth}px) {
        max-width: 15em;
        margin-top: 0em;
        margin-left: 0em;
        margin-right: 0em;
    }
`;

const PlayerPosition = styled.p`
    font-family: Open Sans;
    margin-top: 0.1em;
    font-weight: 700;
    font-size: 7em;
    line-height: 1em;
    color: ${laurier_purple};
`;

const PlayerPositionSmaller = styled(PlayerPosition)`
    font-size: 3em;
`;