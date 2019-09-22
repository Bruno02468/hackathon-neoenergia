import React from 'react';
import appState from 'state/appState';
import PredictionCard from 'containers/PredictionCard';
import EquipmentCard from 'containers/EquipmentCard';
import predicitonsState from 'state/predicitonsState';
import equipmentsState from 'state/equipmentsState';

const DetailsCardContainer = () => {
  const [activeSection] = appState.useStore('activeSection');
  const [activeView] = appState.useStore('activeView');
  const [selectedPrediction] = predicitonsState.useStore('selected');
  const [selectedEquipment] = equipmentsState.useStore('selected');

  if (activeView !== 'map' || activeSection === 'occurrences') return null;

  if (activeSection === 'prediction' && selectedPrediction === null) return null;
  if (activeSection === 'equipments' && selectedEquipment === null) return null;

  return (
    <>
      {activeSection === 'prediction' && <PredictionCard />}
      {activeSection === 'equipments' && <EquipmentCard />}
    </>
  );
};

export default DetailsCardContainer;
