import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Input, Stack, Select, Image, Link } from "@chakra-ui/react";
import { RiShoppingCart2Line } from "react-icons/ri";
import "./checkout.css";
import {
  saveAddressshipping,
  savepaymentmethod,
} from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

const Checkout = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [Payment, setPayment] = useState("Card");

  const dispatch = useDispatch();
  const [carddetails, setcarddetails] = useState(true);
  const handleorder = (e) => {
    e.preventDefault();
    dispatch(saveAddressshipping({ address, city, postalCode, country }));
    dispatch(savepaymentmethod(Payment));
    history.push("/placeorder");
  };
  return (
    <div>
      <Helmet>
        <title>Checkout</title>
      </Helmet>

      <div className="limit-check">
        <div className="info-check">
          <form onSubmit={handleorder}>
            <div className="billing-check">
              <h1>Dirección de Envio</h1>
              {/* <label htmlFor="name" className="this-label">Full Name</label><br />
                        <Input variant="flushed" placeholder="Your name" required id="name"/><br />
                        <label htmlFor="email" className="this-label" >Email</label><br />
                        <Input variant="flushed" placeholder="Your mail" required id="email"/><br /> */}
              <label htmlFor="address" className="this-label">
                Dirección
              </label>
              <br />
              <Input
                variant="flushed"
                placeholder="Tu dirección"
                required
                value={address}
                id="address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <br />
              <label className="this-label">Country</label>
              <br />
              <Stack spacing={3}>
                <Select
                  variant="flushed"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="RepDom">Rep. Dom</option>
                  <option value="USA">USA</option>
                  <option value="France">Francia</option>
                  <option value="Espagne">España</option>
                </Select>
              </Stack>
              <div className="city-cp-check">
                <div>
                  <label htmlFor="city" className="this-label">
                    Ciudad
                  </label>
                  <Input
                    variant="flushed"
                    required
                    placeholder="Tu ciudad"
                    onChange={(e) => setCity(e.target.value)}
                    id="city"
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="this-label">
                    Código postal
                  </label>
                  <Input
                    variant="flushed"
                    required
                    placeholder="Your Zip"
                    id="zip"
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="payment-check">
              <h1>Método de pago</h1>

              <input
                onChange={(e) => {
                  setcarddetails(true);
                  setPayment("card");
                }}
                checked={carddetails}
                type="radio"
                name="payment"
                id="card"
              />
              <label htmlFor="card" className="this-label">
                Tarjeta de credito
              </label>
              <div className="accept-cards-imgs">
                <Image src="https://i.imgur.com/AHCoUZO.png" alt="visa" />
                <Image src="https://i.imgur.com/l8OAGyo.png" alt="master" />
                <Image src="https://i.imgur.com/IDHC2iv.png" alt="discover" />
              </div>
              <div className={carddetails ? "detailsenable" : "detailsdisable"}>
                <div>
                  <label htmlFor="name-card" className="this-label">
                    Nombre en la tarjeta
                  </label>
                  <br />
                  <Input
                    variant="flushed"
                    id="name-card"
                    placeholder="Pedro M. Toribio"
                  />
                </div>
                <div>
                  <label htmlFor="number-card" className="this-label">
                    Credit card number
                  </label>
                  <br />
                  <Input
                    variant="flushed"
                    id="number-card"
                    placeholder="3333-1111-8888-2222"
                  />
                </div>
                <div>
                  <label htmlFor="expir-mt-card" className="this-label">
                    Exp Mes
                  </label>
                  <br />
                  <Input
                    variant="flushed"
                    id="expir-mt-card"
                    placeholder="Junio"
                  />
                </div>
                <div className="exp-ye-cvv-check">
                  <div>
                    <label htmlFor="exp-year" className="this-label">
                      Exp Año
                    </label>
                    <Input variant="flushed" placeholder="2023" id="exp-year" />
                  </div>
                  <div>
                    <label htmlFor="cvv-check" className="this-label">
                      Cvv
                    </label>
                    <Input variant="flushed" placeholder="512" id="cvv-check" />
                  </div>
                </div>
              </div>

              <input
                onChange={(e) => {
                  setcarddetails(false);
                  setPayment("paypal");
                }}
                type="radio"
                name="payment"
                id="paypal"
              />
              <label htmlFor="paypal" className="this-label">
                {" "}
                Paypal
              </label>
              <Image
                src="https://i.imgur.com/W5vSLzb.png"
                alt="paypal"
                width="120px"
                height="40px"
              />
              <div className="confirm">
                <input
                  type="submit"
                  className="confirm-check"
                  value="Ordenar"
                />
              </div>
            </div>
          </form>
          <div className="your-products">
            {cart.cartItems.length === 0 ? (
              <h1>
                {" "}
                <RiShoppingCart2Line size="29" />
                Carrito(0)
              </h1>
            ) : (
              <>
                <h1>
                  {" "}
                  <RiShoppingCart2Line size="29" />
                  Carrito({cart.cartItems.length})
                </h1>
                <div className="cart-summ">
                  {cart.cartItems.map((item, index) => (
                    <p key={index}>
                      {item.qty} X{" "}
                      <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                      <b>${item.qty * item.price}</b>
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
