import axios from "axios";
import React, { useState, useEffect } from "react";

import { Button, Panel, TextField, LoadingIndicator } from "react95";

const Converter = ({
  setDecimalValue = () => {},
  decimalValue = "0.0",
  calculate = false,
  disabled = false,
  viewOnly = false,
  resultLoading = false,
  clearValueFromAbove = () => {},
}) => {
  const [decimal, setDecimal] = useState("0.0");
  const [hexadecimal, setHexadecimal] = useState("0x00000000");
  const [exponentValue, setExponentValue] = useState("-126 (denormalized)");
  const [actualExponent, setActualExponent] = useState("0");
  const [signValue, setSignValue] = useState("+1");
  const [actualSign, setActualSign] = useState("0");
  const [mantissaValue, setMantissaValue] = useState("0.0 (denormalized)");
  const [actualMantissa, setActualMantissa] = useState("0");

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
  const [isLoading, setIsLoading] = useState(resultLoading);
  const [isNotANumber, setIsNotANumber] = useState(false);
  const [isZero, setIsZero] = useState(false);
  const [isDenormalized, setIsDenormalized] = useState(false);
  const [isNormalized, setIsNormalized] = useState(false);

  useEffect(() => {
    setIsNotANumber(false);
    setIsDenormalized(false);
    setIsZero(false);
    setIsNormalized(false);

    if (decimal === "nan") {
      setIsNotANumber(true);
    } else {
      setIsNotANumber(false);
    }

    if (parseFloat(decimal, 10) === 0) {
      setIsZero(true);
    } else {
      setIsZero(false);
    }

    if (decimal !== "nan" && parseFloat(decimal, 10) !== 0) {
      if (
        mantissaValue.includes("denormalized") ||
        exponentValue.includes("denormalized")
      ) {
        setIsDenormalized(true);
        setIsNormalized(false);
      } else {
        setIsDenormalized(false);
        setIsNormalized(true);
      }
    }
  }, [decimal, mantissaValue, exponentValue]);

  const clearValue = () => {
    setHexadecimal("0x00000000");
    setDecimal("0.0");
    setSign(false);
    setMantisseArray([
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
    setExponentArray([false, false, false, false, false, false, false, false]);
    clearValueFromAbove();
  };

  const onChangeDecimal = () => {
    axios.get(`/api/converter?decimal=${decimal}`).then((response) => {
      const { data } = response;
      if (
        data.decimalRepr === "" &&
        data.decimalRepr === "" &&
        data.highprecision_decimal === ""
      ) {
        window.confirm("Invalid Entry");
      } else {
        setDecimal(decimal);
        setDecimalValue(decimal);
        setHexadecimal(data.hexadecimalRepr.toUpperCase());
        setExponentArray(data.exponent_array);
        setMantisseArray(data.mantisse_array);
        setSign(data.sign_bool);
        setExponentValue(data.exponent_value);
        setActualExponent(data.actual_exponent);
        setSignValue(data.sign_value);
        setActualSign(data.actual_sign);
        setMantissaValue(data.mantissa_value);
        setActualMantissa(data.actual_mantissa);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (decimalValue !== "0.0") {
      axios.get(`/api/converter?decimal=${decimalValue}`).then((response) => {
        const { data } = response;
        if (
          data.decimalRepr === "" &&
          data.decimalRepr === "" &&
          data.highprecision_decimal === ""
        ) {
          window.confirm("Invalid Entry");
        } else {
          setDecimal(data.decimalRepr);
          setDecimalValue(data.decimalRepr);
          setHexadecimal(data.hexadecimalRepr.toUpperCase());
          setExponentArray(data.exponent_array);
          setMantisseArray(data.mantisse_array);
          setSign(data.sign_bool);
          setExponentValue(data.exponent_value);
          setActualExponent(data.actual_exponent);
          setSignValue(data.sign_value);
          setActualSign(data.actual_sign);
          setMantissaValue(data.mantissa_value);
          setActualMantissa(data.actual_mantissa);
        }
      });
    } else {
      clearValue();
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decimalValue]);

  const onChangeHex = () => {
    axios.get(`/api/converter?hexadecimal=${hexadecimal}`).then((response) => {
      const { data } = response;
      if (
        data.decimalRepr === "" &&
        data.decimalRepr === "" &&
        data.highprecision_decimal === ""
      ) {
        window.confirm("Invalid Entry");
      } else {
        setDecimal(data.decimalRepr);
        setDecimalValue(data.decimalRepr);
        setExponentArray(data.exponent_array);
        setMantisseArray(data.mantisse_array);
        setSign(data.sign_bool);
        setExponentValue(data.exponent_value);
        setActualExponent(data.actual_exponent);
        setSignValue(data.sign_value);
        setActualSign(data.actual_sign);
        setMantissaValue(data.mantissa_value);
        setActualMantissa(data.actual_mantissa);
      }

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
        if (
          data.decimalRepr === "" &&
          data.decimalRepr === "" &&
          data.highprecision_decimal === ""
        ) {
          window.confirm("Invalid Entry");
        } else {
          setDecimal(data.decimalRepr);
          setDecimalValue(data.decimalRepr);
          setHexadecimal(data.hexadecimalRepr);
          setExponentValue(data.exponent_value);
          setActualExponent(data.actual_exponent);
          setSignValue(data.sign_value);
          setActualSign(data.actual_sign);
          setMantissaValue(data.mantissa_value);
          setActualMantissa(data.actual_mantissa);
        }
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
          {signValue}
          <br />
          {actualSign}
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
              {exponentValue}
            </sup>
          </p>
          {actualExponent}
          <br />
          {exponentArray.map((value, index) => {
            return (
              <input
                type="checkbox"
                key={index}
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
          {mantissaValue}
          <br />
          {actualMantissa}
          <br />
          {mantisseArray.map((value, index) => {
            return (
              <input
                type="checkbox"
                key={index}
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
            setHexadecimal(e.target.value.toUpperCase());
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
      {!viewOnly && decimal !== "0.0" && (
        <Button
          style={{
            height: "50px",
            width: "200px",
            float: calculate ? "" : "right",
            marginTop: "10px",
            marginBottom: "10px",
            backgroundColor: "#060084",
            color: "white",
          }}
          disabled={isLoading}
          onClick={() => {
            clearValue();
          }}
        >
          Clear
        </Button>
      )}
      <br />
      <input type="checkbox" checked={isNormalized} readOnly />
      Normalized Floating Point Number
      <br />
      <input type="checkbox" checked={isDenormalized} readOnly />
      Denormalized Floating Point Number
      <br />
      <input type="checkbox" checked={isNotANumber} readOnly />
      Not a Number (NaN)
      <br />
      <input type="checkbox" checked={isZero} readOnly />
      Zero
      <br />
      <LoadingIndicator isLoading={isLoading} />
    </div>
  );
};
export default Converter;
