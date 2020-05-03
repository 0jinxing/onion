import base64Decode from "@/utils/base64-decode";

const base64str: string = "SGVsbG8gd29ybGQh";

test("@/utils/base64-decode", () => {
  expect(base64Decode(base64str)).toBe("Hello world!");
});
