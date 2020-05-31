import React from "react";
import { Input, Button, Form } from "antd";
import queryFilter from "@/utils/query-filter";
import validator from "validator";
import { WhitelistFilter, BlockingFilter } from "@/lib/adblockplus";

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

  const handleWhitelist = async () => {
    try {
      const { url } = (await form.validateFields()) as { url: string };
      if (!url) return;
      const protocolUrl = /:\/\//.test(url) ? url : `http://${url}`;
      const { hostname } = new URL(protocolUrl);
      const filter = queryFilter(protocolUrl, rules);
      if (filter instanceof WhitelistFilter) {
        return;
      } else if (filter instanceof BlockingFilter) {
        deleteRule(filter.text);
        addRule(`@@${hostname}`);
      } else if (!filter) {
        addRule(`@@${hostname}`);
      }
    } catch {}
  };

  return (
    <Form className="ghoo-rule-input" layout="inline" form={form}>
      <FormItem name="url" className="ghoo-rule-input__input" rules={[{ validator: urlValidator }]}>
        <Input autoComplete="off" placeholder="输入需要添加的 URL 到" />
      </FormItem>
      <FormItem className="ghoo-rule-input__whitelist">
        <Button type="dashed" onClick={handleWhitelist}>
          白名单
        </Button>
      </FormItem>
      <FormItem className="ghoo-rule-input__blocking">
        <Button>黑名单</Button>
      </FormItem>
    </Form>
  );
};

export default RuleInput;
