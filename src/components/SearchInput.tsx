import React from "react";
import { Form, Input, Button } from "antd";

const FormItem = Form.Item;

export type SearchInputProps = {
  onSearch: (keyword: string) => void;
  onClear: () => void;
};

const SearchInput = () => {
  const [form] = Form.useForm();

  return (
    <Form className="ghoo-search-input" layout="inline" form={form}>
      <FormItem name="url" className="ghoo-rule-input__input">
        <Input allowClear placeholder="输入关键词" autoComplete="off" />
      </FormItem>
      <FormItem className="ghoo-rule-input__blocking">
        <Button>SEARCH</Button>
      </FormItem>
    </Form>
  );
};

export default SearchInput;
