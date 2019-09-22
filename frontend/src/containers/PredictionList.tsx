import React from 'react';
import TableWrapper from 'components/TableStyle';

const fakeData = [
  {
    equipment: 'PET03257',
    region: 'Leste',
    causes: 'ACIDENTAL / REDE PRIMÁRIA / OUTRAS CAUSAS',
    risk: 'alto',
    predictionDate: '24/09/19',
  },
];

const repeatedFakeData = [
  ...fakeData,
  ...fakeData,
  ...fakeData,
  ...fakeData,
  ...fakeData,
  ...fakeData,
  ...fakeData,
  ...fakeData,
  ...fakeData,
  ...fakeData,
  ...fakeData,
  ...fakeData,
  ...fakeData,
  ...fakeData,
  ...fakeData,
];

const predictionList = () => {
  return (
    <TableWrapper>
      <thead>
        <tr>
          <th>Equipamento</th>
          <th>Região</th>
          <th>Causas</th>
          <th>Risco</th>
          <th>Data da Previsão</th>
        </tr>
      </thead>
      <tbody>
        {repeatedFakeData.map((item, i) => (
          <tr key={i}>
            <td>{item.equipment}</td>
            <td>{item.region}</td>
            <td>{item.causes}</td>
            <td>{item.risk}</td>
            <td>{item.predictionDate}</td>
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  );
};

export default predictionList;
