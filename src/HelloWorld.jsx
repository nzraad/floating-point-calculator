import React, { useState } from "react";

import { TextField, Button } from "react95";
import axios from "axios";

const HelloWorld = () => {
  const [name, setName] = useState("");
  return (
    <div>
      <div>
        <span>You entered : </span>
        <TextField
          value={name}
          style={{ width: "50%" }}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <Button
        onClick={() => {
          axios
            .get(`http://3.22.187.131:5000/${name}`, {
              headers: {
                security_key: "U1xrbVINgxKUEnXuzxS3",
                security_token: "23d4d57ab18b13c81b7ad07cd0503029",
              },
            })
            .then((response) => alert(response.data.message));
        }}
      >
        Submit
      </Button>
      <br />
    </div>
  );
};
export default HelloWorld;
