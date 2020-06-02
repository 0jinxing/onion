import React, { useState, useEffect, ChangeEvent } from "react";
import { Input, Button, Form, message } from "antd";
import { BulbTwoTone } from "@ant-design/icons";
import validator from "validator";

const FormItem = Form.Item;

function proxyUrlValidator(_: any, value: string) {
  const isProxyURL = validator.isURL(value, {
    protocols: ["http", "https", "socks4", "socks", "socks5", "quic"],
    require_protocol: false
  });
  if (!isProxyURL && value) {
    return Promise.reject("请输入正确的代理地址");
  }
  return Promise.resolve();
}

export type ProxySettingProps = {
  proxyUrl: string;
  updateProxyUrl: (proxyUrl: string) => void;
  createChange: () => void;
  saveChange: () => void;
};

const ProxySetting = (props: ProxySettingProps) => {
  const { proxyUrl, updateProxyUrl, createChange, saveChange } = props;

  const [form] = Form.useForm();

  const [fieldData, setFieldData] = useState([{ name: ["proxyUrl"], value: proxyUrl }]);

  useEffect(() => {
    setFieldData([{ name: ["proxyUrl"], value: proxyUrl }]);
  }, [proxyUrl]);

  const handleInput = (event: ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    if (value === proxyUrl) saveChange();
    else createChange();
  };

  return (
    <Form
      layout="inline"
      className="ghoo-proxy-setting"
      form={form}
      autoComplete="off"
      fields={fieldData}
      onFinish={values => {
        const proxyUrl: string = values.proxyUrl;
        updateProxyUrl(proxyUrl);
        saveChange();
        message.success("Updated");
      }}
    >
      <FormItem
        name="proxyUrl"
        className="ghoo-proxy-setting__input"
        rules={[{ validator: proxyUrlValidator }]}
      >
        <Input
          prefix={<BulbTwoTone />}
          onChange={handleInput}
          allowClear
          placeholder="输入你的代理地址"
        />
      </FormItem>
      <FormItem className="ghoo-proxy-setting__button">
        <Button type="primary" htmlType="submit">
          更新代理
        </Button>
      </FormItem>
    </Form>
  );
};

export default ProxySetting;
