import React from "react";
import { useState } from "react/cjs/react.development";
import axios from "axios";

import { Panel, Button } from "react95";
import Converter from "./Converter";

const Calculator = () => {
  const [numberOne, setNumberOne] = useState(null);
  const [numberTwo, setNumberTwo] = useState(null);
  const [operation, setOperation] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <div style={{ height: "1600px", width: "100%", margin: "auto" }}>
      <br />
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "100%", width: "45%", float: "left" }}>
          <Panel>
            <Converter
              setDecimalValue={setNumberOne}
              calculate
              disabled={numberOne !== null}
            />
          </Panel>
        </div>
        <div style={{ height: "100%", float: "left", width: "10%" }}>
          <Panel style={{ width: "100%" }}>
            <div style={{ position: "relative" }}>
              {numberOne === null && (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    zIndex: 999,
                    top: 0,
                    left: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                  }}
                ></div>
              )}
              <Button
                style={{
                  width: "100%",
                  backgroundColor:
                    operation === "multiplication" ? "green" : "",
                }}
                disabled={operation !== null}
                onClick={() => {
                  setOperation("multiplication");
                }}
              >
                Multiply
              </Button>
              <br />
              <Button
                style={{
                  width: "100%",
                  backgroundColor: operation === "subtraction" ? "green" : "",
                }}
                onClick={() => {
                  setOperation("subtraction");
                }}
                disabled={operation !== null}
              >
                Subtract
              </Button>
              <br />
              <Button
                style={{
                  width: "100%",
                  backgroundColor: operation === "addition" ? "green" : "",
                }}
                onClick={() => {
                  setOperation("addition");
                }}
                disabled={operation !== null}
              >
                Add
              </Button>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Button
              style={{
                width: "100%",
                height: "100px",
                backgroundColor:
                  numberOne === null || numberTwo === null || operation === null
                    ? "rgba(0, 0, 0, 0.4)"
                    : "blue",
                color: "white",
              }}
              onClick={() => {
                axios
                  .get(
                    `/api/calculator?num1=${numberOne}&num2=${numberTwo}&action=${operation}`
                  )
                  .then((response) => {
                    const { data } = response;
                    setResult(data.answer);
                  });
              }}
              disabled={
                numberOne === null || numberTwo === null || operation === null
              }
            >
              Calculate
            </Button>
            <Button
              style={{
                width: "100%",
                height: "100px",
                backgroundColor: "red",
                color: "white",
              }}
              onClick={() => {
                setNumberOne(null);
                setNumberTwo(null);
                setOperation(null);
              }}
            >
              Clear
            </Button>
          </Panel>
        </div>
        <div
          style={{
            height: "100%",
            width: "45%",
            float: "right",
            marginBottom: "200px",
          }}
        >
          <Panel
            style={{
              margin: "auto",
              textAlign: "center",
              position: "relative",
            }}
          >
            {numberOne === null ||
              (operation === null && (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    zIndex: 999,
                    top: 0,
                    left: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                  }}
                ></div>
              ))}
            <Converter
              setDecimalValue={setNumberTwo}
              calculate
              disabled={numberTwo !== null}
            />
          </Panel>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Panel>
            {numberOne ? numberOne : "(Number One)"}{" "}
            {operation ? operation : "Operation"}{" "}
            {numberTwo ? numberTwo : "(Number Two)"} ={" "}
            {result ? result : "Result"}
            {result && <Converter decimalValue={result} calculate disabled />}
          </Panel>
        </div>
      </div>
    </div>
  );
};
export default Calculator;
