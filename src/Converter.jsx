import axios from "axios";
import React, { useState, useEffect } from "react";

import { Panel, TextField, Checkbox } from "react95";

const Converter = () => {
  const [decimal, setDecimal] = useState(0);

  useEffect(() => {
    console.log(decimal);
    axios
      .get(`https://www.h-schmidt.net/FloatConverter/binary-json.py?decimal=54`)
      .then((response) => console.log(response.data));
  }, [decimal]);

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
        <span>Decimal Representation : </span>
        <TextField
          value={decimal}
          style={{ width: "50%" }}
          onChange={(e) => {
            setDecimal(e.target.value);
          }}
        />
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
