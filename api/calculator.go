package handler

import (
	"encoding/json"
	"net/http"
	"strconv"
)

type ErrorResponse struct {
	Error string `json:"error"`
}

type ValidResponse struct {
	Num1   float64 `json:"num1"`
	Num2   float64 `json:"num2"`
	Answer float64 `json:"answer"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	var error = ErrorResponse{}

	num1Array, ok1 := r.URL.Query()["num1"]
	num2Array, ok2 := r.URL.Query()["num2"]
	actionArray, okAction := r.URL.Query()["action"]

	if !ok1 || len(num1Array[0]) < 1 {
		error.Error = "Url Param 'num1' is missing"
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(error)
		return
	}

	if !ok2 || len(num2Array[0]) < 1 {
		error.Error = "Url Param 'num2' is missing"
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(error)
		return
	}

	if !okAction || len(actionArray[0]) < 1 {
		error.Error = "Url Param 'action' is missing"
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(error)
		return
	}

	num1 := num1Array[0]
	num2 := num2Array[0]
	action := actionArray[0]

	var result = ValidResponse{}

	if num1Parsed, err := strconv.ParseFloat(num1, 32); err == nil {
		result.Num1 = num1Parsed
	}

	if num2Parsed, err := strconv.ParseFloat(num2, 32); err == nil {
		result.Num2 = num2Parsed
	}

	switch action {
	case "addition":
		result.Answer = result.Num1 + result.Num2

	case "subtraction":
		result.Answer = result.Num1 - result.Num2

	case "multiplication":
		result.Answer = result.Num1 * result.Num2
	default:
		error.Error = "Not a Valid Action"
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(error)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)

}
