import { MultipleObject } from "../domain/Types";

const Constant: MultipleObject = {
  myLocation: "my-location",
  noneFavoritePlaces: "none-favorite-places",
  osloGeoPoint: {
    latitude: 59.911491,
    longitude: 10.7522,
  },
  lillestromGeoPoint: {
    latitude: 59.956,
    longitude: 11.0504,
  },
  bjorvikaGeoPoint: {
    latitude: 59.907875,
    longitude: 10.755851,
  },
  graphqlConfig: {
    method: "POST",
    headers: {
      "Content-Type": "application/graphql",
    },
  },
  bjorvikaNSRstopPlace: "NSR:StopPlace:58367",
  skjettenNSRstopPlace: "NSR:StopPlace:5512",
  enturAPIurl: "https://api.entur.io/geocoder/v1/reverse",
  enturAPIgeocoder: "https://api.entur.io/geocoder/v1/reverse",
  enturAPIstop: "https://api.entur.io/stop-places/v1/read",
  enturAPIgraphl: "https://api.entur.io/journey-planner/v3/graphql",
  enturAPIsearchStopPlace: "https://api.entur.io/geocoder/v1/autocomplete",
  tabMenuStopPlaces: "tab-menu-stop-places",
  tabMenuFindJourney: "tab-menu-find-journey",
  mapConfig: {
    zoomEnabled: true,
    scrollEnabled: true,
    showsScale: true,
    zoomControlEnabled: false,
    zoomTapEnabled: true,
    minZoomLevel: 16,
    maxZoomLevel: 20,
    rotateEnabled: true,
    loadingEnabled: true,
    showsCompass: false,
    showsUserLocation: true,
    followsUserLocation: true,
    // userInterfaceStyle: 'dark',
    // loadingBackgroundColor: 'black',
    // mapType: 'standard', // 'Standar', 'satellite', 'Silver', 'Retro', 'Dark', 'Night', 'Aubergine'
    /*
        customMapStyle: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [
                    {
                        visibility: "off",
                    },
                ],
            }
        ],
        // */
    /*
        customMapStyle: [
            {
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#242f3e',
                    },
                ],
            },
            {
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#746855',
                    },
                ],
            },
            {
                elementType: 'labels.text.stroke',
                stylers: [
                    {
                        color: '#242f3e',
                    },
                ],
            },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#d59563',
                    },
                ],
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#d59563',
                    },
                ],
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#263c3f',
                    },
                ],
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#6b9a76',
                    },
                ],
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#38414e',
                    },
                ],
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [
                    {
                        color: '#212a37',
                    },
                ],
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#9ca5b3',
                    },
                ],
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#746855',
                    },
                ],
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [
                    {
                        color: '#1f2835',
                    },
                ],
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#f3d19c',
                    },
                ],
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#2f3948',
                    },
                ],
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#d59563',
                    },
                ],
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#17263c',
                    },
                ],
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#515c6d',
                    },
                ],
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [
                    {
                        color: '#17263c',
                    },
                ],
            },
        ]
        /*
        customMapStyle: [
            {
                'featureType': 'poi.business',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ],
            }, {
                'featureType': 'poi.business',
                'elementType': 'labels.text.stroke',
                'stylers': [
                    {
                    'visibility': 'off'
                    }
                ],
            }
        ]
        */
  },
};

export default Constant;
