/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, createContext, useContext, useState } from "react";

export interface IOrder {
  id: string;
}

interface IOrderContext {
  orders: IOrder[];
  setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
  specificOrder: string;
  setSpecificOrder: React.Dispatch<React.SetStateAction<string>>;
  getSpecificOrder: (id: string) => Promise<void>;
  getAllOrders: () => Promise<void>;
}

const defaultValues = {
  orders: [],
  setOrders: () => {},
  specificOrder: "",
  setSpecificOrder: () => {},
  getSpecificOrder: async () => {},
  getAllOrders: async () => {},
};

const OrderContext = createContext<IOrderContext>(defaultValues);

export const useOrderContext = () => useContext(OrderContext);

const OrderProvider = ({ children }: PropsWithChildren) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [specificOrder, setSpecificOrder] = useState<string>("");

  const getSpecificOrder = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3040/orders/${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch order with ID ${id}`);
      }

      if (response.status === 200) {
        const data = await response.json();
        setSpecificOrder(data);
      }
    } catch (error) {
      console.error("Error fetching selected product:", error);
    }
  };

  const getAllOrders = async () => {
    try {
      const orders = await fetch(`http://localhost:3040/orders`, {
        method: "GET",
      });

      if (!orders.ok) {
        throw new Error(`Failed to fetch products`);
      }

      if (orders.status === 200) {
        const data = await orders.json();
        const ordersFromStripe = data.map((order: IOrder) => {
          return {
            id: order.id,
          };
        });

        setOrders(ordersFromStripe);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        specificOrder,
        setSpecificOrder,
        getSpecificOrder,
        getAllOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
