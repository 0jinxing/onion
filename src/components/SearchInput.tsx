import React, { ChangeEvent } from "react";
import { Form, Input, Button } from "antd";

const FormItem = Form.Item;

export type SearchInputProps = {
  placeholder?: string;
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
};

const defaultProps: SearchInputProps = {
  placeholder: "输入关键词检索"
};

const SearchInput = (props: SearchInputProps) => {
  const { onChange, placeholder } = props;
  return (
    <div className="ghoo-search-input">
      <Input allowClear placeholder={placeholder} onChange={onChange} autoComplete="off" />
    </div>
  );
};

SearchInput.defaultProps = defaultProps;

export default SearchInput;
