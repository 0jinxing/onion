import React from "react";
import { Provider } from "react-redux";

import { Tabs, Divider } from "antd";
import queryStore from "@/store/query-store";
import PageHeader from "@/containers/PageHeader";
import ProxySetting from "@/containers/ProxySetting";
import RuleTable from "@/containers/RuleTable";
import RuleInput from "@/components/RuleInput";
import GFWListSetting from "@/containers/GFWListSetting";
import "./styles/app.scss";

const TabPane = Tabs.TabPane;

const store = queryStore();

const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <div className="ghoo-container">
        <PageHeader />
        <Divider />
        <main className="ghoo-container__main">
          <ProxySetting />
          <GFWListSetting />
          <Tabs>
            <TabPane tab="RULES" key="user-rule">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <span>自定义的规则列表，列表中的优先级高于 GWFList</span>
                <RuleInput />
              </div>
              <RuleTable />
            </TabPane>
            <TabPane tab="TIMEOUT" key="timeout-result">
              <div style={{ marginBottom: "24px" }}>
                加载超时的网页资源，较大可能需要配置代理，也有可能是其他网络原因导致的
              </div>
              <RuleTable />
            </TabPane>
          </Tabs>
          {/* <UrlTags /> */}
        </main>
      </div>
    </Provider>
  );
};

export default App;
