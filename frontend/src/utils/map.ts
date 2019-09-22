import mapboxgl, { GeoJSONSource } from 'mapbox-gl';
import hotkeys from 'hotkeys-js';
import equipmentsState from 'state/equipmentsState';
import { getIfKeyChange } from 'hookstated/dist/subscribeUtils';
import predicitonsState from 'state/predicitonsState';
import { subscribe } from 'hookstated/dist';

type GetSourceReturn = GeoJSONSource | undefined;

type Marker = {
  type: 'priority' | 'warn' | 'equipment';
  lngLat: [number, number];
};

type SourcesIds = 'predictions-data' | 'equipments-data';

let map: null | mapboxgl.Map = null;
export let mapIsInitialized = false;

export function initializeMap() {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibHVjYXNsb3MiLCJhIjoiY2pwNWcyczh3MHJ4MjNwcGpsYnFieGVuOSJ9.r0CJCwM-WIidrrXfkFXN6Q';

  map = new mapboxgl.Map({
    container: 'map-container',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-48.7596, -22.2005],
    zoom: 6.6,
  });

  map.on('load', () => {
    if (!map) return;
    // HACK:
    map.resize();

    addImage('marker-priority');
    addImage('marker-warn');
    addImage('marker-equipment');

    addLayer();

    mapIsInitialized = true;

    getLayersData();
  });

  // window.map = map;

  if (__DEV__) {
    devTools();
  }
}

function addLayer() {
  if (!map) return;

  const predictionsSourceId: SourcesIds = 'predictions-data';
  const equipmentsSourceId: SourcesIds = 'equipments-data';

  map.addSource(predictionsSourceId, {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [],
    },
  });

  map.addLayer({
    id: 'predictions',
    type: 'symbol',
    source: predictionsSourceId,
    layout: {
      'icon-anchor': 'bottom',
      'icon-size': ['interpolate', ['linear'], ['zoom'], 15, 0.4, 18.05, 1],
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
      'icon-image': ['concat', 'marker-', ['get', 'type']],
    },
  });

  map.addSource(equipmentsSourceId, {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [],
    },
  });

  map.addLayer({
    id: 'equipments',
    type: 'symbol',
    source: equipmentsSourceId,
    layout: {
      'icon-anchor': 'bottom',
      'icon-size': ['interpolate', ['linear'], ['zoom'], 15, 0.4, 18.05, 1],
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
      'icon-image': 'equipment',
    },
  });
}

function getLayersData() {
  updateData('predictions-data', predicitonsState.getState().predicitons);
  updateData('predictions-data', predicitonsState.getState().predicitons);
}

function addImage(name: string, callBack?: (id: string) => void, id = name) {
  if (!map) return;

  if (!map.hasImage(id)) {
    map.loadImage(
      `static/${name}.png`,
      (error: string, image: HTMLImageElement) => {
        if (!map) return;

        if (__DEV__) {
          if (error) throw new Error(error);
        }

        map.addImage(id, image);
        if (callBack) callBack(id);
      },
    );
  } else if (callBack) callBack(id);
}

export function updateData(id: SourcesIds, data: Marker[]) {
  if (!map) return;

  const source = map.getSource(id) as GetSourceReturn;

  if (source) {
    source.setData({
      type: 'FeatureCollection',
      features: data.map(item => ({
        type: 'Feature',
        properties: { type: item.type },
        geometry: {
          type: 'Point',
          coordinates: [item.lat, item.long],
        },
      })),
    });
  } else {
    console.error('source not exist');
  }
}

function initializeSubscribers() {
  // equipmentsState.subscribe(
  //   (prev: equipmentsState, current: equipmentsState) => {
  //     const ifKeyChange = getIfKeyChange(prev, current);

  //     ifKeyChange('equipments', () => {
  //       updateData('equipments-data', current.equipments);
  //     });
  //   },
  // );

  subscribe('predictions',
    (prev: predicitonsState, current: predicitonsState) => {
      const ifKeyChange = getIfKeyChange(prev, current);

      const key: keyof predicitonsState = 'predicitons';

      ifKeyChange(key, () => {
        updateData('predictions-data', current.predicitons);
      });
    },
  );
}

function devTools() {
  hotkeys('ctrl+m', () => {
    if (!map) return;
    console.log(`
      zoom: ${map.getZoom()}\n
      pitch: ${map.getPitch()}\n
      bearing: ${map.getBearing()}\n
      center: [${map.getCenter().lng.toFixed(6)}, ${map
  .getCenter()
  .lat.toFixed(6)}]\n
      `);
  });

  hotkeys('ctrl+a', () => {
    if (!map) return;

    // eslint-disable-next-line no-alert
    alert(`
      zoom: ${map.getZoom()}\n
      pitch: ${map.getPitch()}\n
      bearing: ${map.getBearing()}\n
      center: [${map.getCenter().lng.toFixed(6)}, ${map
  .getCenter()
  .lat.toFixed(6)}]\n
    `);
  });
}

export function destroy() {
  if (!map) return;

  if (__DEV__) {
    hotkeys.unbind('ctrl+m');
    hotkeys.unbind('ctrl+a');
    map.remove();
    map = null;
  }
}

updateData('equipments-data', [
  {

  }
])
