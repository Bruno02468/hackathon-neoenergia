import { createStore } from 'hookstated';

type equipmentsState = {
  equipments: {

  }[];
};

const equipmentsState = createStore<equipmentsState>('equipments', {
  state: {
    equipments: [],
  },
});

export default equipmentsState;
