import React from "react";
import { useCart } from "react-use-cart";
import Header from "../components/headers/light";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { formatPrice } from "helpers/helpers";
import { Navigate, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsTrash3Fill } from "react-icons/bs";

const Cart = () => {
  // Panggil fungsi dan state yang diperlukan dari useCart
  const { updateItemQuantity, removeItem, emptyCart, cartTotal, items } =
    useCart();
  const totalPrice = cartTotal;
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const Container = tw.div`relative bg-teal-400 text-gray-700  -mx-8 px-4 py-8 lg:py-12`;
  const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;

  const handleUpdateQuantity = (id, newQuantity) => {
    // Your code here
    updateItemQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    // Your code here
    removeItem(id);
  };

  const handleEmptyCart = () => {
    // Your code here
    emptyCart();
  };

  // const calculateTotalPrice = () => {
  //   // Your code here
  // };
  console.log(items);
  const renderCheckOutButton = () => {
    if (user) {
      return (
        <Link to={"/checkout"} className="bg-white rounded-lg text-black p-2">
          Checkout
        </Link>
      );
    } else {
      return (
        <Link to={"/login"} className="bg-white rounded-lg text-black p-2">
          Login to Checkout
        </Link>
      );
    }
  };

  return (
    <AnimationRevealPage>
      <Header className="mb-8" />

      <Container>
        <Content>
          <div>
            {items.map((cartItem) => (
              <div
                key={cartItem.id}
                className="flex justify-between items-center rounded-lg shadow-lg bg-white gap-5 my-5 p-3"
              >
                <img
                  src={`http://localhost:8000/uploads/${cartItem.images[0]}`}
                  alt="cartItem-img"
                  className="w-1/3"
                />
                <div className="flex flex-col w-1/3 items-start gap-8">
                  <h3 className="text-black text-lg font-semibold">
                    {cartItem.title}
                  </h3>
                  <h3 className="text-black">{formatPrice(cartItem.price)}</h3>
                  <h3 className="text-black">Color</h3>
                  <div className="flex items-center gap-3">
                    <button
                      className="px-2 rounded-full bg-[#45ccbd] hover:bg-[#37a397]"
                      onClick={() =>
                        handleUpdateQuantity(
                          cartItem.id,
                          Math.max(1, cartItem.quantity - 1)
                        )
                      }
                    >
                      -
                    </button>
                    <p>{cartItem.quantity}</p>
                    <button
                      className="px-2 rounded-full bg-[#45ccbd] hover:bg-[#37a397]"
                      onClick={() =>
                        handleUpdateQuantity(
                          cartItem.id,
                          Math.min(cartItem.stock, cartItem.quantity + 1)
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-end w-1/3 gap-5 pr-4">
                  <h2 className="text-black text-lg font-semibold">
                    {formatPrice(cartItem.itemTotal)}
                  </h2>
                  <button
                    className="bg-[#45ccbd] hover:bg-[#37a397] text-3xl p-1 rounded-lg"
                    onClick={() => handleRemoveItem(cartItem.id)}
                  >
                    <BsTrash3Fill />
                  </button>
                </div>
              </div>
            ))}
            <div className="">
              <h2 className="text-right text-black font-bold text-2xl my-4 mr-1">
                Total Order Price: {formatPrice(cartTotal)}
              </h2>
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex gap-5">
                  {renderCheckOutButton()}
                  <button
                    className="bg-white rounded-lg text-black p-2"
                    onClick={handleEmptyCart}
                  >
                    Empty Cart
                  </button>
                </div>
                <button
                  className="bg-white rounded-lg text-black p-2"
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </Content>
      </Container>

      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
};

export default Cart;
