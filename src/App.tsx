import React from "react";
import { Provider } from "react-redux";

import { Tabs, Divider } from "antd";
import queryStore from "@/store/query-store";
import PageHeader from "@/containers/PageHeader";
import ProxySetting from "@/containers/ProxySetting";
import RuleTable from "@/containers/RuleTable";
import ReportTable from "@/containers/ReportTable";
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
        <main>
          <ProxySetting />
          <GFWListSetting />
          <Tabs>
            <TabPane tab="RULES" key="user-rule">
              <RuleTable />
            </TabPane>
            <TabPane tab="REPORT" key="assets-report">
              <ReportTable />
            </TabPane>
          </Tabs>
        </main>
      </div>
    </Provider>
  );
};

export default App;
