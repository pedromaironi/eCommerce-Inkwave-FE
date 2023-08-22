import React from "react";
import { AiOutlineHeart, AiOutlineInstagram } from "react-icons/ai";
import { FiFacebook } from "react-icons/fi";
import { IoLogoYoutube } from "react-icons/io";
import { Input, Stack } from "@chakra-ui/react";
import "./footercss.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footerCmp">
      <footer>
        <div className="footerCategorie">
          <h1>Categories</h1>
          <ul>
            <li>
              <Link to="/shop/?cg=tshirt">Tshirts</Link>
            </li>
            <li>
              <Link to="/shop/?cg=Joggers">Joggers</Link>
            </li>
            <li>
              <Link to="/shop/?cg=Zapatos">Zapatos</Link>
            </li>
            <li>
              <Link to="/shop/?cg=Reloj">Relojes</Link>
            </li>
          </ul>
        </div>

        <div className="fooHelp">
          <h1>Ayuda</h1>
          <ul>
            <li>Ordenes</li>
            <li>Devolucion</li>
            <li>Envios</li>
            <li>FAQs</li>
          </ul>
        </div>

        <div className="footerGetInTouch">
          <h1>PONERSE EN CONTACTO</h1>
          <ul>
            <p>
              ¿Alguna pregunta? Háganos saber en la tienda en BP 473 Complexe
              universidad Al Qods, Oujda 60000 o llámenos al (+809) 5555555
            </p>
            <li className="footerIcons">
              <FiFacebook size="25" />
            </li>
            <li className="footerIcons">
              <AiOutlineInstagram size="25" />
            </li>
            <li className="footerIcons">
              <IoLogoYoutube size="25" />
            </li>
          </ul>
        </div>

        <div className="footerNews">
          <h1>Boletin informativo</h1>
          <ul>
            <li>
              <Stack spacing={3}>
                <Input
                  variant="flushed"
                  placeholder="email@inkwave.com"
                  size="10"
                  width="200px"
                />
              </Stack>
            </li>
            <li>
              <button className="footerBtn">Suscribirse</button>
            </li>
          </ul>
        </div>

        <div className="creditsIcons">
          <ul>
            <li>
              <img src="https://i.imgur.com/AHCoUZO.png" className="img1" />
            </li>
            <li>
              <img src="https://i.imgur.com/JZRipBg.png" className="img2" />
            </li>
            <li>
              <img src="https://i.imgur.com/l8OAGyo.png" className="img3" />
            </li>
            <li>
              <img src="https://i.imgur.com/IDHC2iv.png" className="img4" />
            </li>
          </ul>
        </div>

        <div className="paragraphFooter">
          <p>Copyright ©2021 All rights reserved by Pedro M. Toribio</p>
          {/* <Link to="">Abdessamad bourhjoul</Link>
          <Link to="">Soufian zaam</Link>
          <Link to="">Souhail ouabou</Link> */}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
