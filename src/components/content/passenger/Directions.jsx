import React, { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { getSeasonTicketFee } from "../../../api/seasonTicketAPI";

const Directions = ({ origin, destination, start, end, setFee }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [map, routesLibrary]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    directionsService
      .route({
        origin: `${origin} railway station`,
        destination: `${destination} railway station`,
        travelMode: "TRANSIT",
      })
      .then((res) => {
        directionsRenderer.setDirections(res);

        if (origin && destination && start && end) {
          const obj = {
            distance: 12,
            start,
            end,
          };

          getSeasonTicketFee(obj)
            .then((res) => {
              setFee(res.data);
              // setLoading(false);
              // navigate("/booking-history");
            })
            .catch((err) => {
              // setLoading(false);
            });
        }
      })
      .catch((err) => console.log({ err }));
  }, [
    directionsService,
    directionsRenderer,
    origin,
    destination,
    start,
    end,
    setFee,
  ]);

  return <div>Directions</div>;
};

export default Directions;
