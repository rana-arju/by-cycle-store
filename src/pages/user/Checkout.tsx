import { FieldValues } from "react-hook-form";
import BForm from "../../components/form/BForm";
import BInput from "../../components/form/BInput";
import { Button, Spin } from "antd";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  clearCart,
  removeFromCart,
} from "../../redux/features/product/cartSlice";
import { usePlaceOrderMutation } from "../../redux/features/order/orderApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useGetMyDataQuery } from "../../redux/features/auth/authApi";
import payment from "../../assets/payment.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkout } from "../../schema/checkout.schema";
function Checkout() {
  const dispatch = useAppDispatch();
  const [check, setCheck] = useState(false);

  const [
    placeOrder,
    { isLoading: placeLoad, isSuccess, data, isError, error },
  ] = usePlaceOrderMutation();
  const product = useAppSelector((state) => state.cart);
  const { data: myData, isFetching, isLoading } = useGetMyDataQuery(undefined);
  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const defaultValues = {
    name: myData.data?.name,
    email: myData.data?.email,
    address: myData.data?.address || "",
    city: myData.data?.city || "",
    phone: myData.data?.phone || "",
  };

  const onSubmit = async (values: FieldValues) => {
    const data = {
      products: product.items,
      totalPrice: product.totalPrice,
      totalQuantity: product.totalQuantity,
      userInfo: values,
    };
    if (product.items.length == 0) {
      toast.error("There are no selected product!");
    } else {
      await placeOrder(data);
    }
  };
  const toastId = "cart";
  useEffect(() => {
    if (placeLoad) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      dispatch(clearCart());
      toast.success(data?.message, { id: toastId });
      if (data?.data) {
        setTimeout(() => {
          window.location.href = data.data;
        }, 1000);
      }
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);
  return (
    <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
      <div
        className="font-[sans-serif] bg-white container shadow-2xl rounded-md"
        style={{ padding: "20px" }}
      >
        <div className="max-lg:max-w-xl mx-auto w-full">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 max-lg:order-1 p-6 !pr-0 max-w-4xl mx-auto w-full">
              <div className="text-center max-lg:hidden">
                <h2 className="text-3xl font-bold text-gray-800 inline-block border-b-2 border-gray-800 pb-1">
                  Checkout
                </h2>
              </div>

              <BForm
                onSubmit={onSubmit}
                defaultValues={defaultValues}
                resolver={zodResolver(checkout)}
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Shipping info
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <BInput
                        type="text"
                        name="name"
                        label="Full name"
                        placeholder="Full name"
                        disabled={true}
                      />
                    </div>
                    <div>
                      <BInput
                        type="text"
                        name="email"
                        label="Email"
                        placeholder="Email"
                        disabled={true}
                      />
                    </div>
                    <div>
                      <BInput
                        type="text"
                        name="city"
                        label="City"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <BInput
                        type="text"
                        name="phone"
                        label="Phone"
                        placeholder="Phone"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <BInput
                      type="textarea"
                      name="address"
                      label="Full Address"
                      placeholder="Write full address..."
                    />
                  </div>
                </div>

                <div className="mt-16">
                  <h2 className="text-xl font-bold text-gray-800">
                    Payment method
                  </h2>

                  <div className="grid gap-4 sm:grid-cols-2 mt-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        className="w-5 h-5 cursor-pointer"
                        id="card"
                        checked
                      />
                      <label
                        htmlFor="card"
                        className="ml-4 flex gap-2 cursor-pointer"
                      >
                        <img
                          src={payment}
                          className="w-[100px] h-auto"
                          alt="card1"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="grid gap-8" style={{ marginTop: "20px" }}>
                    <div className="flex items-center gap-2">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        onChange={() => setCheck(!check)}
                        className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-3 block text-sm"
                      >
                        I accept the
                        <a
                          href="javascript:void(0);"
                          className="text-blue-600 font-semibold hover:underline ml-1"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                    {!check && (
                      <label style={{ color: "red" }}>
                        Without check you can't place order!
                      </label>
                    )}
                  </div>
                </div>

                <div
                  className="flex flex-wrap gap-4 justify-end"
                  style={{ marginTop: "20px" }}
                >
                  <Link to="/cart">
                    <Button className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                      Back
                    </Button>
                  </Link>
                  <Button
                    type="primary"
                    disabled={!check}
                    htmlType="submit"
                    className="min-w-[150px] px-6 py-3.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Order Now
                  </Button>
                </div>
              </BForm>
            </div>

            <div className="bg-white lg:h-screen lg:sticky lg:top-0 lg:max-w-[430px] w-full lg:ml-auto">
              <div className="relative h-full">
                <div className="p-6 overflow-auto max-lg:max-h-[300px] lg:h-[calc(100vh-50px)]">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-bold text-gray-800">
                      Order Summary
                    </h2>
                    <Button onClick={handleClearCart}>Clear Cart</Button>
                  </div>
                  {product?.items.length > 0 ? (
                    product?.items.map((item) => (
                      <div
                        className="flex flex-col gap-4"
                        style={{
                          padding: "10px",
                          border: "1px solid #2B6CB0",
                          marginBottom: "5px",
                          borderRadius: "8px",
                          marginTop: "10px",
                        }}
                      >
                        <div className="flex gap-4">
                          <div className="w-[124px] h-[100px] flex items-center justify-center p-4 shrink-0 bg-gray-200 rounded-lg">
                            <img
                              src={item.images}
                              className="w-full object-contain"
                            />
                          </div>

                          <div className="w-full">
                            <h3 className="text-sm text-gray-800 font-bold">
                              {item.name}
                            </h3>
                            <ul className="text-xs text-gray-800 space-y-1 mt-2">
                              <li className="flex flex-wrap gap-4">
                                Price{" "}
                                <span className="ml-auto">{item.price}</span>
                              </li>
                              <li className="flex flex-wrap gap-4">
                                Quantity{" "}
                                <span className="ml-auto">{item.quantity}</span>
                              </li>
                              <li className="flex flex-wrap gap-4">
                                Total Price{" "}
                                <span className="ml-auto">
                                  {item.totalPrice}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <Button
                          onClick={() => dispatch(removeFromCart(item.product))}
                        >
                          Remove
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p
                      className="flex flex-col justify-center items-center font-bold text-gray-600"
                      style={{ marginTop: "20px" }}
                    >
                      No Product Found! go back
                    </p>
                  )}
                </div>

                <div
                  className="lg:absolute lg:left-0 lg:bottom-0 bg-gray-100 w-full rounded-lg"
                  style={{ padding: "10px" }}
                >
                  <h4 className="flex flex-wrap gap-4 text-sm text-gray-800 font-bold">
                    Total Price
                    <span className="ml-auto">৳ {product?.totalPrice}</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
