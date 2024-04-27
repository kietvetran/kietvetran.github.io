export type GeoPoint = {
    longitude: number;
    latitude: number;
};

export type Time = {
    expected: string;
    aimed: string;
    realtime: boolean;
    aimedArrivalTime: Date;
    expectedArrivalTime: Date;
};

export type Quay = {
    id: string;
    name: string;
    publicCode: string;
    geoPoint: GeoPoint;
};

export type Place = {
    id: string;
    name: string;
    label: string;
    locality: string;
    category: string[];
    geoPoint: GeoPoint;
};

export type JourneyStop = {
    id: string;
    key: string;
    name: string;
    publicCode: string;
    transportMode: string;
    transportSubmode: string;
    frontText: string;
    time: Time;
    timeList: Time[];
    quay: Quay;
    quayList: Quay[];
    nextQuayList: Quay[];
    source: any;
};

export type FavoriteStopPlace = {
    [k: string]: Place;
};

export type JourneyAtStopPlace = {
    journeyStopList: JourneyStop[];
};

export type InitialRegion = {
    latitudeDelta: number;
    longitudeDelta: number;
} & GeoPoint;

export type AutoComplete = {
    stopPlaceList: Place[];
};

export type JourneyTripStep = {
    expectedStartTime: string;
    expectedEndTime: string;
    mode: string;
    distance: number;
    quayList?: Quay[];
    lineId?: string;
    publicCode?: string;
    frontText?: string;
};

export type JourneyTripOption = {
    duration: number;
    walkDistance: number;
    durationText: string;
    startTravelText: string;
    journeyTripStepList: JourneyTripStep[];
};

export type JourneyTripRequest = {
    from?: string;
    fromGeoPoint?: GeoPoint;
    to?: string;
    toGeoPoint?: GeoPoint;
    date?: Date;
};

export type JourneyTripResult = {
    JourneyTripOption: JourneyTripOption[];
};

export type Travel = {
    fromPlace?: Place;
    toPlace?: Place;
    date?: Date;
    journeyTripRequest?: JourneyTripRequest;
};
