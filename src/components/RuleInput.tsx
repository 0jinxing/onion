import React from "react";
import { Input, Button, Form } from "antd";
import queryFilter from "@/utils/query-filter";
import validator from "validator";

const FormItem = Form.Item;

export type RuleInputProps = {
  rules: string[];
  gfwList: string[];
  addRule: (url: string) => void;
};

function urlValidator(_: any, value: string) {
  const isURL = validator.isURL(value, {
    protocols: ["http", "https"],
    require_protocol: false,
  });
  if (!isURL) {
    return Promise.reject("请输入正确的 URL");
  }
  return Promise.resolve();
}

const RuleInput = (props: RuleInputProps) => {
  const { addRule, rules } = props;

  const [form] = Form.useForm();

  return (
    <Form className="ghoo-rule-input" layout="inline" form={form}>
      <FormItem
        name="url"
        className="ghoo-rule-input__input"
        rules={[{ validator: urlValidator }]}
      >
        <Input placeholder="输入需要添加的 URL 到" />
      </FormItem>
      <FormItem className="ghoo-rule-input__whitelist">
        <Button type="dashed">白名单</Button>
      </FormItem>
      <FormItem className="ghoo-rule-input__blocking">
        <Button>黑名单</Button>
      </FormItem>
    </Form>
  );
};

export default RuleInput;
