/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { useEffect } from 'react';
import TableWrapper from 'components/TableStyle';
import predicitonsState, { showPredictionCard } from 'state/predicitonsState';
import citiesState, { getCity } from 'state/citiesState';
import axios from 'axios';
import { apiUrl } from 'utils/apiUrl';
import equipmentsState from 'state/equipmentsState';
// @ts-ignore
import utmObj from 'utm-latlng';

const utm = new utmObj();

type FetchResponse = {
  [k: string]: {
    equipamentos: {
      [k: string]: string;
    };
    tempo: string;
  };
}

const PredictionList = () => {
  const [listData, setData] = predicitonsState.useStore('predicitons');
  const [equipments] = equipmentsState.useStore('equipments');
  const [selectedCityId] = citiesState.useStore('selected');
  const selectedCity = getCity(selectedCityId);

  useEffect(() => {
    if (selectedCity === 'all' || !selectedCity) return;

    axios
    .get<FetchResponse>(
      `${apiUrl}prever_risco/${selectedCity.sigla}`,
      )
      .then(({ data }) => {
        if (data) {
          const predictions: predicitonsState['predicitons'] = [];
          let id = 0;

          Object.keys(data).forEach(day => {
            Object.keys(data[day].equipamentos).forEach(equipment => {
              const relEquipment = equipments && equipments.find(item => item.codigo === equipment);
              const lngLat = relEquipment ? utm.convertUtmToLatLng(item.ox, item.oy, 23, 'K') : undefined;

              if (data[day].equipamentos[equipment] !== 'BAIXO') {
                predictions.push({
                  codigo: `prediction-${id}`,
                  data: day,
                  equipment,
                  risco: data[day].equipamentos[equipment],
                  lngLat: [lngLat.lng, lngLat.lat],
                  clima: data[day].tempo,
                });
              }

              id++;
            });
          });

          setData(predictions);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [selectedCityId, equipments]);

  return (
    <TableWrapper>
      <thead>
        <tr>
          <th>Equipamento</th>
          <th>Risco</th>
          <th>Data da Previsão</th>
          <th>Clima</th>
        </tr>
      </thead>
      <tbody>
        {listData === null
          ? 'carregando equipamentos...'
          : listData.map((item, i) => (
              <tr key={i} onClick={() => showPredictionCard(i)}>
                <td>{item.equipment}</td>
                <td>{item.risco}</td>
                <td>{item.data}</td>
                <td>{item.clima}</td>
              </tr>
            ))}
      </tbody>
    </TableWrapper>
  );
};

export default PredictionList;
