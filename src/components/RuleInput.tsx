import React from "react";
import { Input, Button, Form } from "antd";
import validator from "validator";

const FormItem = Form.Item;

export type RuleInputProps = {
  rules: string[];
  gfwList: string[];
  addRule: (pattern: string) => void;
  deleteRule: (pattern: string) => void;
};

function urlValidator(_: any, value: string) {
  if (!value) return Promise.resolve();
  const isURL = validator.isURL(value, {
    protocols: ["http", "https"],
    require_protocol: false
  });
  if (!isURL) {
    return Promise.reject("请输入正确的 URL");
  }
  return Promise.resolve();
}

const RuleInput = (props: RuleInputProps) => {
  const { addRule, deleteRule, rules } = props;

  const [form] = Form.useForm();

  const getPatternPair = async () => {
    const { url } = (await form.validateFields()) as { url: string };
    if (!url) throw new Error("Invalid url");
    const protocolUrl = /https?:\/\//.test(url) ? url : `http://${url}`;
    const { hostname } = new URL(protocolUrl);
    return [hostname, rules.find(r => r.replace(/^@@/, "") === hostname)];
  };

  const completeSubmit = async () => {
    await form.setFieldsValue({ url: "" });
  };

  const handleWhitelist = async () => {
    try {
      const [hostname, pattern] = (await getPatternPair()) as [string, string?];
      if (!pattern) {
        addRule(`@@${hostname}`);
      } else if (!pattern.startsWith("@@")) {
        deleteRule(hostname);
        addRule(`@@${hostname}`);
      }
      await completeSubmit();
    } catch {}
  };

  const handleBlacklist = async () => {
    try {
      const [hostname, pattern] = (await getPatternPair()) as [string, string?];
      if (!pattern) {
        addRule(`${hostname}`);
      } else if (pattern.startsWith("@@")) {
        deleteRule(`@@${hostname}`);
        addRule(hostname);
      }
      await completeSubmit();
    } catch {}
  };

  return (
    <Form className="ghoo-rule-input" layout="inline" form={form}>
      <FormItem name="url" className="ghoo-rule-input__input" rules={[{ validator: urlValidator }]}>
        <Input allowClear autoComplete="off" placeholder="输入需要添加的 URL 到" />
      </FormItem>
      <FormItem className="ghoo-rule-input__whitelist">
        <Button type="dashed" onClick={handleWhitelist}>
          白名单
        </Button>
      </FormItem>
      <FormItem className="ghoo-rule-input__blocking">
        <Button onClick={handleBlacklist}>黑名单</Button>
      </FormItem>
    </Form>
  );
};

export default RuleInput;
