import exp from 'constants';
import e from 'express';

export enum EnumSpeed {
  'SPEED_UNSPECIFIED',
  'NORMAL',
  'SLOW',
  'TRAFFIC_JAM',
}

export interface ISpeedReadingInterval {
  startPolylinePointIndex: number;
  endPolylinePointIndex: number;
  speed: EnumSpeed;
}

export interface IRouteLegStepTravelAdvisory {
  speedReadingInterval: ISpeedReadingInterval[];
}

export interface ILocalizedText {
  text: string;
  languageCode: string;
}

export interface IRouteLegStepLocalizedValues {
  distance: ILocalizedText;
  staticDuration: ILocalizedText;
}

export enum EnumManeuver {
  'MANEUVER_UNSPECIFIED',
  'TURN_SLIGHT_LEFT',
  'TURN_SHARP_LEFT',
  'UTURN_LEFT',
  'TURN_LEFT',
  'TURN_SLIGHT_RIGHT',
  'TURN_SHARP_RIGHT',
  'UTURN_RIGHT',
  'TURN_RIGHT',
  'STRAIGHT',
  'RAMP_LEFT',
  'RAMP_RIGHT',
  'MERGE',
  'FORK_LEFT',
  'FORK_RIGHT',
  'FERRY',
  'FERRY_TRAIN',
  'ROUNDABOUT_LEFT',
  'ROUNDABOUT_RIGHT',
  'DEPART',
  'NAME_CHANGE',
}

export interface INavigationInstruction {
  maneuver: EnumManeuver;
  instructions: string;
}

export interface IRouteLegStepLocalizedValues {
  distance: ILocalizedText;
  staticDuration: ILocalizedText;
}

export interface ILocation {
  latLng: ILatLng;
  heading: number;
}

export interface ITransitStop {
  name: string;
  location: ILocation;
}

export interface ITransitStopDetails {
  arrivalStop: ITransitStop;
  arrivalTime: string;
  departureStop: ITransitStop;
  departureTime: string;
}

export interface ILocalizedTime {
  time: ILocalizedText;
  timeZone: string;
}

export interface ITransitDetailsLocalizedValues {
  arrivalTime: ILocalizedTime;
  departureTime: ILocalizedTime;
}

export interface ITransitAgency {
  name: string;
  phoneNumber: string;
  uri: string;
}

export enum EnumTransitVehicleType {
  'TRANSIT_VEHICLE_TYPE_UNSPECIFIED',
  'BUS',
  'CABLE_CAR',
  'COMMUTER_TRAIN',
  'FERRY',
  'FUNICULAR',
  'GONDOLA_LIFT',
  'HEAVY_RAIL',
  'HIGH_SPEED_TRAIN',
  'INTERCITY_BUS',
  'LONG_DISTANCE_TRAIN',
  'METRO_RAIL',
  'MONORAIL',
  'OTHER',
  'RAIL',
  'SHARE_TAXI',
  'SUBWAY',
  'TRAM',
  'TROLLEYBUS',
}

export interface ITransitVehicle {
  name: ILocalizedText;
  type: EnumTransitVehicleType;
}

export interface ITransitLine {
  agencies: ITransitAgency[];
  name: string;
  uri: string;
  color: string;
  iconUri: string;
  nameShort: string;
  textColor: string;
  vehicle: ITransitVehicle;
}

export interface IRouteLegStepTransitDetails {
  stopDetails: ITransitStopDetails;
  localizedValues: ITransitDetailsLocalizedValues;
  headSign: string;
  headway: string;
  transitLine: ITransitLine;
  stopCount: number;
  tripShortText: string;
}

export enum EnumTravelMode {
  'TRAVEL_MODE_UNSPECIFIED',
  'DRIVE',
  'BICYCLE',
  'WALK',
  'TWO_WHEELER',
  'TRANSIT',
}

