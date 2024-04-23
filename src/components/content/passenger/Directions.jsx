import { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { getSeasonTicketFee } from "../../../api/seasonTicketAPI";

const Directions = ({ origin, destination, start, end, setFee, km, setKm }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  // const [routes, setRoutes] = useState([]);
  const [leg, setLeg] = useState(null);
  // const selected = routes[0];
  // const leg = selected?.legs[0];

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
        console.log({ res });
        directionsRenderer.setDirections(res);
        // setRoutes(res.routes);
        setLeg(res.routes?.[0]?.legs?.[0]);

        if (origin && destination && start && end) {
          const obj = {
            distance: km,
            start,
            end,
          };

          getSeasonTicketFee(obj)
            .then((res) => {
              setFee(Math.round(res.data).toFixed(2));
            })
            .catch((err) => {
              console.log(err);
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
    km,
  ]);

  useEffect(() => {
    setKm(leg?.distance?.text?.replace(" km", ""));
  }, [leg?.distance?.text, setKm]);

  // // if (!leg) return null;

  // console.log({ leg });

  return <div></div>;
};

export default Directions;
