import React from "react";
import { mount } from "enzyme";
import { Input } from "antd";
import GFWListSetting from "@/components/GFWListSetting";
import { GFWMode } from "@/actions/proxy";

describe("<GFWListSetting />", () => {
  const wrapper = mount(
    <GFWListSetting
      gfwMode={GFWMode.BLOCKING}
      gfwUrl="https://baidu.com"
      loading={false}
      updateGFWMode={(_: GFWMode) => {}}
      updateGFWUrl={(url: string) => {}}
      catchError={(error: Error) => {}}
    />
  );
  test("render GFWListSetting component", () => {
    const html = wrapper.find(Input).props();
    debugger;
    expect((wrapper.find(Input).getDOMNode() as HTMLInputElement).value).toEqual(
      "https://baidu.com"
    );
  });
});
