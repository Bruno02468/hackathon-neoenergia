import { createStore } from 'hookstated';

type predicitonsState = {
  predicitons: {
    lngLat: [number, number];
    type: 'priority' | 'warn';
  }[];
};

const predicitonsState = createStore<predicitonsState>('predictions', {
  state: {
    predicitons: [],
  },
});

setTimeout(() => {
  predicitonsState.setKey('predicitons', [
    {
      lngLat: [-48.020731, -22.470567],
      type: 'warn',
    },
    {
      lngLat: [-47.901815, -22.703772],
      type: 'priority',
    },
  ]);
}, 1000);

export default predicitonsState;
