/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { useEffect } from 'react';
import TableWrapper from 'components/TableStyle';
import equipmentsState, { showEquipmentCard } from 'state/equipmentsState';
import citiesState, { getCity } from 'state/citiesState';
import axios from 'axios';
import { apiUrl } from 'utils/apiUrl';

const EquipmentsList = () => {
  const [data, setData] = equipmentsState.useStore('equipments');
  const [selectedCityId] = citiesState.useStore('selected');
  const selectedCity = getCity(selectedCityId);

  useEffect(() => {
    if (selectedCity === 'all' || !selectedCity) return;

    axios
      .get<equipmentsState['equipments']>(
        `${apiUrl}equipamentos/${selectedCity.sigla}`,
      )
      .then(response => {
        if (response.data) {
          setData(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [selectedCityId]);

  return (
    <TableWrapper>
      <thead>
        <tr>
          <th>Código</th>
          <th>Tipo</th>
          <th>Fase</th>
          <th>Clientes</th>
        </tr>
      </thead>
      <tbody>
        {data === null
          ? 'carregando equipamentos...'
          : data.map(item => (
              <tr key={item.codigo} onClick={() => showEquipmentCard(item.sigla)}>
                <td>{item.codigo}</td>
                <td>{item.tipo}</td>
                <td>{item.fase}</td>
                <td>{item.clientes}</td>
              </tr>
            ))}
      </tbody>
    </TableWrapper>
  );
};

export default EquipmentsList;
