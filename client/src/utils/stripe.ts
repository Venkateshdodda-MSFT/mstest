import axiosInstance from './axiosInstance';

export const getStripeKey = async (keyName: string): Promise<StripeKey | void> => {
    return axiosInstance.get(`/api/stripe/${keyName}`)
        .then((response: any) => response.data)
        .catch((error) => {
            console.log(error);
        });
};
