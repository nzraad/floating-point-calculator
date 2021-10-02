import React from "react";

import { Panel, TextField, Checkbox, Fieldset } from "react95";

const Converter = () => {
  return (
    <div>
      <Panel
        style={{
          padding: "0.5rem",
          lineHeight: "1.5",
          width: "10%",
          textAlign: "center",
        }}
      >
        <div>
          Sign
          <br />
          +1
          <br />
          0
          <br />
          <Checkbox />
        </div>
      </Panel>
      <Panel
        style={{
          padding: "0.5rem",
          lineHeight: "1.5",
          width: "40%",
          textAlign: "center",
        }}
      >
        <div>
          Exponent
          <br />
          <p>
            2
            <sup
              style={{
                verticalAlign: "super",
                fontSize: "smaller",
              }}
            >
              -126
            </sup>
            (denormalized)
          </p>
          0
          <br />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
        </div>
      </Panel>
      <Panel
        style={{
          padding: "0.5rem",
          lineHeight: "1.5",
          width: "50%",
          textAlign: "center",
        }}
      >
        <div>
          Mantissa
          <br />
          1.0
          <br />
          0
          <br />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
        </div>
      </Panel>
      <br />
      <br />
      <div>
        <span>You entered : </span>
        <TextField value="0" style={{ width: "50%" }} />
      </div>
      <br />
      <div>
        <span>Decimal representation : </span>
        <TextField value="0" style={{ width: "50%" }} />
      </div>
      <br />
      <div>
        <span>Value actually stored in float : </span>
        <TextField value="0" style={{ width: "50%" }} />
      </div>
      <br />
      <div>
        <span>Binary Representation : </span>
        <TextField value="0" style={{ width: "50%" }} />
      </div>
      <br />
      <div>
        <span>Hexadecimal Representation : </span>
        <TextField value="0" style={{ width: "50%" }} />
      </div>
      <br />
    </div>
  );
};
export default Converter;
