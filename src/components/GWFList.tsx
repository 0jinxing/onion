import React from "react";
import { Radio, Button, Input, Form } from "antd";
import { FireTwoTone } from "@ant-design/icons";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const GWFList = () => {
  return (
    <Form className="ghoo-gwf-list" layout="inline">
      <FormItem className="ghoo-gwf-list__radio-group">
        <RadioGroup>
          <Radio.Button value="a">黑名单</Radio.Button>
          <Radio.Button value="b">白名单</Radio.Button>
        </RadioGroup>
      </FormItem>
      <FormItem className="ghoo-gwf-list__input">
        <Input prefix={<FireTwoTone />} />
      </FormItem>
      <FormItem className="ghoo-gwf-list__button">
        <Button type="primary" ghost>
          更新名单
        </Button>
      </FormItem>
    </Form>
  );
};

export default GWFList;
