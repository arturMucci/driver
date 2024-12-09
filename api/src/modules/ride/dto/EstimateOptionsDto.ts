export class EstimateOptionsDto {
  origin: LatitudeDto;
  destination: LatitudeDto;
  distance: number;
  duration: string;
  options: EstimateDriverDto[];
  routeResponse: any;
}

export class EstimateDriverDto {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: ReviewDto;
  value: number;
}

export interface ReviewDto {
  rating: number;
  comment: string;
}

export interface LatitudeDto {
  latitude: number;
  logitude: number;
}
