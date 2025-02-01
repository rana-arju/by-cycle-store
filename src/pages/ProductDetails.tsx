import { Button, Input, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "../components/card/Rating";
import { useGetSingleProductQuery } from "../redux/features/product/productApi";
import { useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../redux/hook";
import { addCart } from "../redux/features/product/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isFetching, isLoading } = useGetSingleProductQuery(id);
  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }
  const data = product?.data;

  const handleDecrease = () => {
    const newValue = quantity - 1;
    if (newValue >= 1) {
      setQuantity(newValue);
    }
  };

  const handleIncrease = () => {
    const newValue = quantity + 1;
    if (newValue <= data?.quantity) {
      setQuantity(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= data?.quantity) {
      setQuantity(value);
    }
  };

  const handleBuy = async () => {
    const cart = {
      product: data._id,
      name: data.name,
      price: data.price,
      quantity: quantity,
      images: data.images[0],
      totalPrice: data.price * quantity,
    };
    dispatch(addCart(cart));
    navigate("/checkout", { replace: true });
  };
  return (
    <div className="container">
      <div
        className="font-sans tracking-wide max-md:mx-auto"
        style={{ marginTop: "60px", paddingBottom: "50px" }}
      >
        <div className="bg-gradient-to-r from-gray-600 via-gray-900 to-gray-900 md:min-h-[350px] grid items-start grid-cols-1 lg:grid-cols-5 md:grid-cols-2">
          <div className="lg:col-span-3 h-full p-6">
            <div className="relative h-full flex items-center justify-center lg:min-h-[400px]">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={{
                  delay: 200,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {data?.images?.map((img: string) => (
                  <SwiperSlide>
                    <img src={img} alt={data.name} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div
            className="lg:col-span-2 bg-[#CFDFEE] py-6 px-8 h-full"
            style={{ padding: "10px" }}
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800">{data.name}</h2>
              <Rating rating={4} />
            </div>

            <div style={{ margin: "10px 0 10px 0" }}>
              <p className="text-gray-800 text-3xl font-bold mt-2">
                ৳ {data.price}
              </p>
              <p
                className="text-gray-600 text-xl "
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Stock:{" "}
                {data.quantity > 0 ? (
                  data?.quantity
                ) : (
                  <p
                    style={{
                      color: "red",
                      fontSize: "16px",
                      textTransform: "uppercase",
                    }}
                  >
                    Stock Out
                  </p>
                )}
              </p>
            </div>

            <div style={{ margin: "20px 0 20px 0" }}>
              <h3
                className="text-lg font-bold text-gray-800"
                style={{ marginBottom: "10px" }}
              >
                Quantity
              </h3>
              <div className="flex items-center">
                <Button
                  icon={<MinusOutlined />}
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                  className="border border-gray-300"
                  style={{ borderRadius: "4px 0 0 4px" }}
                />
                <Input
                  value={quantity}
                  onChange={handleInputChange}
                  className="w-16 text-center"
                  style={{
                    borderLeft: "none",
                    borderRight: "none",
                    borderRadius: 0,
                  }}
                />
                <Button
                  icon={<PlusOutlined />}
                  onClick={handleIncrease}
                  disabled={quantity >= data?.quantity}
                  className="border border-gray-300"
                  style={{ borderRadius: "0 4px 4px 0" }}
                />
              </div>
            </div>

            <div style={{ margin: "20px 0 20px 0" }}>
              <Button
                onClick={handleBuy}
                disabled={data?.quantity > 0 ? false : true}
                type="primary"
                className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold rounded"
              >
                Buy now
              </Button>
            </div>

            <div className="flex flex-wrap items-center text-sm text-gray-800 mt-8 gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current w-6 mr-3"
                viewBox="0 0 48 48"
              >
                <path d="M15.5 33.3h19.1v2H15.5z" data-original="#000000" />
                <path
                  d="M45.2 35.3H43v-2h2.2c.4 0 .8-.4.8-.8v-9.1c0-.4-.3-.6-.5-.7l-3.2-1.3c-.3-.2-.8-.5-1.1-1l-6.5-10c-.1-.2-.4-.3-.7-.3H2.8c-.4 0-.8.4-.8.8v21.6c0 .4.4.8.8.8h3.9v2H2.8C1.3 35.3 0 34 0 32.5V10.9c0-1.5 1.3-2.8 2.8-2.8h31.3c1 0 1.9.5 2.4 1.3l6.5 10 .4.4 2.9 1.2c1.1.5 1.7 1.4 1.7 2.5v9.1c0 1.4-1.3 2.7-2.8 2.7z"
                  data-original="#000000"
                />
                <path
                  d="M26.5 21H3.9v-9.4h22.6zM5.9 19h18.6v-5.4H5.9zm32.9 2H27.9v-9.4h6.3zm-8.9-2h5.7L33 13.6h-3.1zm-19 20.9c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6zm27.9 9.2c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6z"
                  data-original="#000000"
                />
              </svg>
              Free delivery on order $10,000
            </div>
          </div>
        </div>

        <div className="lg:mt-12 mt-6 max-w-2xl px-6" style={{padding: "10px 15px"}}>
          <h3 className="text-lg font-bold text-gray-800">Bi-Cycle Info</h3>

          <ul className="grid sm:grid-cols-2 gap-3 mt-4 ">
            <li className="flex items-center text-sm text-gray-600 gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  data-original="#000000"
                />
              </svg>
              Model: {data.model}
            </li>
            <li className="flex items-center text-sm text-gray-600 gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  data-original="#000000"
                />
              </svg>
              Brand: {data.brand}
            </li>
            <li className="flex items-center text-sm text-gray-600 gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  data-original="#000000"
                />
              </svg>
              Category: {data.category}
            </li>
          </ul>

          <div style={{ margin: "20px 0 20px 0" }}>
            <h3 className="text-lg font-bold text-gray-800">
              Product Description
            </h3>
            <p className="text-sm text-gray-600 mt-4">{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
