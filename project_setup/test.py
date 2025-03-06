import google.generativeai as genai
import os 
# Configure API Key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_code(prompt):
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text

def generate_image(prompt):
    model = genai.GenerativeModel("gemini-1.5-pro-vision")
    response = model.generate_content(prompt)
    return response  # Modify this based on actual response format

# User Choice
print("Choose an option:")
print("1. Generate Code")
print("2. Generate Image")

choice = input("Enter 1 or 2: ")

if choice == "1":
    user_prompt = input("\nEnter your prompt for code generation: ")
    generated_code = generate_code(user_prompt)
    print("\nGenerated Code:\n")
    print(generated_code)

elif choice == "2":
    user_prompt = input("\nEnter your prompt for image generation: ")
    generated_image = generate_image(user_prompt)
    print("\nGenerated Image Response:\n")
    print(generated_image)  # Modify handling for actual image response

else:
    print("\nInvalid choice! Please enter 1 or 2.")
