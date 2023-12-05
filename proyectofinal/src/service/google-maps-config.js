import { Loader } from "@googlemaps/js-api-loader";

export const apiKey = "AIzaSyAGcgSzgGei-CeNRZbI_p8sG_xJSgs5_R0";
const loader = new Loader({
  apiKey: apiKey,
  version: "3.46",
  libraries: ["geometry", "places"],
});

export default loader;