import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./AuthProvider";

const OrdersContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  // const [order, setOrder] = useState([]);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    payment: "Credit Card",
    userId: null,
    orderItems: [],
  });

  // TODO
  // 1. Lengkapi fungsi getOrdersById
  // 2. Buatkan fungsi createOrder
  const user = JSON.parse(localStorage.getItem("user"));

  const getOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/orders`, {
        headers: {
          Authorization: `${user.token}`,
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
          order_items: {
            product: true,
          },
        },
      });
      console.log(response.data);
      setOrders(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const getOrdersByUserId = async (id) => {
  //   try {
  //     // Your code here
  //     const response = await axios.get(`http://localhost:8000/api/orders/${id}`, {
  //       headers: {
  //         Authorization: `${user.token}`
  //       }
  //     });
  //     console.log(response.data);
  //     setOrders(response.data);
  //   } catch (err) {
  //     // Your code here
  //     console.log(err);
  //   }
  // };

  // Buat fungsi create order disni
  const createOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/orders`,
        formData,
        {
          headers: {
            Authorization: `${user.token}`,
          },
        }
      );
      const data = response.data;
      console.log("Order berhasil dibuat", data);
      toast.success(`Order berhasil dibuat`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
      toast.error(`Terjadi Kesalahan`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders,
        // order,
        formData,
        setFormData,
        // panggil fungsinya disini
        // getOrdersByUserId,
        createOrder,
        getOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
// make sure use
export const useOrderContext = () => {
  return useContext(OrdersContext);
};
