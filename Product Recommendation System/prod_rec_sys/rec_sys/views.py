from django.shortcuts import render
from .models import users, products, orders
import google.generativeai as genai
from django.http import HttpResponse
# Create your views here.

def recommend_products(request, user_id):
    genai.configure(api_key="api_key")
    model = genai.GenerativeModel("gemini-1.5-flash")
    
    # Get orders for this user
    user_orders = orders.objects.filter(user_id=user_id)
    
    # Get product IDs from orders
    purchased_product_ids = [order.product_id.product_id for order in user_orders]
    
    # Get all products
    all_products = products.objects.all()
    
    # Get product names based on product IDs
    purchased_product_names = [products.objects.get(product_id=pid).name for pid in purchased_product_ids]
    all_product_names = [prod.name for prod in all_products]
    
    prompt = f"The user has previously purchased these products: {purchased_product_names}. Here is the list of all available products: {all_product_names}. Recommend 3 products from this list to the user based on their purchase history."
    response = model.generate_content(prompt)
    recommended_products = response.text
    return HttpResponse(recommended_products)
