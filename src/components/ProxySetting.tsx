import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { Action } from "redux";
import validator from "validator";
import {
  Button,
  FormGroup,
  ControlGroup,
  InputGroup,
  Popover,
  Toaster,
  Position,
  Classes,
  Intent
} from "@blueprintjs/core";
import classNames from "classnames";
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
    if (validator.isEmpty(proxy)) {
      setError("代理服务器地址不能为空");
    } else if (
      !validator.isURL(proxy, {
        protocols: ["http", "https", "socks", "socks5"],
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
          id="proxy"
          placeholder="127.0.0.1:1080"
          defaultValue={proxy}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setProxy(value);

            if (!props.modify) {
              props.createModify();
            }
          }}
        />
        <div className="bp3-fixed">
          <Popover disabled={!!error}>
            <Button disabled={!!error}>更新</Button>
            <div className="popover-container">
              <p>
                即将更新 <b>代理服务器</b> 设置
              </p>
              <div className="button-group">
                <Button
                  className={classNames([
                    Classes.POPOVER_DISMISS,
                    "mr15"
                  ])}
                  intent={Intent.NONE}
                >
                  取消
                </Button>
                <Button
                  intent={Intent.PRIMARY}
                  className={Classes.POPOVER_DISMISS}
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
                  确定
                </Button>
              </div>
            </div>
          </Popover>
        </div>
      </ControlGroup>
      <Toaster ref={toaster} position={Position.TOP} />
    </FormGroup>
  );
};

export default ProxySetting;
