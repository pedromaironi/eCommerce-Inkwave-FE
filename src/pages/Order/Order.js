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

import { getFormattedCurrentDate } from "../../actions/userActions";
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

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11, por eso sumamos 1 y agregamos el padding.
  const day = String(today.getDate()).padStart(2, "0");

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
        <div className="shipping-placeorder">
          <h2>Envio | Orden</h2>
          <p>
            <strong>Name: </strong>
            {userInfo.nombre}
          </p>
          <p>
            <strong> Email: </strong>
            <a href={`mailto:${userInfo.correo_electronico}`}>
              {userInfo.correo_electronico}
            </a>
          </p>
          <p>
            <strong>Address: </strong>
            Santiago de los caballeros, Villa bisono, 51000, Republica
            Dominicana
            <div className="paid">
              Enviado el {year}-{month}-{day}{" "}
            </div>
          </p>
        </div>
        <hr className="hr" />
        <div className="payment-placeorder">
          <h2>Método de pago</h2>
          <p>
            <strong>Metodo: Tarjeta</strong>
            <div className="paid">
              Pagado el {year}-{month}-{day}
            </div>
          </p>
        </div>
        <hr className="hr" />
        <div>
          <h2>Productos ordenados: </h2>
          {order.length === 0 ? (
            <p>Tu orden esta vacia</p>
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
            <p>${order[0].pago_envio ? order[0].pago_envio : 0}</p>
            <h3>Tax: </h3>
            <p>${order[0].taxes ? order[0].taxes : 0}</p>
            <h3>Subtotal: </h3>
            <p>${order[0].subtotal ? order[0].subtotal : 0}</p>
            <h3>Total: </h3>
            <p>${order[0].total}</p>
          </div>
        </div>
        <div className="bottominfos">
          <h1 className="orderid">Orden #{order[0].id_orden}</h1>
          {true && (
            <>
              {loadingpay && (
                <div className="loading-product">
                  <HashLoader color={"#1e1e2c"} loading={loading} size={50} />
                </div>
              )}
              {/* 
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
                Enviado
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
                Enviado
              </Button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Order;
