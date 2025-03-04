import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; // Flask backend URL

export const getInventory = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error("Error fetching inventory:", error);
        return [];
    }
};

export const placeOrder = async (customerId, productId, quantity) => {
    try {
        const response = await axios.post(`${API_URL}/order`, {
            customer_id: customerId,
            product_id: productId,
            quantity
        });
        return response.data;
    } catch (error) {
        console.error("Error placing order:", error);
        return { error: "Failed to place order" };
    }
};
