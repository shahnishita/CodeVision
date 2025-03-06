# Project Setup Guide

## Prerequisites
- Python installed (>= 3.8)
- VS Code or Jupyter Notebook

## Installation

### Windows
Run:
```sh
setup.bat
```

### Linux/Mac
Run:
```sh
bash setup.sh
```

## Configuration
- Add your API keys in the `.env` file before running the application.
- Use FAISS for vector search or switch to Pinecone, Weaviate, or Milvus.

## Deployment (Optional)
To use Docker, build and run:
```sh
docker-compose up --build
```

Happy Coding!
