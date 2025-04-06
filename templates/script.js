 document.getElementById("predictionForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const features = [
        +document.getElementById("diabetes").value,
        +document.getElementById("medication").value,
        +document.getElementById("stress").value,
        +document.getElementById("sodium").value,
        +document.getElementById("dietType").value,
        +document.getElementById("bmi").value,
        +document.getElementById("fiber").value,
        +document.getElementById("exercise").value,
        +document.getElementById("age").value
      ];

      document.getElementById("loader").style.display = "block";
      document.getElementById("result").style.display = "none";
if (features.some(f => isNaN(f))) {
  alert("Please fill all fields correctly.");
  document.getElementById("loader").style.display = "none";
  return;
}


      fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: features })
      })
      .then(response => response.json())
      .then(data => {
        document.getElementById("loader").style.display = "none";

const bmiValue = features[5];
let bmiCategory = "";

if (bmiValue < 18.5) bmiCategory = "Underweight";
else if (bmiValue < 25) bmiCategory = "Normal weight";
else if (bmiValue < 30) bmiCategory = "Overweight";
else bmiCategory = "Obese";

document.getElementById("bmiTooltip").title = `BMI Category: ${bmiCategory}`;

const prediction = parseInt(data.prediction);
let message = "";


if (prediction === 1) {
  message = "⚠️ High Health Risk! Consult a doctor.";
} else {
  message = "✅ Low Health Risk. Keep up the good habits!";
}



// Show popup modal
document.getElementById("modalMessage").innerHTML = `
  <p style="font-size: 18px; margin-bottom: 10px;">${message}</p>
  <ul style="padding-left: 20px; text-align: left;">
    ${data.tips.map(tip => `<li>${tip}</li>`).join('')}
  </ul>
`;
document.getElementById("resultModal").style.display = "flex";
}
)
      .catch(error => {
        console.error("Error:", error);
        document.getElementById("loader").style.display = "none";
        const resultBox = document.getElementById("result");
        resultBox.textContent = "⚠️ Error occurred. Try again later.";
        resultBox.style.color = "#e67e22";
        resultBox.style.display = "block";
      });
    });
function closeModal() {
  document.getElementById("resultModal").style.display = "none";
}

