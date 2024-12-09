export class GmapsApiPayloadDto {
  origin: {
    address: string;
  };
  destination: {
    address: string;
  };
  intermediates: { address: string }[];
  travelMode: string;
}

export class GmapsHeaderDto {
  headers: {
    'Content-Type': string;
    'X-Goog-Api-Key': string;
    'X-Goog-FieldMask': string;
  };
}
