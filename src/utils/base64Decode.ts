const base64hash =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function decode(input: string) {
  const bin = Array.prototype.slice
    .call(input.replace(/[=]+$/g, ""))
    .map(char => base64hash.indexOf(char)) // 取 ascii 码
    .map(ind => ind.toString(2)) // 二进制串
    .map(hash => "000000".substr(0, 6 - hash.length) + hash) // 补齐 6 位
    .join("");

  return Array.from({ length: Math.floor(bin.length / 8) }) // 每 8 位，转成整数
    .map((_, ind) => ind)
    .map(ind => bin.substr(ind * 8, 8))
    .reduce((pre, cur) => pre + String.fromCodePoint(parseInt(cur, 2)), "");
}

export default decode;
