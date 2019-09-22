import { createStore } from 'hookstated';

type Views = 'list' | 'map';

type appState = {
  activeSection: 'prediction' | 'equipments' | 'occurrences';
  activeCity: string;
  activeView: Views;
  viewUsedBeforeShowCard: Views;
};

const appState = createStore<appState>('app', {
  state: {
    activeSection: 'prediction',
    activeCity: 'all',
    activeView: 'list',
    viewUsedBeforeShowCard: 'list',
  },
});

export default appState;
