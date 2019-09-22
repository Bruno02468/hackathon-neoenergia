import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import appState from 'state/appState';
import { centerContent } from 'style/modifiers';
import { colorPrimary, colorBg } from 'style/theme';
import Icon from 'components/Icon';
import { useOnClickOutside } from '@lucasols/utils';

const Container = styled.div`
  ${centerContent};
  position: absolute;
  top: 20px;
  left: ${42 - 16}px;
  height: 42px;
  font-size: 16px;
  border-radius: 100px;
  padding: 4px;
  padding-left: 16px;
  background: ${colorBg};
  transition: 240ms;

  label {
    color: ${colorPrimary};
  }
`;

const Select = styled.select`
  border: 0;
  border-radius: 100px;
  margin-left: 12px;
  padding: 8px 12px;
  padding-right: 32px;
  cursor: pointer;
  transition: 240ms;

  appearance: none;

  option {
    cursor: pointer;
  }
`;

const Arrow = styled(Icon)`
  position: absolute;
  right: 10px;
  transition: 240ms;
  pointer-events: none;
`;

const title = {
  prediction: 'Previsão de ocorrências em ',
  equipments: 'Equipamentos em ',
  occurrences: 'Ocorrências em ',
};

const fakeData = ['Atibaia', 'test', 'São Paulo', 'Teste'];

const CitySelector = () => {
  const [activeSection] = appState.useStore('activeSection');
  const [activeView] = appState.useStore('activeView');
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useOnClickOutside(selectRef, () => {
    setIsOpen(false);
  });

  return (
    <Container
      style={{ background: activeView === 'map' ? '#fff' : undefined }}
    >
      <label htmlFor="city-select">{title[activeSection]}</label>
      <Select
        ref={selectRef}
        id="city-select"
        style={{ background: activeView === 'map' ? colorBg : undefined }}
        onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
      >
        <option value="all">todas as cidades</option>
        {fakeData.map(item => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </Select>
      <Arrow
        name="arrow-down"
        size={20}
        css={{ transform: isOpen ? 'rotate(180deg)' : undefined }}
      />
    </Container>
  );
};

export default CitySelector;
