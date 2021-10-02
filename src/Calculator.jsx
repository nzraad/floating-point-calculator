import React, { useState } from "react";

import { Counter, Panel, List, ListItem, Divider } from "react95";

const Calculator = () => {
  return (
    <div>
      <Counter value={123456789} minLength={5} size="lg" />
      <br />
      <br />
      <List>
        <ListItem size="sm">7</ListItem>
        <Divider />
        <ListItem size="sm">4</ListItem>
        <Divider />
        <ListItem size="sm">1</ListItem>
        <Divider />
        <ListItem size="sm">0</ListItem>
      </List>
      <List>
        <ListItem size="sm">8</ListItem>
        <Divider />
        <ListItem size="sm">5</ListItem>
        <Divider />
        <ListItem size="sm">2</ListItem>
        <Divider />
        <ListItem size="sm">.</ListItem>
      </List>
      <List>
        <ListItem size="sm">9</ListItem>
        <Divider />
        <ListItem size="sm">6</ListItem>
        <Divider />
        <ListItem size="sm">3</ListItem>
        <Divider />
        <ListItem size="sm">=</ListItem>
      </List>
      <List>
        <ListItem size="sm" style={{ textAlign: "center" }}>
          AC
        </ListItem>
        <Divider />
        <ListItem size="sm" style={{ textAlign: "center" }}>
          x
        </ListItem>
        <Divider />
        <ListItem size="sm">-</ListItem>
        <Divider />
        <ListItem size="sm">+</ListItem>
      </List>
    </div>
  );
};
export default Calculator;
