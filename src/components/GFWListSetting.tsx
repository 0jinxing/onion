import React from "react";
import { Radio, Button, Input, Form } from "antd";
import { FireTwoTone } from "@ant-design/icons";
import { GFWMode, updateGFWList } from "@/actions/proxy";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export type GFWListSettingProps = {
  gfwUrl: string;
  gfwMode: GFWMode;
  loading: boolean;
  updateGFWMode: (mode: GFWMode) => void;
  updateGFWUrl: (url: string) => void;
};

const GFWListSetting = (props: GFWListSettingProps) => {
  const { gfwMode, gfwUrl, loading, updateGFWMode, updateGFWUrl } = props;

  const [form] = Form.useForm();

  return (
    <Form
      className="ghoo-gfw-list-setting"
      layout="inline"
      form={form}
      initialValues={{ gfwMode, gfwUrl }}
      onFinish={(values) => {
        const gfwUrl: string = values.gfwUrl;
        updateGFWUrl(gfwUrl);
      }}
    >
      <FormItem className="ghoo-gfw-list-setting__radio-group" name="gfwMode">
        <RadioGroup
          onChange={({ target: { value } }) => {
            updateGFWMode(value);
          }}
        >
          <Radio.Button value="blacklist">黑名单</Radio.Button>
          <Radio.Button value="whitelist">白名单</Radio.Button>
        </RadioGroup>
      </FormItem>
      <FormItem
        className="ghoo-gfw-list-setting__input"
        name="gfwUrl"
        validateTrigger="onBlur"
        rules={[{ type: "url", message: "请输入正确的 URL" }]}
      >
        <Input
          prefix={<FireTwoTone />}
          autoComplete="off"
          allowClear
          placeholder="输入资源 URL"
        />
      </FormItem>
      <FormItem className="ghoo-gfw-list-setting__button">
        <Button type="primary" ghost htmlType="submit" loading={loading}>
          更新名单
        </Button>
      </FormItem>
    </Form>
  );
};

export default GFWListSetting;
