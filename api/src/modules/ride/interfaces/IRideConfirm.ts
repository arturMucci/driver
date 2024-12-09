export interface IRideConfirmData {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: IDriver;
  value: number;
}

interface IDriver {
  id: number;
  name: string;
}
