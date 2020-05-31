import base64Decode from "@/utils/base64-decode";

describe("base64", () => {
  it("should return the decoding base64 data", () => {
    const base64str: string = "SGVsbG8gd29ybGQh";
    expect(base64Decode(base64str)).toBe("Hello world!");
  });

  it("should throw an assertion error when base64 data invalid", () => {
    const invalidData = "dsadsado2918e0./sd09-2=`1wkdsl";
    expect(() => base64Decode(invalidData)).toThrow();
  });
});
