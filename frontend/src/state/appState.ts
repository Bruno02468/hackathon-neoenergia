import { createStore } from 'hookstated';

type appState = {
  activeSection: 'prediction' | 'equipments' | 'occurrences';
  activeCity: string;
  activeView: 'list' | 'map';
};

const appState = createStore<appState>('app', {
  state: {
    activeSection: 'prediction',
    activeCity: 'all',
    activeView: 'list',
  },
});

export default appState;
