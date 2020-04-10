import React from "react";
import { Input, Button, Form } from "antd";
import { ApiTwoTone } from "@ant-design/icons";

const FormItem = Form.Item;

const RuleInput = () => {
  return (
    <Form className="ghoo-rule-input" layout="inline">
      <FormItem className="ghoo-rule-input__input">
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
