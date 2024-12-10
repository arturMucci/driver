// "use client";
// import React, { useEffect, useRef } from "react";
// import { Loader } from "@googlemaps/js-api-loader";
// import MarkerClusterer from "@googlemaps/markerclustererplus";
// import { useEstimateForm } from "../hooks/useEstimate.context";

// export default function Map() {
//   const {
//     resData: {
//       routeResponse: { routes },
//     },
//   } = useEstimateForm();
//   const mapRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const initMap = async () => {
//       const loader = new Loader({
//         apiKey: process.env.GOOGLE_API_KEY as string,
//         version: "weekly",
//       });

//       const { Map } = await loader.importLibrary("maps");
//       const { Marker } = (await loader.importLibrary(
//         "marker"
//       )) as google.maps.MarkerLibrary;

//       const position = {
//         lat: -27.576569986217155,
//         lng: -48.527083902921895,
//       };

//       const mapOptions: google.maps.MapOptions = {
//         center: position,
//         zoom: 18,
//         styles: [],
//       };

//       const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

//       if (routes && routes.length > 0) {
//         const directionsRenderer = new google.maps.DirectionsRenderer();
//         // const directionsService = new google.maps.DirectionsService();

//         directionsRenderer.setMap(map);
//         directionsRenderer.setDirections({
//           routes: [routes[0]],
//           request: {
//             origin: routes[0].legs[0].start_location,
//             destination: routes[0].legs[0].end_location,
//             travelMode: google.maps.TravelMode.DRIVING,
//           },
//         });
//       }

//       new Marker({
//         position,
//         map,
//       });

//       new MarkerClusterer(map, [], {
//         imagePath:
//           "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
//         gridSize: 300, // Adjust as needed
//         minimumClusterSize: 30, // Minimum markers to cluster
//       });
//     };

//     initMap();
//   }, [routes]);

//   return <div className="w-full h-[20rem] mt-[1.5rem]" ref={mapRef} />;
// }
