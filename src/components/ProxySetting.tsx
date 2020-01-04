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

  useEffect(() => {
    if (isEmpty(proxy)) {
      setError("代理服务器地址不能为空");
    } else if (
      !isURL(proxy, {
        protocols: ["http", "https", "socks5"],
        require_protocol: false
      })
    ) {
      setError("请输入正确的代理服务器地址");
    } else {
      setError("");
    }
  }, [proxy]);

  return (
    <FormGroup
      className="proxy-setting"
      helperText={error || "输入你的代理服务器地址（例如：127.0.0.1:1080）"}
      intent={error ? Intent.DANGER : Intent.NONE}
    >
      <ControlGroup vertical={false} fill>
        <InputGroup
          leftIcon="asterisk"
          id="proxy"
          placeholder="127.0.0.1:1080"
          value={proxy}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setProxy(value);

            if (!props.modify) {
              props.createModify();
            }
          }}
        />
        <div className="bp3-fixed">
          <Button
            intent={Intent.PRIMARY}
            disabled={!!error}
            icon="updated"
            onClick={() => {
              props.updateProxy(proxy);
              if (toaster.current) {
                toaster.current.show({
                  message: "代理地址更新成功",
                  intent: Intent.SUCCESS,
                  icon: "clean"
                });
                props.saveModify();
              }
            }}
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
