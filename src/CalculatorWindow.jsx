import React, { useState } from "react";

import {
  Tabs,
  Tab,
  TabBody,
  Window,
  WindowHeader,
  WindowContent,
  Fieldset,
  NumberField,
  Checkbox,
} from "react95";

import Calculator from "./Calculator";
import Converter from "./Converter";

const CalculatorWindow = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (e, value) => setActiveTab(value);

  return (
    <Window className="window" style={{ width: "95%" }}>
      <WindowHeader>Zoomys Web App</WindowHeader>
      <WindowContent>
        <Tabs value={activeTab} onChange={handleChange}>
          <Tab value={0}>Converter</Tab>
          <Tab value={1}>Calculator</Tab>
        </Tabs>
        <TabBody>
          {activeTab === 0 && <Converter />}
          {activeTab === 1 && <Calculator />}
        </TabBody>
      </WindowContent>
    </Window>
  );
};
export default CalculatorWindow;
