import axios, { AxiosResponse } from "axios";
import base64Decode from "./base64-decode";

const fetchGFWList = async (gfwUrl: string) => {
  const res: AxiosResponse<string> = await axios.get(gfwUrl);
  const base64StrArr = res.data.split("\n");

  const isBase64 = base64StrArr
    .filter(str => str)
    .every(str => /[A-Za-z0-9+/]={0,3}$/.test(str) && str.length % 4 === 0);

  if (!isBase64) {
    throw new Error("invalid base64 character");
  }

  const gfwText = res.data
    .split("\n")
    .map(b => base64Decode(b))
    .join("");

  return gfwText.split("\n").filter(item => {
    return !(item.startsWith("!") || item.startsWith("[")) && item;
  });
};

export default fetchGFWList;
