import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Table } from "react-bootstrap";

interface Prediction {
  id: number;
  modelname: string;
  taskname: string;
  prediction: {
    [key: string]: string; // Use index signature for dynamic keys
  };
}

interface Correction {
  feature: string;
  prediction: string;
  userCorrectionInput: string | null;
}

type MyDictionary = {
  modelname: string;
  taskname: string;
  prediction: {
    [key: string]: string; // Use index signature for dynamic keys
  };
};

const InputForm: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [mlprediction, setMLPrediction] = useState<Prediction | null>(null);
  const [corrections, setCorrections] = useState<Correction[]>([]);

  const userInputDjangoRoute: string =
    import.meta.env.VITE_API_URL + "/api/textinputs/";

  const savePredictionDjangoRoute: string =
    import.meta.env.VITE_API_URL + "/api/modelprediction/";

  // checking modelname and taskname and adding if they dont exist
  const ensureModelAndTaskExist = async (
    modelname: string,
    taskname: string
  ) => {
    try {
      // Check if model exists
      const modelNamesRoute = import.meta.env.VITE_API_URL + "/api/modelnames/";
      let modelResponse = await axios.get(
        modelNamesRoute + `?title=${modelname}`
      );
      if (modelResponse.data.length === 0) {
        // Create model if it doesn't exist
        modelResponse = await axios.post(modelNamesRoute, { title: modelname });
      }
      const modelNameId = modelResponse.data[0]?.id || modelResponse.data.id;

      // Check if task exists
      const taskNamesRoute = import.meta.env.VITE_API_URL + "/api/tasknames/";
      let taskResponse = await axios.get(taskNamesRoute + `?title=${taskname}`);
      if (taskResponse.data.length === 0) {
        // Create task if it doesn't exist
        taskResponse = await axios.post(taskNamesRoute, { title: taskname });
      }
      const taskNameId = taskResponse.data[0]?.id || taskResponse.data.id;

      return { modelNameId, taskNameId };
    } catch (error) {
      console.error("Error ensuring model and task existence", error);
      throw error;
    }
  };

  // handle submit functionality
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // get predictions from ml model
      // using a constant dict for values for now
      const predictionResponse: MyDictionary = {
        modelname: "model1",
        taskname: "task1",
        prediction: {
          feat1: "label1",
          feat2: "label2",
        },
      };

      // const predictionData = predictionResponse.data;
      const predictionData = predictionResponse;
      console.log("Output from the ML model prediction ", predictionData);

      // Ensure model and task exist in the database
      const { modelNameId, taskNameId } = await ensureModelAndTaskExist(
        predictionData.modelname,
        predictionData.taskname
      );

      console.log(
        "ModelNameID and TaskNameid from the data : ",
        modelNameId,
        taskNameId
      );

      // saving the user inputs with updated modelname and taskname
      const userInputResponse = await axios.post(userInputDjangoRoute, {
        input_text: inputText,
        model_name: modelNameId, // Replace with the actual model name ID
        task_name: taskNameId, // Replace with the actual task name ID
        user: 1, // Replace with the actual user ID
      });
      const userInput = userInputResponse.data;
      console.log("Response on Submitting text input from user", userInput);

      // Call the FastAPI endpoint to get predictions
      // const predictionResponse = await axios.post(
      //   "http://your-fastapi-endpoint/predict",
      //   {
      //     input_text: inputText,
      //   }
      // );
      // Save the prediction
      const savePredictionResponse = await axios.post(
        savePredictionDjangoRoute,
        {
          input_text: userInput.id,
          prediction: predictionData.prediction,
        }
      );
      console.log(
        "Output from saving the model prediction",
        savePredictionResponse.data
      );
      setMLPrediction(savePredictionResponse.data);
      const prediction_data = savePredictionResponse.data;
      // console.log("Prediction object : ", prediction);

      // Prepare corrections state
      const initialCorrections = Object.keys(prediction_data.prediction).map(
        (feat, index) => ({
          feature: feat,
          prediction: prediction_data.prediction[feat],
          userCorrectionInput: "",
        })
      );
      setCorrections(initialCorrections);
    } catch (error) {
      console.error("Error submitting input", error);
    }
  };

  const handleCorrectionChange = (index: number, value: string) => {
    const updatedCorrections = [...corrections];
    updatedCorrections[index].userCorrectionInput = value;
    setCorrections(updatedCorrections);
  };

  const handleCorrectionSubmit = async () => {
    if (mlprediction.id === null) return;
    const correctionDict: Record<string, string> = {};
    corrections.forEach((correction) => {
      correctionDict[correction.feature] =
        correction.userCorrectionInput || null;
    });

    console.log("saving to user corrections", correctionDict);
    console.log("Setted Prediction :", mlprediction, mlprediction.id);
    const correctionRoute =
      import.meta.env.VITE_API_URL + "/api/usercorrection/";
    try {
      await axios.post(correctionRoute, {
        prediction: mlprediction.id,
        correction: correctionDict,
      });
      alert("Corrections saved successfully");
    } catch (error) {
      console.error("Error saving corrections", error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="inputText">
          <Form.Label>Input Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {/* {prediction && (
        <div>
          <h3>Predictions</h3>
          <pre>{JSON.stringify(prediction.prediction, null, 2)}</pre>
        </div>
      )} */}
      {corrections.length > 0 && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Feature Name</th>
                <th>Model Prediction</th>
                <th>User Correction</th>
              </tr>
            </thead>
            <tbody>
              {corrections.map((correction, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{correction.feature}</td>
                  <td>{correction.prediction}</td>
                  <td>
                    <Form.Control
                      type="text"
                      value={correction.userCorrectionInput}
                      onChange={(e) =>
                        handleCorrectionChange(index, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="success" onClick={handleCorrectionSubmit}>
            Submit Corrections
          </Button>
        </>
      )}
    </Container>
  );
};

export default InputForm;
