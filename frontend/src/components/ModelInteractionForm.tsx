import React, { useState } from "react";
import api from "../api";

interface Prediction {
  id: number;
  predictions: any;
}

const InputForm: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [correction, setCorrection] = useState<any>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post("submit-input/", {
        input_text: inputText,
      });
      setPrediction(response.data);
    } catch (error) {
      console.error("Error submitting input", error);
    }
  };

  const handleCorrectionSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!prediction) return;

    try {
      const response = await api.post(`submit-correction/${prediction.id}/`, {
        corrections: correction,
      });
      console.log("Correction submitted", response.data);
    } catch (error) {
      console.error("Error submitting correction", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {prediction && (
        <div>
          <h3>Predictions</h3>
          <pre>{JSON.stringify(prediction.predictions, null, 2)}</pre>
          <form onSubmit={handleCorrectionSubmit}>
            <textarea
              value={JSON.stringify(correction)}
              onChange={(e) => setCorrection(JSON.parse(e.target.value))}
            />
            <button type="submit">Submit Corrections</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default InputForm;
