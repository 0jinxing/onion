import React from "react";
import { Input, Button, Form } from "antd";
import { BulbTwoTone } from "@ant-design/icons";

const FormItem = Form.Item;

const ProxySetting: React.FunctionComponent = props => {
  const handleEnter = () => {};

  return (
    <Form layout="inline" className="ghoo-proxy-setting">
      <FormItem className="ghoo-proxy-setting__input">
        <Input
          prefix={<BulbTwoTone />}
          onPressEnter={handleEnter}
          allowClear
          placeholder="输入你的代理地址"
        />
        <p className="tip">
          输入你的代理服务器地址（eg：http://127.0.0.1:1080）
        </p>
      </FormItem>
      <FormItem className="ghoo-proxy-setting__button">
        <Button type="primary">更新代理</Button>
      </FormItem>
    </Form>
  );
};

export default ProxySetting;
