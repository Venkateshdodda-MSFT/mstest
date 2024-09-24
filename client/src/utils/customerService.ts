import axiosInstance from './axiosInstance';

export const login = async (username: string, password: string): Promise<Customer | void> => {
    const credentials = { "username": username, "password": password };

    return axiosInstance.post('/api/login', credentials)
        .then((response: any) => response.data)
        .catch((error) => {
            console.log(error);
        });
};

export const register = async (customerData: CustomerDetails): Promise<Customer | void> => {
    return axiosInstance.post('/api/register', customerData)
        .then((response: any) => response.data)
        .catch((error) => {
            console.log(error);
        });
};
