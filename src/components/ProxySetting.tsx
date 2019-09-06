import React, { useState, useRef, ChangeEvent } from "react";
import { Action } from "redux";
import {
  Button,
  ControlGroup,
  InputGroup,
  Popover,
  Toaster,
  Position,
  Classes,
  Intent
} from "@blueprintjs/core";

type ProxySettingProps = {
  proxy: string;
  updateProxy: (proxy: string) => Action;
  createModify: () => Action;
  saveModify: () => Action;
};

const ProxySetting = (props: ProxySettingProps) => {
  const [proxy, setProxy] = useState(props.proxy);
  const toaster = useRef<Toaster>(null);

  return (
    <div>
      <ControlGroup vertical={false} fill={true}>
        <InputGroup
          id="proxy"
          placeholder="http://127.0.0.1:1080"
          defaultValue={proxy}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setProxy(e.target.value);
            props.createModify();
          }}
        />
        <div
          style={{
            flexGrow: 0
          }}
        >
          <Popover>
            <Button intent={Intent.NONE}>更新</Button>
            <div
              style={{
                padding: "20px",
                paddingBottom: "10px"
              }}
            >
              <p>
                即将更新 <b>代理服务器</b> 设置
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                <Button
                  className={Classes.POPOVER_DISMISS}
                  intent={Intent.NONE}
                  style={{
                    marginRight: "15px"
                  }}
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
      <p
        style={{
          marginTop: "5px",
          fontSize: "12px",
          color: "#5c7080"
        }}
      >
        输入你的代理服务器地址（例如：http://127.0.0.1:1080）
      </p>
      <Toaster ref={toaster} position={Position.TOP} />
    </div>
  );
};

export default ProxySetting;
