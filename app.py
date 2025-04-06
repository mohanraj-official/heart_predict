from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pickle
import numpy as np
import os


app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Load the trained model
model = pickle.load(open("model.pkl", "rb"))

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        features = np.array(data["features"]).reshape(1, -1)

        print("Received Features:", features)  # Debug
        prediction = model.predict(features)[0]
        # Sample logic for health tips
        if prediction == 1:
            result_message = "⚠️ High Risk of Heart Attack"
            tips = [
            "Eat a heart-healthy diet (less salt and fat)",
            "Exercise regularly (at least 30 mins/day)",
            "Avoid smoking and alcohol",
            "Regular medical checkups"
            ]
        else:
            result_message = "✅ Low Risk of Heart Attack"
            tips = [
            "Maintain your healthy lifestyle",
            "Keep regular checkups",
            "Stay active and manage stress",
            "Avoid junk food and stay hydrated"
            ]

        return jsonify({
        'prediction': int(prediction),
        'message': result_message,
        'tips': tips
        })

        print("Prediction:", prediction)  # Debug

        return jsonify({ 'prediction': int(prediction),
    'message': message,
    'tips': tips})
    except Exception as e:
        print("Error occurred:", e)
        return jsonify({"error": "Something went wrong!"}), 500

if __name__ == "__main__":
    app.run()
