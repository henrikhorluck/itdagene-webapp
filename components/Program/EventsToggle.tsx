import React from 'react';
import styled from 'styled-components';
import { itdageneBlue } from '../../utils/colors';
import { SubHeader } from '../Styled';

interface EventsToggleProps {
  showPromoted: boolean;
  setShowPromoted: (value: boolean) => void;
}

const EventsToggle = ({
  showPromoted,
  setShowPromoted,
}: EventsToggleProps): JSX.Element => {
  return (
    <ToggleContainer>
      <ToggleItem
        active={!showPromoted}
        onClick={(): void => setShowPromoted(false)}
      >
        <SubHeader>Generelt program</SubHeader>
      </ToggleItem>
      <ToggleItem
        active={showPromoted}
        onClick={(): void => setShowPromoted(true)}
      >
        <SubHeader>Promotert program</SubHeader>
      </ToggleItem>
    </ToggleContainer>
  );
};

const ToggleContainer = styled.div`
  display: flex;
  max-width: 525px;
  margin: 10px 0;
  cursor: pointer;
`;

const ToggleItem = styled.div<{ active: boolean }>`
  --br: 7px;

  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
  flex: 1 1 500px;
  transition: 0.2s;
  user-select: none;
  border-radius: var(--br) 0 0 var(--br);

  color: ${(props): string => (props.active ? 'black' : 'white')};
  box-shadow: ${(props): string =>
    props.active ? 'inset 0 0 7px #00000077' : 'none'};
  background-color: ${(props): string =>
    props.active ? 'white' : itdageneBlue};

  &:nth-child(2n) {
    border-radius: 0 var(--br) var(--br) 0;
  }
`;

export default EventsToggle;
