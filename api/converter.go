package handler

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

type FloatResponse struct {
	Highprecision_decimal   string `json:"highprecision_decimal"`
	Actual_mantissa   string `json:"actual_mantissa"`
	DecimalRepr string `json:"decimalRepr"`
	Infomessage string `json:"infomessage"`
	Mantisse_array []bool `json:"mantisse_array"`
	Actual_sign int `json:"actual_sign"`
	Sign_bool bool `json:"sign_bool"`
	Representation_error string `json:"representation_error"`
	Exponent_value string `json:"exponent_value"`
	BinaryRepr string `json:"binaryRepr"`
	Input_value string `json:"input_value"`
	IntValue int `json:"intValue"`
	HexadecimalRepr string `json:"hexadecimalRepr"`
	Actual_exponent string `json:"actual_exponent"`
	Mantissa_value string `json:"mantissa_value"`
	Exponent_array []bool `json:"exponent_array"`
	Sign_value string `json:"sign_value"`

}


func Converter(w http.ResponseWriter, r *http.Request) {

	decimalArray, okDecimal := r.URL.Query()["decimal"]
	hexadecimalArray, okHexadecimal := r.URL.Query()["hexadecimal"]
	binaryArray, okBinary := r.URL.Query()["binary"]


	if okDecimal && len(decimalArray[0]) > 0 {
		decimal := decimalArray[0]

		if response, err := http.Get("https://www.h-schmidt.net/FloatConverter/binary-json.py?decimal=" + decimal); err == nil {	
			bodyBytes, err := ioutil.ReadAll(response.Body)
	
			if err != nil {
				log.Fatal(err)
			}
			bodyString := string(bodyBytes)


			var bodyJSON FloatResponse


			Data := []byte(bodyString)
		  
			json.Unmarshal(Data, &bodyJSON)  

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(bodyJSON)
		}
		return
	}
	
	if okBinary && len(binaryArray[0]) > 1 {
		binary := binaryArray[0]

		if response, err := http.Get("https://www.h-schmidt.net/FloatConverter/binary-json.py?binary=" + binary); err == nil {	
			bodyBytes, err := ioutil.ReadAll(response.Body)
	
			if err != nil {
				log.Fatal(err)
			}
			bodyString := string(bodyBytes)

			var bodyJSON FloatResponse


			Data := []byte(bodyString)
		  
			json.Unmarshal(Data, &bodyJSON)  

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(bodyJSON)
		}
		return
	}

	if okHexadecimal && len(hexadecimalArray[0]) > 1 {
		hexadecimal := hexadecimalArray[0]

		if response, err := http.Get("https://www.h-schmidt.net/FloatConverter/binary-json.py?hexadecimal=" + hexadecimal); err == nil {	
			bodyBytes, err := ioutil.ReadAll(response.Body)
	
			if err != nil {
				log.Fatal(err)
			}
			bodyString := string(bodyBytes)
			fmt.Print(bodyString)

			var bodyJSON FloatResponse


			Data := []byte(bodyString)
		  
			json.Unmarshal(Data, &bodyJSON)  

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(bodyJSON)
		}
		return
	}

    // response, err := http.Get("http://pokeapi.co/api/v2/pokedex/kanto/")

    // if err != nil {
    //     fmt.Print(err.Error())
    //     os.Exit(1)
    // }

    // responseData, err := ioutil.ReadAll(response.Body)
    // if err != nil {
    //     log.Fatal(err)
    // }
    // fmt.Println(string(responseData))

}
