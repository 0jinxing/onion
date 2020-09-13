import React, { useEffect, useState, useRef } from "react";
import { Radio, Button, Input, Form, message } from "antd";
import { FireTwoTone } from "@ant-design/icons";
import { GFWMode } from "@/actions/proxy";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export type GFWListSettingProps = {
  gfwUrl: string;
  gfwMode: GFWMode;
  gfwList: string[];
  loading: boolean;
  error?: Error;
  updateGFWMode: (mode: GFWMode) => void;
  updateGFWUrl: (url: string) => void;
  catchError: (error: Error) => void;
};

const GFWListSetting = (props: GFWListSettingProps) => {
  const {
    gfwMode,
    gfwUrl,
    loading,
    gfwList,
    error,
    updateGFWMode,
    updateGFWUrl,
    catchError
  } = props;

  const [form] = Form.useForm();

  const [fieldData, setFieldData] = useState([
    { name: ["gfwMode"], value: gfwMode },
    { name: ["gfwUrl"], value: gfwUrl }
  ]);

  useEffect(() => {
    setFieldData([
      { name: ["gfwMode"], value: gfwMode },
      { name: ["gfwUrl"], value: gfwUrl }
    ]);
  }, [gfwMode, gfwUrl]);

  const loadingRef = useRef(loading);

  useEffect(() => {
    if (error) {
      message.error(error.message);
      catchError(error);
    } else if (loadingRef.current && !loading) {
      message.success(`${gfwMode === GFWMode.BLOCKLIST ? "BLOCKING" : "WHITELIST"} Updated`);
    }
    loadingRef.current = loading;
  }, [loading]);

  return (
    <Form
      className="ghoo-gfw-list-setting"
      layout="inline"
      fields={fieldData}
      form={form}
      autoComplete="off"
      onFinish={values => {
        const gfwUrl: string = values.gfwUrl;
        if (!gfwUrl) {
          message.success("Disable GFW");
        }
        updateGFWUrl(gfwUrl);
      }}
    >
      <FormItem className="ghoo-gfw-list-setting__radio-group" name="gfwMode">
        <RadioGroup
          onChange={({ target: { value } }) => {
            updateGFWMode(value);
          }}
        >
          <Radio.Button value={GFWMode.BLOCKLIST}>黑名单</Radio.Button>
          <Radio.Button value={GFWMode.WHITELIST}>白名单</Radio.Button>
        </RadioGroup>
      </FormItem>
      <FormItem
        className="ghoo-gfw-list-setting__input"
        name="gfwUrl"
        validateTrigger="onBlur"
        rules={[{ type: "url", message: "请输入正确的资源 URL" }]}
      >
        <Input prefix={<FireTwoTone />} allowClear placeholder="输入资源 URL" />
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
