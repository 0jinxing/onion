import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { Action } from "redux";
import { isEmpty, isURL } from "validator";
import {
  Button,
  FormGroup,
  ControlGroup,
  InputGroup,
  Toaster,
  Position,
  Intent
} from "@blueprintjs/core";
import "./ProxySetting.scss";

type ProxySettingProps = {
  proxy: string;
  modify: boolean;
  updateProxy: (proxy: string) => Action;
  createModify: () => Action;
  saveModify: () => Action;
};

const ProxySetting = (props: ProxySettingProps) => {
  const [proxy, setProxy] = useState(props.proxy);
  const [error, setError] = useState("");
  const toaster = useRef<Toaster>(null);
  const updated = useRef(false);

  useEffect(() => {
    if (!updated.current) return;
    if (isEmpty(proxy)) {
      setError("代理服务器地址不能为空");
    } else if (
      !isURL(proxy, {
        protocols: ["http", "https", "socks4", "socks5"],
        require_protocol: false
      })
    ) {
      setError("请输入正确的代理服务器地址");
    } else {
      setError("");
    }
  }, [proxy]);

  const updateProxy = () => {
    if (!!error || !updated.current) return;
    props.updateProxy(proxy);
    if (toaster.current) {
      toaster.current.show({
        message: "代理地址更新成功",
        intent: Intent.SUCCESS,
        icon: "clean"
      });
      props.saveModify();
      updated.current = false;
    }
  };

  return (
    <FormGroup
      className="proxy-setting"
      helperText={
        error || "输入你的代理服务器地址（例如：socks5://127.0.0.1:1080）"
      }
      intent={error ? Intent.DANGER : Intent.NONE}
    >
      <ControlGroup vertical={false} fill>
        <InputGroup
          onKeyDown={ev => {
            if (ev.key.toLowerCase() !== "enter") return;
            updateProxy();
          }}
          leftIcon="asterisk"
          id="proxy"
          placeholder="example: 127.0.0.1:1080"
          value={proxy}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setProxy(value);

            if (!props.modify) {
              updated.current = true;
              props.createModify();
            }
          }}
        />
        <div className="bp3-fixed">
          <Button
            intent={Intent.PRIMARY}
            disabled={!!error || !updated.current}
            icon="updated"
            onClick={updateProxy}
          >
            更新代理服务器
          </Button>
        </div>
      </ControlGroup>
      <Toaster ref={toaster} position={Position.TOP} />
    </FormGroup>
  );
};

export default ProxySetting;
