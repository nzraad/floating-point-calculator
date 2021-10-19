import React, { useEffect, useState, useCallback } from "react";

import {
  Tabs,
  Tab,
  TabBody,
  Window,
  WindowHeader,
  WindowContent,
} from "react95";

import { Switch, Route, useHistory, useLocation } from "react-router-dom";

import Calculator from "./Calculator";
import Converter from "./Converter";

const CalculatorWindow = () => {
  const location = useLocation();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(0);

  const handleOnClick = useCallback(
    (e, value) => {
      if (value === 0) {
        history.push("/");
      } else {
        history.push("/calculator");
      }
    },
    [history]
  );

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab(0);
    } else if (location.pathname === "/calculator") {
      setActiveTab(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <Window className="window" style={{ width: "95%" }}>
      <WindowHeader>Zoomies Web App</WindowHeader>
      <WindowContent>
        <Tabs value={activeTab} onChange={handleOnClick}>
          <Tab value={0}>Converter</Tab>
          <Tab value={1}>Calculator</Tab>
        </Tabs>
        <TabBody>
          <div>
            {location.pathname === "/calculator" && <Calculator />}
            {location.pathname === "/" && <Converter />}
            <Switch>
              <Route path="/"></Route>
              <Route path="/calculator"></Route>
            </Switch>
          </div>
        </TabBody>
      </WindowContent>
    </Window>
  );
};
export default CalculatorWindow;
