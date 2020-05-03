import createPac, { transformProxy } from "@/utils/create-pac";

describe("pac", () => {
  test("transform proxy", () => {
    expect(transformProxy("http://baidu.com").toLowerCase()).toEqual("proxy baidu.com;");

    expect(transformProxy("https://baidu.com").toLowerCase()).toEqual("https baidu.com;");

    expect(transformProxy("socks://baidu.com").toLowerCase()).toEqual("socks baidu.com;");

    expect(transformProxy("socks5://baidu.com").toLowerCase()).toEqual("socks5 baidu.com;");
  });
  test("create pac", () => {
    const template = createPac("http://baidu.com", [], []);
    expect(template).toMatch(/proxy baidu.com/gi);
  });
});
