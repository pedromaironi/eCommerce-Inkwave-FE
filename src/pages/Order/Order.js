import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { IoMdDoneAll } from "react-icons/io";
import HashLoader from "react-spinners/HashLoader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../../actions/orderActions";
import "./Order.css";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../../constants/orderConstants";
import { Button } from "@chakra-ui/button";
import { Center } from "@chakra-ui/react";
const Order = ({ match, history }) => {
  // const [sdkReady, setsdkReady] = useState(false);
  const orderId = match.params.id;
  // console.log(orderId);
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  // const orderPay = useSelector((state) => state.orderPay);
  const orderPay = {
    loadingPay: true,
    successPay: true,
  };
  const { loadingpay, successPay } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loadingDeliver, successDeliver } = orderDeliver;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  if (!loading) {
    order.itemsPrice = addDecimals(
      (order.orderItems || []).reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      )
    );
  }
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    console.log(order, order.orderId, orderId);
    if (loading) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, userInfo, order, history, loading]);

  // useEffect(() => {
  //   const addPaypalscript = async () => {
  //     const { data: clientId } = await axios.get("/api/config/paypal ");
  //     const script = document.createElement("script");
  //     script.type = "text/javascript";
  //     script.async = true;
  //     script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
  //     script.onload = () => {
  //       setsdkReady(true);
  //     };
  //     document.body.appendChild(script);
  //   };

  //   if (!order || successPay || successDeliver || order.isPaid) {
  //     if (!window.paypal) {
  //       addPaypalscript();
  //     } else {
  //       setsdkReady(true);
  //     }
  //   }
  // }, [order, successPay, successDeliver]);

  const successpaymenthandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };
  const deliverhandler = () => {
    dispatch(deliverOrder(order));
  };
  return loading || loadingDeliver ? (
    <div className="loading-product">
      <HashLoader
        color={"#1e1e2c"}
        loading={loading || loadingDeliver}
        size={50}
      />
    </div>
  ) : error ? (
    <h1>{error}</h1>
  ) : (
    <div className="placeorder">
      <Helmet>
        <title>Envio | Orden</title>
      </Helmet>
      <div className="informations-placeorder">
        {/* <div className="shipping-placeorder">
          <h2>Envio | Orden</h2>
          <p>
            <strong>Name: </strong>
            {order.user.name}
          </p>
          <p>
            <strong> Email: </strong>
            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
          </p>
          <p>
            <strong>Address: </strong>
            {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.cp}, {order.shippingAddress.country}
            {order.isDelivered ? (
              <div className="paid">Delivered at {order.deliveredAt}</div>
            ) : (
              <div className="notpaid">NOT Delivered YET</div>
            )}
          </p>
        </div>
        <hr className="hr" />
        <div className="payment-placeorder">
          <h2>Payment Method</h2>
          <p>
            <strong>Method: </strong>
            {order.paymentMethod}
            {order.isPaid ? (
              <div className="paid">PAID AT {order.paidAt}</div>
            ) : (
              <div className="notpaid">NOT PAID YET</div>
            )}
          </p>
        </div> */}
        <hr className="hr" />
        <div>
          <h2>Productos ordenados: </h2>
          {order.length === 0 ? (
            <p>Your order is empty</p>
          ) : (
            <div className="orders-placeorder">
              {order &&
                order &&
                order.map((item, index) => (
                  <p key={index}>
                    <span className="color-name">
                      <Link to={`/product/${item.id_producto}`}>
                        {item.nombre}
                      </Link>
                    </span>{" "}
                    <b>
                      {item.cantidad} x ${item.precio_unitario} = $
                      {item.cantidad * item.precio_unitario}
                    </b>
                    <hr className="hr" />
                  </p>
                ))}
            </div>
          )}
        </div>
      </div>
      <div className="your-products">
        <div className="cart-summ">
          <h1>Resumen de la orden</h1>

          <div className="calculs-placeorder">
            <h3>Envio: </h3>
            <p>${order[0].pago_envio}</p>
            <h3>Tax: </h3>
            <p>${order[0].taxes}</p>
            <h3>Subtotal: </h3>
            <p>${order[0].subtotal}</p>
            <h3>Total: </h3>
            <p>${order[0].total}</p>
          </div>
        </div>
        <div className="bottominfos">
          <h1 className="orderid">Orden #{order[0].id_orden}</h1>
          {!order.isPaid && (
            <>
              {/* {loadingpay && (
                <div className="loading-product">
                  <HashLoader color={"#1e1e2c"} loading={loading} size={50} />
                </div>
              )}
              <div className="paypalbuttons">
                <PayPalButton
                  className="buttonsp"
                  amount={order.total}
                  onSuccess={successpaymenthandler}
                />
              </div> */}
              <Button
                height="40px"
                width="200px"
                size="lg"
                onClick={deliverhandler}
                leftIcon={<IoMdDoneAll size="16" />}
                colorScheme="blue"
              >
                EN TRANSITO
              </Button>
            </>
          )}
          {userInfo &&
            userInfo.isAdmin &&
            order.isPaid &&
            !order.isDelivered && (
              <Button
                height="40px"
                width="200px"
                size="lg"
                onClick={deliverhandler}
                leftIcon={<IoMdDoneAll size="16" />}
                colorScheme="blue"
              >
                DELIVERED
              </Button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Order;
