import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { Action } from "redux";
import {
  Button,
  ControlGroup,
  InputGroup,
  FormGroup,
  Tag,
  Intent
} from "@blueprintjs/core";
import { isURL, isEmpty } from "validator";
import { Report } from "@/actions/report";
import { Rule } from "@/actions/rule";
import "./RuleInput.scss";
import { queryFilter } from "@/utils";
import { WhitelistFilter, BlockingFilter, Filter } from "@/lib/adblockplus";

export type RuleInputProps = {
  rule: Rule[];
  report: Report[];
  allow: (hostname: string, delInd?: number) => Action;
  disallow: (hostname: string, delInd?: number) => Action;
};

const RuleInput = (props: RuleInputProps) => {
  const patterns = props.rule.map(r => r.pattern);
  const mounted = useRef(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [blocking, setBlocking] = useState(true);

  useEffect(() => {
    if (!mounted.current) return;
    if (isEmpty(url)) {
      setError("URL 不能为空（例如：https://www.example.com）");
      setDisabled(true);
    } else if (
      !isURL(url, { protocols: ["http", "https"], require_protocol: true })
    ) {
      setError("请输入正确的 URL，带 http(s?):// 前缀");
      setDisabled(true);
    } else {
      setBlocking(queryFilter([url], patterns)[0] instanceof BlockingFilter);
      setError("");
      setDisabled(false);
    }
  }, [url]);

  useEffect(() => {
    mounted.current = true;
  });

  const getDelInd = (url: string, functor: Function) => {
    const filter = queryFilter([url], patterns)[0];
    const delInd =
      filter && filter instanceof functor
        ? props.rule.findIndex(r => r.pattern === filter.text)
        : -1;
    return delInd;
  };

  return (
    <div className="rule-input">
      <FormGroup
        helperText={error || "请输入 URL（例如：https://www.example.com）"}
        intent={error ? Intent.DANGER : Intent.NONE}
      >
        <ControlGroup>
          <InputGroup
            placeholder="https://example.com"
            leftIcon="link"
            className="input"
            value={url}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUrl(e.target.value);
            }}
          ></InputGroup>
          <Button
            disabled={disabled || blocking}
            icon="walk"
            intent={Intent.PRIMARY}
            onClick={() => {
              const { hostname } = new URL(url);
              props.allow(hostname, getDelInd(url, WhitelistFilter));
              setUrl("");
            }}
          >
            添加到代理
          </Button>
          <Button
            disabled={disabled || !blocking}
            icon="disable"
            intent={Intent.WARNING}
            onClick={() => {
              const { hostname } = new URL(url);
              props.disallow(hostname, getDelInd(url, BlockingFilter));
              setUrl("");
            }}
          >
            添加到白名单
          </Button>
        </ControlGroup>
      </FormGroup>
      <div className="tag-wrap">
        {props.report.map(r => (
          <Tag
            className="tag"
            key={r.hostname}
            onClick={() => {
              const delInd = getDelInd(r.href, WhitelistFilter);
              props.allow(r.hostname, delInd);
            }}
          >
            {r.hostname}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default RuleInput;
