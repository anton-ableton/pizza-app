import axiosInstance from "./axiosInstance";

export const getPizzaCatalog = () => {
  return axiosInstance.get("/pizza/catalog");
};

export const createPizzaPayment = (data: {
  receiverAddress: {
    street: string;
    house: string;
    apartment: string;
    comment: string;
  };
  person: {
    firstname: string;
    lastname: string;
    middlename: string;
    phone: string;
  };
  debitCard: {
    pan: string;
    expireDate: string;
    cvv: string;
  };
  pizzas: {
    id: string;
    toppings: string[];
    size: string;
    dough: string;
  }[];
}) => {
  return axiosInstance.post("/pizza/payment", data);
};

export const getPizzaOrders = () => {
  return axiosInstance.get("/pizza/orders");
};

export const getPizzaOrder = (orderId: string) => {
  return axiosInstance.get(`/pizza/orders/${orderId}`);
};

export const cancelPizzaOrder = (orderId: string) => {
  return axiosInstance.put("/pizza/orders/cancel", { orderId });
};