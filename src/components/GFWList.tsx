import React from "react";
import { Radio, Button, Input, Form } from "antd";
import { FireTwoTone } from "@ant-design/icons";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const GFWList = () => {
  return (
    <Form className="ghoo-gfw-list" layout="inline">
      <FormItem className="ghoo-gfw-list__radio-group">
        <RadioGroup>
          <Radio.Button value="a">黑名单</Radio.Button>
          <Radio.Button value="b">白名单</Radio.Button>
        </RadioGroup>
      </FormItem>
      <FormItem className="ghoo-gfw-list__input">
        <Input prefix={<FireTwoTone />} />
      </FormItem>
      <FormItem className="ghoo-gfw-list__button">
        <Button type="primary" ghost>
          更新名单
        </Button>
      </FormItem>
    </Form>
  );
};

export default GFWList;
