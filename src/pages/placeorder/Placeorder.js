import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreateOrder } from "../../actions/orderActions";
import { Helmet } from "react-helmet";

import "./Placeorder.css";
const Placeorder = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.userLogin.userInfo);
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  // Formatted dates
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const Placeorderhanlder = () => {
    dispatch(
      CreateOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        userInfo: user,
        date: formattedDate,
        status: "delivered",
      })
    );
  };
  useEffect(() => {
    if (success) {
      console.log(order.orderId);
      history.push(`/order/${order.orderId}`);
    }
    return () => {};
    //eslint-disable-next-line
  }, [history, success]);
  return (
    <div className="placeorder">
      <Helmet>
        <title>Placeorder</title>
      </Helmet>
      <div className="informations-placeorder">
        <div className="shipping-placeorder">
          <h2>Envío</h2>
          <p>
            <strong>Dirección: </strong>
            {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
            {cart.shippingAddress.cp}, {cart.shippingAddress.country}
          </p>
        </div>
        <hr />
        <div className="payment-placeorder">
          <h2>Método de pago</h2>
          <p>
            <strong>Método: </strong>
            {cart.paymentMethod}
          </p>
        </div>
        <hr />
        <div>
          <h2>Order Items: </h2>
          {cart.cartItems.length === 0 ? (
            <p>Tu carrito esta vacío</p>
          ) : (
            <div className="orders-placeorder">
              {cart.cartItems.map((item, index) => (
                <div key={index}>
                  <p>
                    <span className="color-name">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </span>{" "}
                    <b>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </b>
                  </p>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="your-products">
        <div className="cart-summ">
          <h1>Resumen del pedido</h1>

          <div className="calculs-placeorder">
            <h3>Productos: </h3>
            <p>${cart.itemsPrice}</p>
            <h3>Envío: </h3>
            <p>${cart.shippingPrice}</p>
            <h3>Taxes: </h3>
            <p>${cart.taxPrice}</p>
            <h3>Total: </h3>
            <p>${cart.totalPrice}</p>
            <div className="div-placeorder-btn">
              <button className="placeorder-btn" onClick={Placeorderhanlder}>
                Realizar pedido
              </button>
              {error && error}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placeorder;
