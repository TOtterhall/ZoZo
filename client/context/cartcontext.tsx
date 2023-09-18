import { PropsWithChildren, createContext, useContext, useState } from "react";
export interface IProduct {
  unit_amount: number;
  quantity: number;
  id: string;
  name: string;
  description: string;
  default_price: string;
  images: string;
}
export interface ICartItem {
  id: string;

  // price_data: {
  //   currency: "sek";
  //   product_data: {
  //     name: string;
  //     description: string;
  //   };
  //   unit_amount: number;
  // };
  quantity: number;
  default_price: string;
}

interface ICartContext {
  cart: ICartItem[];
  setCart: React.Dispatch<React.SetStateAction<ICartItem[]>>;
  addToCart: (product: IProduct) => void;
  handleCart: (item: ICartItem) => void;
}

const defaultValues = {
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  handleCart: () => {},
};

const CartContext = createContext<ICartContext>(defaultValues);

// eslint-disable-next-line react-refresh/only-export-components
export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<ICartItem[]>([]);

  const addToCart = (product: IProduct) => {
    // Kopiera den nuvarande cart
    const updatedCart = [...cart];

    // Kolla om produkten redan finns i cart
    const existingItemIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({
        id: product.id,
        quantity: product.quantity,
        default_price: product.default_price,
      });
    }

    setCart(updatedCart);
  };

  const handleCart = async (cartItems: ICartItem) => {
    const cart = { cartItems };
    const response = await fetch("http://localhost:3040/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    console.log("Server response:", response);
    if (!response.ok) {
      console.log("Detta gick inte att logga in du");
      return;
    }
    // Stripe har en function som heter redirect men behövs egentligen inte.
    if (response.status === 200) {
      const { url } = await response.json();
      window.location = url;
      if (url) {
        window.location = url;
      } else {
        console.error(
          "Ingen giltig url, och gick inte att lägga en order tyvärr"
        );
      }
    } else {
      console.log("Detta gick inte att logga in du");
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, handleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
