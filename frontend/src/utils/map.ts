import mapboxgl, { GeoJSONSource } from 'mapbox-gl';
import hotkeys from 'hotkeys-js';
import equipmentsState from 'state/equipmentsState';

type GetSourceReturn = GeoJSONSource | undefined;

type Marker = {
  type: 'priority' | 'warn' | 'equipment';
  lng: number;
  lat: number;
};

let map: null | mapboxgl.Map = null;

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
  });

  if (__DEV__) {
    devTools();
  }
}

function addLayer() {
  if (!map) return;

  map.addSource('predictions-data', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [],
    },
  });

  map.addLayer({
    id: 'marker',
    type: 'symbol',
    source: 'predictions-data',
    layout: {
      'icon-anchor': 'bottom',
      'icon-size': ['interpolate', ['linear'], ['zoom'], 15, 0.4, 18.05, 1],
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
      'icon-image': ['concat', 'marker-', ['get', 'type']],
    },
  });

  map.addSource('equipments-data', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [],
    },
  });

  map.addLayer({
    id: 'marker',
    type: 'symbol',
    source: 'equipments-data',
    layout: {
      'icon-anchor': 'bottom',
      'icon-size': ['interpolate', ['linear'], ['zoom'], 15, 0.4, 18.05, 1],
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
      'icon-image': 'equipment',
    },
  });
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

export function updateData(id: string, data: Marker[]) {
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
          coordinates: [item.lng, item.lat],
        },
      })),
    });
  }
}

function initializeSubscribers() {
  equipmentsState.subscribe(
    (prev: equipmentsState, current: equipmentsState) => {

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
