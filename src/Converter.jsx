import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";

import { Button, Panel, TextField, LoadingIndicator } from "react95";

const Converter = ({
  setDecimalValue = () => {},
  decimalValue = "0.0",
  calculate = false,
  disabled = false,
}) => {
  const [decimal, setDecimal] = useState("0.0");
  const [hexadecimal, setHexadecimal] = useState("0x00000000");
  const [exponentArray, setExponentArray] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [mantisseArray, setMantisseArray] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [sign, setSign] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeDecimal = () => {
    axios.get(`/api/converter?decimal=${decimal}`).then((response) => {
      const { data } = response;
      setDecimalValue(decimal);
      setHexadecimal(data.hexadecimalRepr);
      setExponentArray(data.exponent_array);
      setMantisseArray(data.mantisse_array);
      setSign(data.sign_bool);
      setIsLoading(false);
    });
  };

  // useEffect(() => {
  //   console.log(decimal);
  //   // axios.get(`/api/converter?decimal=${decimalValue}`).then((response) => {
  //   //   const { data } = response;
  //   //   setDecimal(data.decimalRepr);
  //   //   setHexadecimal(data.hexadecimalRepr);
  //   //   setExponentArray(data.exponent_array);
  //   //   setMantisseArray(data.mantisse_array);
  //   //   setSign(data.sign_bool);
  //   //   setIsLoading(false);
  //   // });
  // }, [decimalValue]);

  const onChangeHex = () => {
    axios.get(`/api/converter?hexadecimal=${hexadecimal}`).then((response) => {
      const { data } = response;
      setDecimal(data.decimalRepr);
      setDecimalValue(data.decimalRepr);
      setExponentArray(data.exponent_array);
      setMantisseArray(data.mantisse_array);
      setSign(data.sign_bool);
      setIsLoading(false);
    });
  };

  const onChangeBinary = () => {
    axios
      .get(
        `/api/converter?binary=${[sign]
          .concat(exponentArray, mantisseArray)
          .map((value) => (value ? "1" : "0"))
          .join("")}`
      )
      .then((response) => {
        const { data } = response;
        setDecimal(data.decimalRepr);
        setDecimalValue(data.decimalRepr);
        setHexadecimal(data.hexadecimalRepr);
        setIsLoading(false);
      });
  };

  return (
    <div style={{ textAlign: calculate ? "center" : "" }}>
      <Panel
        style={{
          padding: "0.5rem",
          minWidth: "50px",
          lineHeight: "1.5",
          width: calculate ? "100%" : "10%",
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
          <input
            type="checkbox"
            name="sign"
            checked={sign}
            disabled={isLoading}
            onChange={() => {
              setSign(!sign);
            }}
          />
        </div>
      </Panel>
      {calculate && <br />}
      <Panel
        style={{
          padding: "0.5rem",
          lineHeight: "1.5",
          minWidth: "180px",
          width: calculate ? "100%" : "25%",
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
          {exponentArray.map((value, index) => {
            return (
              <input
                type="checkbox"
                name={index}
                checked={value}
                disabled={isLoading}
                onChange={() => {
                  const newExponentArray = [...exponentArray];
                  newExponentArray[index] = !value;
                  setExponentArray(newExponentArray);
                }}
              />
            );
          })}
        </div>
      </Panel>
      {calculate && <br />}
      <Panel
        style={{
          padding: "0.5rem",
          lineHeight: "1.5",
          width: calculate ? "100%" : "50%",
          minWidth: "480px",
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
          {mantisseArray.map((value, index) => {
            return (
              <input
                type="checkbox"
                name={index}
                checked={value}
                disabled={isLoading}
                onChange={() => {
                  const newMantisseArray = [...mantisseArray];
                  newMantisseArray[index] = !value;
                  setMantisseArray(newMantisseArray);
                }}
              />
            );
          })}
        </div>
      </Panel>
      {calculate && <br />}
      {!disabled && (
        <Button
          style={{
            height: "50px",
            width: "150px",
            marginLeft: "10px",
            backgroundColor: "#060084",
            color: "white",
          }}
          disabled={isLoading}
          onClick={() => {
            onChangeBinary();
            setIsLoading(true);
          }}
        >
          {calculate ? "Enter Value" : "Convert Binary"}
        </Button>
      )}
      <br />
      <br />
      <div>
        <span>Decimal Representation : </span>
        <TextField
          value={decimal}
          style={{ width: "50%", margin: calculate ? "auto" : "" }}
          disabled={isLoading}
          onChange={(e) => {
            setDecimal(e.target.value);
          }}
        />
      </div>
      {!disabled && (
        <Button
          style={{
            height: "50px",
            width: "150px",
            marginTop: "10px",
            marginBottom: "10px",
            backgroundColor: "#060084",
            color: "white",
          }}
          disabled={isLoading}
          onClick={() => {
            onChangeDecimal();
            setIsLoading(true);
          }}
        >
          {calculate ? "Enter Value" : "Convert Decimal"}
        </Button>
      )}
      <br />
      <div>
        <span>Hexadecimal Representation : </span>
        <TextField
          value={hexadecimal}
          style={{ width: "50%", margin: calculate ? "auto" : "" }}
          disabled={isLoading}
          onChange={(e) => {
            setHexadecimal(e.target.value);
          }}
        />
      </div>
      {!disabled && (
        <Button
          style={{
            height: "50px",
            width: "200px",
            marginTop: "10px",
            marginBottom: "10px",
            backgroundColor: "#060084",
            color: "white",
          }}
          disabled={isLoading}
          onClick={() => {
            onChangeHex();
            setIsLoading(true);
          }}
        >
          {calculate ? "Enter Value" : "Convert Hexadecimal"}
        </Button>
      )}
      <br />

      <LoadingIndicator isLoading={isLoading} />
    </div>
  );
};
export default Converter;
