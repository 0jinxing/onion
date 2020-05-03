import fs from "fs";
import path from "path";
import axios from "axios";
import { BlockingFilter, WhitelistFilter } from "@/lib/adblockplus";
import fetchGFWList from "@/utils/fetch-gfwlist";
import queryFilter from "@/utils/query-filter";

const gfwUrl = "/gfwlist.txt";

describe("gfwlist", () => {
  let mock: jest.SpyInstance;
  beforeEach(() => {
    mock = jest.spyOn(axios, "get");
    const data = fs.readFileSync(path.resolve("__tests__/__mocks__/assets/gfwlist.txt")).toString();
    mock.mockResolvedValue({ data });
  });
  afterEach(() => {
    mock.mockRestore();
  });

  let gfwList: string[];
  it("get gfwlist", async () => {
    gfwList = await fetchGFWList(gfwUrl);
    expect(gfwList).toBeInstanceOf(Array);
  });

  it("query filter", () => {
    const googleFilter = queryFilter("https://www.google.com", gfwList);
    expect(googleFilter).toBeInstanceOf(BlockingFilter);
    const baiduFilter = queryFilter("https://baidu.com", gfwList);
    baiduFilter && expect(baiduFilter).toBeInstanceOf(WhitelistFilter);
  });
});
