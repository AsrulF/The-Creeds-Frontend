import React, { useEffect, useState } from "react";
import Header from "../components/headers/light";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { FaUser } from "react-icons/fa6";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaLocationDot } from "react-icons/fa6";
import { useCart } from "react-use-cart";
import { formatPrice, formatTime } from "helpers/helpers";
import { useOrderContext } from "context/order_context";
import { useParams } from "react-router-dom";
import { useAuth } from "context/AuthProvider";
import { Button, Modal } from "antd";

const Orders = () => {
  const Container = tw.div`relative bg-teal-400 text-gray-700 -mb-8 -mx-8 px-4 py-8 lg:py-12`;
  const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;
  const { id } = useParams;

  // Your code here
  // Panggil fungsi dan state dari order context

  const { orders, getOrders } = useOrderContext();
  const { user } = useAuth();

  console.log(user);

  console.log("orders", orders);

  useEffect(() => {
    // Your code here
    getOrders();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const showModal = (selectedOrder) => {
    try {
      setSelectedOrder(orders.filter((order) => order.id === selectedOrder.id));
      console.log("Selected order", selectedOrder);
    } catch (error) {
      console.log(error);
    } finally {
      setIsModalOpen(true);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <AnimationRevealPage>
      <Header className="mb-8" />

      <Container>
        <Content>
          <Modal
            open={isModalOpen}
            onOk={handleOk}
            footer={(_, { OkBtn }) => (
              <>
                <OkBtn />
              </>
            )}
            okButtonProps={{ type: "default" }}
            closeIcon={null}
          >
            {selectedOrder !== null &&
              selectedOrder.map((item) => {
                return (
                  <div>
                    <div className="font-bold border-b">
                      <p>Delivery Detail</p>
                    </div>
                    <div>
                      <div className="grid grid-cols-4">
                        <p className="col-span-1">Payment Method</p>
                        <p className="col-span-1 justify-self-center">:</p>
                        <p className="col-span-2">{item.payment_method}</p>
                      </div>
                      <div className="grid grid-cols-4">
                        <p className="col-span-1">Address</p>
                        <p className="col-span-1 justify-self-center">:</p>
                        <div className="col-span-2">
                          <p>{item.address}</p>
                          <p>{item.postal_code}</p>
                          <p>{item.country}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold border-b">Products Detail</p>
                    </div>
                    {selectedOrder &&
                      item.order_items.map((orderItem) => {
                        return (
                          <div className="flex gap-2 p-2 border rounded-lg mt-2 shadow-md">
                            <img
                              src={`http://localhost:8000/uploads/${orderItem.product.images[0]}`}
                              alt="cartItem-img"
                              className="w-16 border rounded-lg"
                            />
                            <div>
                              <p className="text-xs font-bold">
                                {orderItem.product.title}
                              </p>
                              <p className="text-xs">
                                {orderItem.quantity} x{" "}
                                {formatPrice(orderItem.product.price)}
                              </p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                              <p>Total Price</p>
                              <p className="font-bold">
                                {formatPrice(
                                  orderItem.quantity * orderItem.product.price
                                )}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </Modal>
          {orders.length > 0 ? (
            orders.map((order) => {
              let total = 0;
              order.order_items.forEach((item) => {
                total += parseFloat(item.quantity * item.product.price);
              });

              const createdAt = `${order.created_at}`;

              const selectedOrderItem = order.order_items.filter(
                (item, index) => index === 0
              );

              return (
                <div className="bg-white p-3 m-4 border rounded-lg shadow-lg">
                  <div>
                    <p>Order Created : {formatTime(Date.parse(createdAt))}</p>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="flex flex-col items-center justify-center">
                      {order &&
                        selectedOrderItem.map((item) => {
                          return (
                            <div
                              key={item.product.id}
                              className="flex items-center justify-center gap-x-4 p-2"
                            >
                              <img
                                src={`http://localhost:8000/uploads/${item.product.images[0]}`}
                                alt="cartItem-img"
                                className="w-20 border rounded-lg"
                              />
                              <p className="font-bold text-sm">
                                {item.product.title}
                              </p>
                            </div>
                          );
                        })}
                      {order.order_items.length > 1 ? (
                        <p className="text-sm">+1 Other Products</p>
                      ) : null}
                    </div>
                    <div className="flex flex-col items-center justify-center border-l">
                      <p className="text-sm">Total Price</p>
                      <p className="font-bold text-sm">{formatPrice(total)}</p>
                    </div>
                    <div className="flex items-center justify-evenly border-l">
                      <button
                        className="text-sm font-bold text-[#4fd1c5]"
                        onClick={() => showModal(order)}
                      >
                        See Order Details
                      </button>
                      <Button>Give review</Button>
                      <Button href="/products">Buy Again</Button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>Orders Not Found</div>
          )}
        </Content>
      </Container>

      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
};

export default Orders;
