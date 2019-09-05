import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import ProxySetting from "./containers/ProxySetting";
import TitleHeader from "./containers/TitleHeader";
import UserRules from "./containers/UserRules";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/table/lib/css/table.css";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <main
          style={{
            width: "600px",
            margin: " 64px auto"
          }}
        >
          <TitleHeader />
          <section>
            <ProxySetting />
          </section>
          <section
            style={{
              marginTop: "25px"
            }}
          >
            <UserRules />
          </section>
        </main>
      </PersistGate>
    </Provider>
  );
};

export default App;
