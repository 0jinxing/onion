import React from "react";
import { Input, Button, Form } from "antd";
import { ApiTwoTone } from "@ant-design/icons";

const FormItem = Form.Item;

const RuleInput = () => {
  return (
    <Form className="ghoo-rule-input" layout="inline">
      <FormItem className="ghoo-rule-input__input">
        <Input prefix={<ApiTwoTone />} />
      </FormItem>
      <FormItem className="ghoo-rule-input__whitelist">
        <Button type="primary" ghost>
          添加到白名单
        </Button>
      </FormItem>
      <FormItem className="ghoo-rule-input__blacklist">
        <Button type="primary">添加到黑名单</Button>
      </FormItem>
    </Form>
  );
};

export default RuleInput;
