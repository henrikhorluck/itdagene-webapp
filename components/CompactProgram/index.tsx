import React from 'react';
import Flex, { FlexItem } from 'styled-flex-component';
import { CenterIt } from '../Styled';
import styled from 'styled-components';
import Link from 'next/link';
import {
  itdageneLightBlue,
  itdageneGreen,
  itdageneRed,
  itdageneYellow,
} from '../../utils/colors';

const Title = styled('h1')`
  @media only screen and (max-width: 767px) {
    font-size: 1.5em;
  }
`;

const Tile = styled.div`
  background: ${(props: { color: string }): string => props.color};
  width: 25%;
  height: 100px;
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  :hover {
    transition: 0.2s;
    transform: scale(1.2);
  }

  @media only screen and (max-width: 767px) {
    width: 50%;
    transition: none;
  }
`;

const StyledLink = styled.a`
  color: white;
  font-size: 1.5em;
  line-height: 4;
  cursor: pointer;

  :hover {
    color: white;
  }
`;

const ReadMore = styled('h4')`
  margin-top: 40px;
`;

const CompactProgram = (): JSX.Element => (
  <Flex justifyAround column>
    <FlexItem>
      <Title>Hva skjer under itDAGENE?</Title>
    </FlexItem>
    <Flex row wrap>
      <Tile color={itdageneGreen}>
        <Link href="/jobb">
          <CenterIt text>
            <StyledLink>Sommerjobb</StyledLink>
          </CenterIt>
        </Link>
      </Tile>
      <Tile color={itdageneRed}>
        <Link href="/program">
          <CenterIt text>
            <StyledLink>Kurs</StyledLink>
          </CenterIt>
        </Link>
      </Tile>
      <Tile color={itdageneLightBlue}>
        <Link href="/info/stands">
          <CenterIt text>
            <StyledLink>Stands</StyledLink>
          </CenterIt>
        </Link>
      </Tile>
      <Tile color={itdageneYellow}>
        <Link href="/info/digital-bankett">
          <CenterIt text>
            <StyledLink>Bankett</StyledLink>
          </CenterIt>
        </Link>
      </Tile>
    </Flex>

    <CenterIt text>
      <Link href="/program">
        <a>
          <ReadMore>Les mer</ReadMore>
        </a>
      </Link>
    </CenterIt>
  </Flex>
);
export default CompactProgram;
