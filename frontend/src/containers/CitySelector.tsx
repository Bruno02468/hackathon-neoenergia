import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import appState from 'state/appState';
import { centerContent } from 'style/modifiers';
import { colorPrimary, colorBg } from 'style/theme';
import Icon from 'components/Icon';
import { useOnClickOutside } from '@lucasols/utils';
import citiesState from 'state/citiesState';

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

const CitySelector = () => {
  const [activeSection] = appState.useStore('activeSection');
  const [activeView] = appState.useStore('activeView');
  const [cities] = citiesState.useStore('cities');
  const [selectedCityId, setSelectedCityId] = citiesState.useStore('selected');
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useOnClickOutside(selectRef, () => {
    setIsOpen(false);
  });

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCityId(event.target.value);
  }

  return (
    <Container
      style={{ background: activeView === 'map' ? '#fff' : undefined }}
    >
      <label htmlFor="city-select">
        {cities === null ? 'Carregando cidades...' : title[activeSection]}
      </label>
      {cities !== null && (
        <>
          <Select
            ref={selectRef}
            id="city-select"
            style={{ background: activeView === 'map' ? colorBg : undefined }}
            onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
            onChange={onChange}
            value={selectedCityId}
          >
            {cities === null && <option value="all">...</option>}
            {cities.map((item, i) => (
              <option
                value={item.sigla}
                key={i}
              >
                {item.nome}
              </option>
            ))}
          </Select>
          <Arrow
            name="arrow-down"
            size={20}
            css={{ transform: isOpen ? 'rotate(180deg)' : undefined }}
          />
        </>
      )}
    </Container>
  );
};

export default CitySelector;
