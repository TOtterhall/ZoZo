import { useEffect } from "react";
import { useOrderContext } from "../../../context/orderContext";
import { IOrder } from "../../../context/orderContext";

export default function Order() {
  const { orders, getAllOrders } = useOrderContext();

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    getAllOrders();
  }
  return (
    <>
      <div>
        <h2>Alla Ordrar</h2>
        {orders.length === 0 ? (
          <p>Inga ordrar tillgängliga.</p>
        ) : (
          <ul>
            {orders.map((order: IOrder) => (
              <li key={order.id}>{order.id}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
