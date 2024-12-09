export class GmapsApiOutputDto {
  data: {
    routes: [
      {
        legs: [
          {
            distanceMeters: number;
            duration: string;
            staticDuration: string;
            polyline: {
              encodedPolyline: string;
            };
            startLocation: {
              latLng: {
                latitude: number;
                longitude: number;
              };
            };
            endLocation: {
              latLng: {
                latitude: number;
                longitude: number;
              };
            };
            steps: [
              {
                distanceMeters: number;
                staticDuration: string;
                polyline: {
                  encodedPolyline: string;
                };
                startLocation: {
                  latLng: {
                    latitude: number;
                    longitude: number;
                  };
                };
                endLocation: {
                  latLng: {
                    latitude: number;
                    longitude: number;
                  };
                };
                navigationInstruction: {
                  maneuver: string;
                  instructions: string;
                };
                localizedValues: {
                  distance: {
                    text: string;
                  };
                  staticDuration: {
                    text: string;
                  };
                };
                travelMode: string;
              },
            ];
            localizedValues: {
              distance: {
                text: string;
              };
              duration: {
                text: string;
              };
              staticDuration: {
                text: string;
              };
            };
          },
        ];
        distanceMeters: number;
        duration: string;
        staticDuration: string;
        polyline: {
          encodedPolyline: string;
        };
        description: string;
        viewport: {
          low: {
            latitude: number;
            longitude: number;
          };
          high: {
            latitude: number;
            longitude: number;
          };
        };
        travelAdvisory: object;
        localizedValues: {
          distance: {
            text: string;
          };
          duration: {
            text: string;
          };
          staticDuration: {
            text: string;
          };
        };
        routeLabels: string[];
      },
    ];
  };
}
