# Use official Python image
FROM python:3.9

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY setup.sh /app/setup.sh
RUN bash /app/setup.sh

# Copy project files
COPY . /app

CMD ["bash"]
