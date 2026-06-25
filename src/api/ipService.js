const API_KEY = import.meta.env.VITE_IPIFY_API_KEY;
const BASE_URL = "https://geo.ipify.org/api/v2/country,city";

/**
 * Fetches geolocation information for a given IP address or domain.
 * If no IP is provided, the API naturally defaults to the user's current IP.
 * @param {string} ipAddress
 * @returns {Promise<{coordinates: [number, number], ip: string, location: string, timezone: string, isp: string}>}
 */
export const getIpData = async (ipAddress = "") => {
  try {
    const response = await fetch(
      `${BASE_URL}?apiKey=${API_KEY}&ipAddress=${ipAddress}`,
    );

    if (!response.ok) {
      throw new Error("Could not fetch location data for this IP.");
    }

    const data = await response.json();

    return {
      coordinates: [data.location.lat, data.location.lng],
      ip: data.ip,
      location: `${data.location.city}, ${data.location.region} ${data.location.postalCode}`,
      timezone: `UTC ${data.location.timezone}`,
      isp: data.isp,
    };
  } catch (error) {
    // Log tracking or throw custom user-friendly messages
    console.error("API Service Error:", error);
    throw error;
  }
};
