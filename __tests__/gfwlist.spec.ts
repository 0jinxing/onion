import fs from "fs";
import path from "path";
import axios from "axios";
import { BlockingFilter, WhitelistFilter } from "@/lib/adblockplus";
import fetchGFWList from "@/utils/fetch-gfwlist";
import queryFilter, { genMatcher } from "@/utils/query-filter";

const gfwUrl = "/gfwlist.txt";

describe("gfwlist", () => {
  it("fetch and resolve gfwlist data", async () => {
    const mock = jest.spyOn(axios, "get");
    const data = fs.readFileSync(path.resolve("__tests__/__mocks__/assets/gfwlist.txt")).toString();
    mock.mockResolvedValue({ data });
    const gfwList = await fetchGFWList(gfwUrl);
    expect(gfwList).toBeInstanceOf(Array);
    mock.mockRestore();
  });

  it("resolve invalid gfwlist data", async () => {
    const mock = jest.spyOn(axios, "get");
    mock.mockResolvedValue({ data: "invalid data ===" });
    let error;
    try {
      await fetchGFWList(gfwUrl);
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(Error);

    mock.mockRestore();
  });

  const gfwList = ["google.com", "@@baidu.com"];

  it("according to gfwlist generate matcher", () => {
    const matcher = genMatcher(gfwList);
    const { hostname, href } = new URL("https://www.google.com");
    expect(matcher.matchesAny(href, hostname)).toBeInstanceOf(BlockingFilter);
  });

  it("according to gfwlist search filter", () => {
    const googleFilter = queryFilter("https://www.google.com", gfwList);
    expect(googleFilter).toBeInstanceOf(BlockingFilter);

    const baiduFilter = queryFilter("https://baidu.com", gfwList);
    expect(baiduFilter).toBeInstanceOf(WhitelistFilter);
  });
});
