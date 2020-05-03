import fetchGFWList from "@/utils/fetch-gfwlist";

const gfwUrl = "https://repo.or.cz/gfwlist.git/blob_plain/HEAD:/gfwlist.txt";

jest.mock("axios");

test("@/utils/fetch-gfwlist", async () => {
  const list = await fetchGFWList(gfwUrl);
  expect(list).toHaveLength(1);
});
