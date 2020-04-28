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
const mobileMaxWidth = 700;
const smallMobileWidth = 400;

export const PlayerProfile = (props) => {
    const isTabletOrMobile = useMediaQuery({ query: `(max-width: ${mobileMaxWidth}px)` })
    const playerId = props.location.playerId
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
                            <PlayerImage src={imageUrl} />
                            <PlayerInfo>
                                <PlayerName>{(`${firstName} ${lastName}`).toUpperCase()}</PlayerName>
                                {renderAttribute(attributes.HEIGHT, convertHeight(height))}
                                {renderAttribute(attributes.WEIGHT, weight)}
                                {renderAttribute(attributes.BIRTH_DATE, birthDate)}
                                {renderAttribute(attributes.ELIGIBLE, eligible)}
                                {renderAttribute(attributes.POSITION, position)}
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
    width: 100%;
    max-width: 100%;
    height: 30em;
    border: 4px solid ${laurier_purple};
    background-color: ${laurier_purple};
`;

const PlayerImage = styled.img`
    flex: 3;
    height: 23.5em;
    max-width: 15em;
    margin-top: 1em;
    margin-left: 0.7em;

    @media screen and (max-width: ${mobileMaxWidth}px) {
        margin-top: 0.8em;
        margin-left: 1.5em;
        float: left;
        max-height: 14em;
        width: 6em;
    }
`;

const PlayerInfo = styled.div`
    flex: 3;
    margin-top: 0.5em;
    padding-left: 2em;
    background-color: ${laurier_purple};
    overflow-y: auto;
    overflow-x: wrap;
    overflow-wrap: break-word;

    @media screen and (max-width: ${mobileMaxWidth}px) {
        padding-left: 1.5em;
        margin-right: 0.5em;
    }
`;

const PlayerName = styled.p`
    font-family: Open Sans;
    font-weight: 800;
    font-size: 3em;
    line-height: 1.2em;
    color: ${white};

    @media screen and (max-width: ${mobileMaxWidth}px) {
        font-size: 2em;
    }

    @media screen and (max-width: ${smallMobileWidth}px) {
        font-size: 1.5em;
    }
`;

const PlayerInfoAttrGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    @media screen and (max-width: ${smallMobileWidth}px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const PlayerInfoAttrName = styled.p`
    font-family: Open Sans;
    font-weight: 800;
    font-size: 1em;
    line-height: 1em;
    color: ${white};
    margin-right: 0.5em;

    @media screen and (max-width: ${mobileMaxWidth}px) {
        font-size: 0.75em;
    }
`;

const PlayerInfoAttrValue = styled(PlayerInfoAttrName)`
    font-weight: 400;
`;

const PlayerPositionBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 2;
    margin-top: 1em;
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


    @media screen and (max-width: ${mobileMaxWidth}px) {
        font-size: 4em;
    }
`;

const PlayerPositionSmaller = styled(PlayerPosition)`
    font-size: 3em;
`;
