import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import Header from "../components/headers/light";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { formatPrice } from "helpers/helpers";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useOrderContext } from "context/order_context";

const Checkout = () => {
  const { handleSubmit } = useForm();
  const { items, emptyCart } = useCart();
  const { order, createOrder } = useOrderContext();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    city: "",
    postal_code: "",
    country: "",
    payment_method: "Credit Card",
    user_id: user?.id,
    products: [],
  });

  console.log("user", user?.id);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/orders`,
        formData,
        {
          headers: {
            Authorization: `${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      console.log("Order berhasil dibuat", data);
      setFormData({
        city: "",
        postal_code: "",
        country: "",
        payment_method: "Credit Card",
        user_id: user?.id,
        products: [],
      });
      toast.success("Order Succesfully Created", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      emptyCart();
      navigate("/orders");
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong", {
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

  // Todo
  // Panggil state dan juga fungsi createOrder dari ordercontext

  const handleInputChange = (e) => {
    // Your code here
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const renderKondisi = () => {
    if (currentStep === 1) {
      return (
        <div className="">
          <p className="text-center mb-5 text-2xl">Delivery Address</p>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="adress"
            >
              Adress
            </label>
            <input
              type="text"
              value={formData.address}
              name="address"
              className="p-2 border rounded-md w-full"
              onChange={handleInputChange}
              placeholder="Enter Address"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              type="text"
              value={formData.city}
              name="city"
              className="p-2 border rounded-md w-full"
              onChange={handleInputChange}
              placeholder="Enter City"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="postal_code"
            >
              Postal Code
            </label>
            <input
              type="number"
              name="postal_code"
              value={formData.postal_code}
              className="p-2 border rounded-md w-full"
              onChange={handleInputChange}
              placeholder="Enter Postal Code"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="country"
            >
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              className="p-2 border rounded-md w-full"
              onChange={handleInputChange}
              placeholder="Enter Country"
            />
          </div>
        </div>
      );
    } else if (currentStep === 2) {
      return (
        <div className="">
          <p className="text-center mb-5 text-2xl">Payment Information</p>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="payment_method"
            >
              Payment Method
            </label>
            <select
              name="payment_method"
              value={formData.payment_method}
              onChange={handleInputChange}
              placeholder="Silahkan pilih payment method"
              className="p-2 border rounded-md w-full sm:text-base"
              // Add sm:text-base or any other appropriate class for smaller font size
            >
              <option value="Credit Card" className="text-sm w-10">
                Credit Card
              </option>
              <option value="Paypal" className="text-sm w-10">
                PayPal
              </option>
              <option value="Cash On Delivery" className="text-sm w-10">
                Cash On Delivery
              </option>
              {/* Add more payment options as needed */}
            </select>
          </div>
        </div>
      );
    } else if (currentStep === 3) {
      return (
        <div className="bg-white p-8 rounded-lg">
          <div className="flex flex-col lg:flex-row justify-center items-center">
            {/* Logo and Customer */}
            <div className="w-full mb-8 flex border-b pb-4">
              <FaUser className="my-auto text-5xl" />
              <div className="ml-5">
                <p className="font-bold text-xl">Customer</p>
                <p>{user.name}</p>
              </div>
            </div>

            {/* Logo and Order Info */}
            <div className="w-full mb-8 flex border-b pb-4">
              <TbTruckDelivery className="my-auto text-5xl" />
              <div className="ml-5">
                <p className="font-bold text-xl">Order Info</p>
                <div className="flex gap-x-2">
                  <p>Shipping: {formData.country}</p>
                  <p>Payment Method: {formData.payment_method}</p>
                </div>
              </div>
            </div>

            {/* Logo and Deliver To */}
            <div className="w-full mb-8 flex border-b pb-4">
              <FaLocationDot className="my-auto text-5xl" />
              <div className="ml-5">
                <p className="font-bold text-xl">Deliver To</p>
                <p>
                  Address: {formData.address}, {formData.postal_code}
                </p>
              </div>
            </div>
          </div>

          {/* Display Cart Items */}
          <p className="font-bold text-xl mb-4">Order Details</p>
          <div className="flex flex-col lg:flex-row justify-center items-center">
            <div className="w-full">
              {Object.values(items).map((item) => (
                <div
                  key={item.id}
                  className="grid lg:grid-cols-4 phone:grid-cols-2 mb-4"
                >
                  {/* Display Item Image */}
                  <img
                    src={`http://localhost:8000/uploads/${item.images[0]}`}
                    alt={item.name}
                    className="w-24 h-24 object-cover mr-4 "
                  />

                  <div className="lg:flex-grow my-auto">
                    <p className="font-bold">{item.title}</p>
                  </div>

                  <div className="lg:text-center lg:ml-4  my-auto">
                    <p className="font-bold">Quantity</p>
                    <p>{item.quantity}</p>
                  </div>

                  <div className="lg:text-center lg:ml-4 my-auto">
                    <p className="font-bold">Subtotal</p>
                    <p>{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-80 grid grid-cols-2 p-2">
              <p className="font-bold">Products :</p>
              <p>{formatPrice(calculateProductsTotal())}</p>
              <p className="font-bold">Shipping : </p>
              <p>{formatPrice(calculateProductsTotal() * 0.01)}</p>
              <p className="font-bold">Tax : </p>
              <p>{formatPrice(calculateProductsTotal() * 0.025)}</p>
              <p className="font-bold">Total :</p>
              <p>
                {formatPrice(
                  calculateProductsTotal() +
                    calculateProductsTotal() * 0.01 +
                    calculateProductsTotal() * 0.025
                )}
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  const handleNextStep = () => {
    // Disable the button during validation
    setIsButtonDisabled(true);
    console.log(isButtonDisabled);
    // Validate form fields before moving to the next step
    switch (currentStep) {
      case 1:
        if (
          formData.address &&
          formData.city &&
          formData.postal_code &&
          formData.country
        ) {
          setCurrentStep((prevStep) => prevStep + 1);
        } else {
          toast.error(`Please fill in all address fields`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        break;
      case 2:
        // Add validation for payment method if needed
        setCurrentStep((prevStep) => prevStep + 1);
        break;
      // Add validation for other steps if needed
      default:
        break;
    }
    // Enable the button after 3 seconds
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3500);
    console.log(isButtonDisabled);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const calculateProductsTotal = () => {
    return Object.values(items).reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };
  console.log(formData);
  console.log("items", items);
  useEffect(() => {
    const updatedOrderItems = items.map((item) => ({
      id: item.id, // Assuming 'id' is the unique identifier for each product
      quantity: parseFloat(item.quantity),
      color: item.color,
    }));

    // Updating the 'orderItems' in the 'formData' state
    setFormData((prevState) => ({
      ...prevState,
      products: updatedOrderItems,
    }));
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <AnimationRevealPage>
      <Header className="mb-8" />
      <div className="relative bg-[#4fd1c5] text-gray-700 -mb-8 -mx-8 px-4 py-8 lg:py-12">
        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="my-8 z-0">
            <form onSubmit={handleSubmit(handleCheckout)}>
              {renderKondisi()}

              <div className="flex justify-between mt-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    className="bg-white px-4 py-2 text-black hover:text-white rounded-md hover:bg-[#1b7d75] mr-2"
                    onClick={handlePrevStep}
                  >
                    Previous
                  </button>
                )}

                <div className="flex-grow" />

                {currentStep < 3 && (
                  <button
                    type="button"
                    className="bg-white px-4 py-2 text-black hover:text-white rounded-md hover:bg-[#1b7d75]"
                    onClick={handleNextStep}
                    disabled={isButtonDisabled}
                  >
                    Next
                  </button>
                )}

                {currentStep === 3 && (
                  <button
                    type="submit"
                    className="bg-white px-4 py-2 text-black hover:text-white rounded-md hover:bg-[#1b7d75]"
                  >
                    Order Now
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
};

export default Checkout;
