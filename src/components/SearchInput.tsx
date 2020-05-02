import React from "react";
import { Form, Input, Button } from "antd";

const FormItem = Form.Item;

export type SearchInputProps = {
  placeholder?: string;
  onChange?: (keyword: string) => void;
};

const defaultProps: SearchInputProps = {
  placeholder: "输入关键词检索"
};

const SearchInput = (props: SearchInputProps = defaultProps) => {
  return (
    <div className="ghoo-search-input">
      <Input allowClear placeholder="输入关键词检索" autoComplete="off" />
    </div>
  );
};

export default SearchInput;
