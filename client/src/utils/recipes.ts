import axiosInstance from './axiosInstance';
import { Meal } from '@/models/Meal';

const fetchRecipe = (id: string | undefined): Promise<Meal> => {
    return axiosInstance.get(`/api/recipe/${id}`)
        .then((response: any) => response.data.meals[0])
        .catch((error) => {
            console.error('Error fetching recipe:', error);
        });
};

const fetchProduct = (id: string): Promise<Product> => {
    return axiosInstance.get(`/api/product/${id}`)
        .then((response: any) => response.data)
        .catch((error) => {
            console.error('Error fetching product:', error);
        });
};

const fetchProducts = (): Promise<Product[]> => {
    return axiosInstance.get(`/api/products`)
        .then((response: any) => response.data)
        .catch((error) => {
            console.error('Error fetching products:', error);
        });
};

export {
    fetchRecipe,
    fetchProduct,
    fetchProducts
};