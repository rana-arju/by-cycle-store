
import { Link, useSearchParams } from "react-router";
import { useVerifyOrderQuery } from "../../redux/features/order/orderApi";
import {  Button, Card, Skeleton } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface OrderData {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}

export default function VerifyOrder() {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = useVerifyOrderQuery(
    searchParams.get("order_id"),
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const orderData: OrderData = data?.data?.[0];
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order Verification</h1>
      {isLoading ? (
        <div className="w-full container h-[100vh] grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-10">
          <Skeleton  />
          <Skeleton  />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <div>
              <h3>Order Details</h3>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Order ID:</div>
                <div>{orderData?.order_id}</div>
                <dt className="font-semibold">Amount:</dt>
                <div>
                  {orderData?.currency} {orderData?.amount?.toFixed(2)}
                </div>
                <p className="font-semibold">Status:</p>
                <div>
                  <Button>{orderData?.bank_status}</Button>
                </div>
                <div className="font-semibold">Date:</div>
                <div>{new Date(orderData?.date_time)?.toLocaleString()}</div>
              </div>
            </div>
          </Card>

          <Card>
            <h3>
              <h3>Payment Information</h3>
            </h3>
            <div>
              <dl className="grid grid-cols-2 gap-2">
                <dt className="font-semibold">Method:</dt>
                <dd>{orderData?.method}</dd>
                <dt className="font-semibold">Transaction ID:</dt>
                <dd>{orderData?.bank_trx_id}</dd>
                <dt className="font-semibold">Invoice No:</dt>
                <dd>{orderData?.invoice_no}</dd>
                <dt className="font-semibold">SP Code:</dt>
                <dd>{orderData?.sp_code}</dd>
                <dt className="font-semibold">SP Message:</dt>
                <dd>{orderData?.sp_message}</dd>
              </dl>
            </div>
          </Card>

          <Card>
            <div>
              <h3>Customer Information</h3>
            </div>
            <div>
              <dl className="grid grid-cols-2 gap-2">
                <dt className="font-semibold">Name:</dt>
                <dd>{orderData?.name}</dd>
                <dt className="font-semibold">Email:</dt>
                <dd>{orderData?.email}</dd>
                <dt className="font-semibold">Phone:</dt>
                <dd>{orderData?.phone_no}</dd>
                <dt className="font-semibold">Address:</dt>
                <dd>{orderData?.address}</dd>
                <dt className="font-semibold">City:</dt>
                <dd>{orderData?.city}</dd>
              </dl>
            </div>
          </Card>

          <Card className="flex flex-col justify-center gap-10">
            <p>Verification Status</p>

            <div
              className="flex items-center gap-2 "
              style={{ marginBottom: "20px" }}
            >
              {orderData?.is_verify === 1 ? (
                <>
                  <p className="text-green-500" />
                  <span>Verified</span>
                </>
              ) : (
                <>
                  <ExclamationCircleOutlined />
                  <span>Not Verified</span>
                </>
              )}
            </div>

            <Link to="/order/my-orders">
              <Button className="w-full">View Orders</Button>
            </Link>
          </Card>
        </div>
      )}
    </div>
  );
}