export interface IRouteLegStep {
  distanceMeters: number;
  staticDuration: string;
  polyline: IPolyline;
  startLocation: ILatLng;
  endLocation: ILatLng;
  navigationInstruction: INavigationInstruction;
  travelAdvisory: IRouteLegStepTravelAdvisory;
  localizedValues: IRouteLegStepLocalizedValues;
  transitDetails: IRouteLegStepTransitDetails;
  travelMode: EnumTravelMode;
}

export interface ILatLng {
  latitude: number;
  longitude: number;
}

export interface ILocation {
  latLng: ILatLng;
  heading: number;
}

export interface IPolyline {
  encodedPolyline: string;
  geoJsonLinestring: object;
}

export interface IMoney {
  currencyCode: string;
  units: string;
  nanos: number;
}

export interface IEstimatePrice {
  estimatedPrice: IMoney;
}

export interface IRouteLegStepTravelAdvisory {
  tollInfo: IEstimatePrice;
  speedReadingIntervals: ISpeedReadingInterval[];
}

export interface IRouteLegLocalizedValues {
  distance: ILocalizedText;
  duration: ILocalizedText;
  staticDuration: ILocalizedText;
}

export interface IMultiModalSegment {
  navigationInstruction: INavigationInstruction;
  travelMode: EnumTravelMode;
  stepStartIndex: number;
  stepEndIndex: number;
}

export interface IStepsOverview {
  multiModalSegments: IMultiModalSegment[];
}

export interface IRouteLeg {
  distanceMeters: number;
  duration: string;
  staticDuration: string;
  polyline: IPolyline;
  startLocation: ILatLng;
  endLocation: ILatLng;
  steps: IRouteLegStep[];
  travelAdvisory: IRouteLegStepTravelAdvisory;
  localizedValues: IRouteLegLocalizedValues;
  stepsOverview: IStepsOverview;
}

export enum EnumRouteLabels {
  'ROUTE_LABEL_UNSPECIFIED',
  'DEFAULT_ROUTE',
  'DEFAULT_ROUTE_ALTERNATE',
  'FUEL_EFFICIENT',
  'SHORTER_DISTANCE',
}

export interface IViewport {
  low: ILatLng;
  high: ILatLng;
}

export interface IRouteTravelAdvisory {
  tollInfo: IEstimatePrice;
  speedReadingIntervals: ISpeedReadingInterval[];
  fuelConsumptionMicroLiters: string;
  routeRestrictionPartiallyIgnored: boolean;
  transitFare: IMoney;
}

export interface IRouteLocalizedValues {
  distance: ILocalizedText;
  duration: ILocalizedText;
  staticDuration: ILocalizedText;
  transitFare: ILocalizedText;
}

export enum EnumRoadFeatureState {
  'ROAD_FEATURE_STATE_UNSPECIFIED',
  'EXISTS',
  'DOES_NOT_EXIST',
}

export interface IPolylinePointIndex {
  startIndex: number;
  endIndex: number;
}

export interface IFlyoverInfo {
  flyoverPresence: EnumRoadFeatureState;
  polylinePointIndex: IPolylinePointIndex;
}

export interface INarrowRoadInfo {
  narrowRoadPresence: EnumRoadFeatureState;
  polylinePointIndex: IPolylinePointIndex;
}

export interface IPolylineDetails {
  flyoverInfo: IFlyoverInfo;
  narrowRoadInfo: INarrowRoadInfo;
}

export interface IRoute {
  routeLabels: EnumRouteLabels;
  legs: IRouteLeg[];
  distanceMeters: number;
  duration: string;
  staticDuration: string;
  polyline: IPolyline;
  description: string;
  warnings: string[];
  viewport: IViewport;
  travelAdvisory: IRouteTravelAdvisory;
  optimizedIntermediateWaypointIndex: number[];
  localizedValues: IRouteLocalizedValues;
  routeToken: string;
  polylineDetails: IPolylineDetails;
}

export class GmapsApiOutputDto {
  data: {
    routes: IRoute[];
  };
}
