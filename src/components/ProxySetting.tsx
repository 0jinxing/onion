import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import { BulbTwoTone } from "@ant-design/icons";

const FormItem = Form.Item;

export type ProxySettingProps = {
  proxyUrl: string;
  updateProxyUrl: (proxyUrl: string) => void;
};

const ProxySetting = (props: ProxySettingProps) => {
  const { proxyUrl, updateProxyUrl } = props;

  const [form] = Form.useForm();

  const [proxyUrlFieldError, updateProxyUrlFieldError] = useState<string[]>([]);

  return (
    <Form
      layout="inline"
      className="ghoo-proxy-setting"
      form={form}
      onFinish={(values) => {
        updateProxyUrlFieldError([]);
        const proxyUrl: string = values.proxyUrl;
        updateProxyUrl(proxyUrl);
      }}
      onFinishFailed={() => {
        updateProxyUrlFieldError(form.getFieldError("proxyUrl"));
      }}
      initialValues={{ proxyUrl }}
    >
      <FormItem
        name="proxyUrl"
        className="ghoo-proxy-setting__input"
        rules={[{ type: "url", message: "请输入正确的代理地址" }]}
        validateStatus={proxyUrlFieldError.length ? "error" : undefined}
        help={
          proxyUrlFieldError[0] ||
          "输入你的代理服务器地址（eg：http://127.0.0.1:1080）"
        }
      >
        <Input
          onBlur={() => {
            updateProxyUrlFieldError(form.getFieldError("proxyUrl"));
          }}
          prefix={<BulbTwoTone />}
          allowClear
          placeholder="输入你的代理地址"
          autoComplete="off"
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
