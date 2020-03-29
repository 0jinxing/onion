import axios, { AxiosResponse } from "axios";
import base64Decode from "./base64Decode";

const fetchGFW = async (gfwUrl: string) => {
  const res: AxiosResponse<string> = await axios.get(gfwUrl);
  const gfwText = res.data
    .split("\n")
    .map(b => base64Decode(b))
    .join("");

  return gfwText.split("\n").filter(item => {
    return !(item.startsWith("!") || item.startsWith("[")) && item;
  });
};

export default fetchGFW;
