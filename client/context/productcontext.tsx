/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, createContext, useContext, useState } from "react";
export interface IProduct {
  id: string;
  name: string;
  description: string;
  default_price: string;
  images: string;
  unit_amount: number;
  quantity: number;
}

export interface IPrice {
  product: string;
  id: string;
  unit_amount: number;
  currency: string;
}
interface IProductContext {
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  selectedProduct: string;
  setSelectedProduct: React.Dispatch<React.SetStateAction<string>>;
  getSpecificProduct: (id: string) => Promise<void>;
  getAllProducts: () => Promise<void>;
  prices: IPrice[];
  setPrices: React.Dispatch<React.SetStateAction<IPrice[]>>;
  getPrices: () => Promise<void>;
}

const defaultValues = {
  products: [],
  setProducts: () => {},
  selectedProduct: "",
  setSelectedProduct: () => {},
  getSpecificProduct: async () => {},
  getAllProducts: async () => {},
  prices: [],
  setPrices: () => {},
  getPrices: async () => {},
};

const ProductContext = createContext<IProductContext>(defaultValues);

export const useProductContext = () => useContext(ProductContext);
const ProductProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [prices, setPrices] = useState<IPrice[]>([]);
  const getSpecificProduct = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3040/products/${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch product with ID ${id}`);
      }
      if (response.status === 200) {
        const data = await response.json();
        setSelectedProduct(data);
      }
    } catch (error) {
      console.error("Error fetching selected product:", error);
    }
  };

  const getAllProducts = async () => {
    try {
      const products = await fetch(`http://localhost:3040/products`, {
        method: "GET",
      });

      if (!products.ok) {
        throw new Error(`Failed to fetch products`);
      }
      if (products.status === 200) {
        const data = await products.json();
        const productsFromStripe = data.map((product: IProduct) => {
          return {
            id: product.id,
            name: product.name,
            description: product.description,
            images: product.images,
            default_price: product.default_price,
            unit_amount: product.unit_amount,
            quantity: product.quantity,
          };
        });

        setProducts(productsFromStripe);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getPrices = async () => {
    try {
      const prices = await fetch(`http://localhost:3040/products/prices`, {
        method: "GET",
      });

      if (!prices.ok) {
        throw new Error(`Failed to fetch products`);
      }
      if (prices.status === 200) {
        const data = await prices.json();
        const pricesFromStripe = data.map((price: IPrice) => {
          return {
            id: price.id,
            unit_amount: price.unit_amount,
            currency: price.currency,
          };
        });

        setPrices(pricesFromStripe);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        selectedProduct,
        setSelectedProduct,
        getSpecificProduct,
        getAllProducts,
        prices,
        getPrices,
        setPrices,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
