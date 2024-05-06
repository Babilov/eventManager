import axios from "axios";

export const getAddress = async (lat: number, lot: number) => {
  const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lot}`;
  try {
    const res = await axios.get(nominatimUrl);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getCords = async (
  address: string,
): Promise<{
  lat: number | null;
  lon: number | null;
}> => {
  const geoData = await axios.get(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
  );
  if (geoData.data.length > 0) {
    const { lat, lon } = geoData.data[0];
    return { lat, lon };
  }
  alert("Укажите верный адрес");
  return { lat: null, lon: null };
};
