#!/bin/bash
# Update system packages
pip install --upgrade pip

# Install necessary Python libraries
pip install langchain transformers sentence-transformers faiss-cpu unstructured openai     huggingface_hub tiktoken fastapi flask streamlit

echo "Setup complete. Configure your environment variables in the .env file."
