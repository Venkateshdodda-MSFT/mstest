import { app, HttpRequest, InvocationContext } from "@azure/functions";
import { ClientSecretCredential, ChainedTokenCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';
import axios from 'axios';


const tenantId = process.env.AZURE_TENANT_ID;
const clientId = process.env.AZURE_CLIENT_ID;
const clientSecret = process.env.AZURE_CLIENT_SECRET;
const vaultUrl = process.env.AZURE_VAULT_URL;
const secretName = "spice-delight-app-api-key";


const firstCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
const credentialChain = new ChainedTokenCredential(firstCredential);
const client = new SecretClient(vaultUrl, credentialChain);

const getSecretKey = async (): Promise<string> => {
    try {
        const secret = await client.getSecret(secretName);
        return secret.value!;
    } catch (error) {
        console.error('Error fetching secret:', error);
        throw new Error('Error fetching secret');
    }
};

const fetchRecipe = async (id: string): Promise<any> => {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error('Error fetching recipe');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching recipe:', error);
    }
};


const fetchProduct = async (id: string): Promise<any> => {
    try {
        const apiKey = await getSecretKey();
        const response = await axios.get(`${process.env.AZURE_SPICE_DELIGHT_API_URL}Product/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': apiKey,
            },
        });

        if (response.status !== 200) {
            throw new Error('Error fetching product');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
    }
};

const fetchProducts = async (): Promise<any> => {
    try {
        const apiKey = await getSecretKey();
        const response = await axios.get(`${process.env.AZURE_SPICE_DELIGHT_API_URL}Product`, {
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': apiKey,
            },
        });

        if (response.status !== 200) {
            throw new Error('Error fetching products');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const getStripeKey = async (keyName: string): Promise<any> => {
    try {
        const apiKey = await getSecretKey();
        const response = await axios.get(`${process.env.AZURE_SPICE_DELIGHT_API_URL}Stripe/${keyName}`, {
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': apiKey,
            },
        });

        if (response.status !== 200) {
            throw new Error('Error fetching Stripe key');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching Stripe key:', error);
    }
};

const createOrder = async (customerId: string, totalAmount: number, items: any[]): Promise<any> => {
    try {
        const apiKey = await getSecretKey();
        const currentDate = new Date();
        const timestamp = currentDate.toISOString();
        const orderDetails = { customerID: customerId, totalAmount, orderDate: timestamp, status: 0, items };

        const response = await axios.post(`${process.env.AZURE_SPICE_DELIGHT_API_URL}Order`, orderDetails, {
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': apiKey,
            },
        });

        if (response.status !== 200) {
            throw new Error('Error creating order');
        }

        console.log("Order created");
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
    }
};



app.http('login', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request: HttpRequest, context: InvocationContext): Promise<any> => {
        const { username, password }: any = await request.json();
        const credentials: { username: string; password: string } = { username, password };

        try {
            const apiKey = await getSecretKey();
            const response = await fetch(`${process.env.AZURE_SPICE_DELIGHT_API_URL}Customer/Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': apiKey
                },
                body: JSON.stringify(credentials)
            });

            if (response.status === 401) {
                return {
                    status: 401,
                    body: { error: 'Unauthorized - invalid credentials' },
                };
            }

            if (!response.ok) {
                throw new Error('Error logging in');
            }

            const data = await response.json();
            return {
                status: 200,
                body: JSON.stringify(data),
            };
        } catch (error) {
            context.log('Login error occurred:', error);
            const errorResponse: any = { error: 'Error logging in' };
            return {
                status: 500,
                body: errorResponse,
            };
        }
    },
});

app.http('register', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request: HttpRequest, context: InvocationContext): Promise<any> => {
        const credentials = await request.json();
        try {
            const apiKey = await getSecretKey();
            const response = await fetch(`${process.env.AZURE_SPICE_DELIGHT_API_URL}Customer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': apiKey
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                throw new Error('Error creating user');
            }

            const data = await response.json();
            return {
                status: 200,
                body: JSON.stringify(data),
            };
        } catch (error) {
            context.log('Error creating user:', error);
            return {
                status: 500,
                body: { error: 'Error creating user' },
            };
        }
    },
});

app.http('getRecipe', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'recipe/{id}',
    handler: async (request: HttpRequest, context: InvocationContext): Promise<any> => {
        const { id } = request.params;
        try {
            const recipe = await fetchRecipe(id);
            return {
                status: 200,
                body: JSON.stringify(recipe),
            };
        } catch (error) {
            context.log('Error fetching recipe:', error);
            return {
                status: 500,
                body: { error: 'Error fetching recipe' },
            };
        }
    },
});

app.http('getProduct', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'product/{id}',
    handler: async (request: HttpRequest, context: InvocationContext): Promise<any> => {
        const { id } = request.params;
        try {
            const product = await fetchProduct(id);
            return {
                status: 200,
                body: JSON.stringify(product),
            };
        } catch (error) {
            context.log('Error fetching product:', error);
            return {
                status: 500,
                body: { error: 'Error fetching product' },
            };
        }
    },
});

app.http('getProducts', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'products',
    handler: async (request: HttpRequest, context: InvocationContext): Promise<any> => {
        try {
            const products = await fetchProducts();
            return {
                status: 200,
                body: JSON.stringify(products),
            };
        } catch (error) {
            context.log('Error fetching products:', error);
            return {
                status: 500,
                body: { error: 'Error fetching products' },
            };
        }
    },
});

app.http('getStripeKey', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'stripe/{keyName}',
    handler: async (request: HttpRequest, context: InvocationContext): Promise<any> => {
        const { keyName } = request.params;
        try {
            const stripeKey = await getStripeKey(keyName);
            return {
                status: 200,
                body: JSON.stringify(stripeKey),
            };
        } catch (error) {
            context.log('Error fetching Stripe key:', error);
            return {
                status: 500,
                body: { error: 'Error fetching Stripe key' },
            };
        }
    },
});

app.http('createOrder', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'order',
    handler: async (request: HttpRequest, context: InvocationContext): Promise<any> => {
        const { customerId, totalAmount, items }: any = await request.json();
        try {
            const order = await createOrder(customerId, totalAmount, items);
            return {
                status: 200,
                body: JSON.stringify(order),
            };
        } catch (error) {
            context.log('Error creating order:', error);
            return {
                status: 500,
                body: { error: 'Error creating order' },
            };
        }
    },
});
