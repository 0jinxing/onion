import React from "react";
import { Provider } from "react-redux";

import queryStore from "@/store/query-store";
import PageHeader from "@/containers/PageHeader";
import ProxySetting from "@/containers/ProxySetting";
import RuleTable from "@/containers/RuleTable";
import RuleInput from "@/components/RuleInput";
import UrlTags from "@/components/UrlTags";
import GFWListSetting from "@/containers/GFWListSetting";
import "./styles/app.scss";

const store = queryStore();

const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <div className="ghoo-container">
        <PageHeader />
        <main className="ghoo-container__main">
          <ProxySetting />
          <GFWListSetting />
          <RuleTable />
          <RuleInput />
          <UrlTags />
        </main>
      </div>
    </Provider>
  );
};

export default App;
