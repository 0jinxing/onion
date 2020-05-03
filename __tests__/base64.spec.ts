import base64Decode from "@/utils/base64-decode";

describe("base64", () => {
  test("正确的 base64 数据解码", () => {
    const base64str: string = "SGVsbG8gd29ybGQh";
    expect(base64Decode(base64str)).toBe("Hello world!");
  });
  test("错误的 base64 数据解码", () => {
    const invalidData = "dsadsado2918e0./sd09-2=`1wkdsl";
    expect(() => base64Decode(invalidData)).toThrow();
  });
});
