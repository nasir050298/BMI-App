import React, { useState, useEffect } from "react";
import "./App.css";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const App = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [unit, setUnit] = useState("metric");
  const [bmi, setBmi] = useState(null);
  const [bfp, setBfp] = useState(null);
  const [whtr, setWhtr] = useState(null);
  const [status, setStatus] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    setHistory(savedHistory);
  }, []);

  const calculateMetrics = () => {
    let weightKg = parseFloat(weight);
    let heightCm = parseFloat(height);

    if (unit === "imperial") {
      weightKg = weightKg * 0.453592; // Convert lbs to kg
      heightCm = heightCm * 2.54; // Convert inches to cm
    }

    if (weightKg && heightCm && age) {
      const heightM = heightCm / 100;
      const bmiValue = (weightKg / (heightM * heightM)).toFixed(2);
      setBmi(bmiValue);

      let category = "";
      if (bmiValue < 18.5) category = "Underweight";
      else if (bmiValue >= 18.5 && bmiValue < 24.9) category = "Normal weight";
      else if (bmiValue >= 25 && bmiValue < 29.9) category = "Overweight";
      else category = "Obese";

      setStatus(category);

      // Calculate BFP (Body Fat Percentage)
      let bfpValue =
        gender === "male"
          ? (1.20 * bmiValue + 0.23 * age - 16.2).toFixed(2)
          : (1.20 * bmiValue + 0.23 * age - 5.4).toFixed(2);
      setBfp(bfpValue);

      // Calculate Waist-to-Height Ratio (Dummy value for now)
      let whtrValue = (heightCm / weightKg).toFixed(2);
      setWhtr(whtrValue);

      // Save to history
      const newHistory = [
        ...history,
        { bmi: bmiValue, date: new Date().toLocaleDateString() },
      ];
      setHistory(newHistory);
      localStorage.setItem("bmiHistory", JSON.stringify(newHistory));
    } else {
      alert("Please enter valid values!");
    }
  };

  const historyData = {
    labels: history.map((entry) => entry.date),
    datasets: [
      {
        label: "BMI Progress",
        data: history.map((entry) => entry.bmi),
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  return (
    <div className="container">
      <h1>BMI Calculator</h1>
      <div className="input-group">
        <label>Age:</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div className="input-group">
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="input-group">
        <label>Unit:</label>
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="metric">Metric (kg, cm)</option>
          <option value="imperial">Imperial (lbs, inches)</option>
        </select>
      </div>
      <div className="input-group">
        <label>Weight ({unit === "metric" ? "kg" : "lbs"}):</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>
      <div className="input-group">
        <label>Height ({unit === "metric" ? "cm" : "inches"}):</label>
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
      </div>
      <button onClick={calculateMetrics}>Calculate</button>
      {bmi && (
        <div className="result">
          <p>Your BMI: {bmi} ({status})</p>
          <p>Body Fat Percentage: {bfp}%</p>
          <p>Waist-to-Height Ratio: {whtr}</p>
        </div>
      )}
      <h2>BMI History</h2>
      <Line data={historyData} />
    </div>
  );
};

export default App;
