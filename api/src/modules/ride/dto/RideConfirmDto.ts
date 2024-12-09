export class RideConfirmDataDto {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: ConfirmDriverDto;
  value: number;
}

export class ConfirmDriverDto {
  id: number;
  name: string;
}
