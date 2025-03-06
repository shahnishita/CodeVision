from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure API Key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def generate_code(prompt, language="python"):
    """Generates code using Google Gemini AI."""
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text

def generate_image(prompt):
    """Generates an image using Google Gemini AI."""
    model = genai.GenerativeModel("gemini-1.5-pro-vision")
    response = model.generate_content(prompt)
    return response

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "AI Generator Backend Running 🚀"}), 200

@app.route("/generate", methods=["POST"])
def generate():
    """Handles API requests for generating code or images."""
    data = request.json

    prompt = data.get("prompt", "").strip()
    option = data.get("option", "Code")
    language = data.get("language", "python")

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    try:
        if option == "Code":
            result = generate_code(prompt, language)
        else:
            result = generate_image(prompt)

        return jsonify({"result": result}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
