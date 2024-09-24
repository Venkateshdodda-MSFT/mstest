import axiosInstance from './axiosInstance';

export const createOrder = async (customerId: string, totalAmount: number, cart: cartItems): Promise<Order | void> => {
    const orderDetails = { 
        customerID: customerId,
        totalAmount: totalAmount,
        status: 0,
        items: JSON.stringify(cart) 
    };

    return axiosInstance.post('/api/order', orderDetails)
        .then((response: any) => {
            console.log("order created");
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};
