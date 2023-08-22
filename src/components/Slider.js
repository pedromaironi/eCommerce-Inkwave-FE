import { React, useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import ShopNowBtn from "./ShopNowBtn";
const Slider = () => {
  const SliderData = [
    {
      title: "Chaquetas y Abrigos",
      subtitle: "La calidad importa",
    },
    {
      title: "Encuentra el mejor atuendo",
      subtitle: "Con 30% de descuento",
    },
    {
      title: "Los mejores zapatos",
      subtitle: "Comodidad para tu largo día",
    },
    {
      title: "La proxima temporada esta aqui!",
      subtitle: "Disfruta de tu verano con nosotros",
    },
  ];
  const [current, setCurrent] = useState(0);
  const length = SliderData.length;
  const [auto, setauto] = useState(true);
  const intervaltime = 6000;
  let slideinterval;
  const nextslide = () => {
    clearInterval(slideinterval);
    slideinterval = setInterval(nextslide, intervaltime);
    setTimeout(() => setCurrent(current === length - 1 ? 0 : current + 1));
  };
  const prevslide = () => {
    clearInterval(slideinterval);
    slideinterval = setInterval(nextslide, intervaltime);
    setTimeout(() => setCurrent(current === 0 ? length - 1 : current - 1));
  };
  useEffect(() => {
    setauto(true);
    if (auto) {
      slideinterval = setInterval(nextslide, intervaltime);
    }
    return () => {
      setauto(false);
      clearInterval(slideinterval);
    };
  });

  return (
    <div className="slider">
      {SliderData.map((slide, index) => {
        return (
          <div
            key={index}
            className={index === current ? "slide current" : "slide"}
          >
            <h1 className="titleslider">{slide.title}</h1>
            <h3 className="subtitleslider">{slide.subtitle}</h3>
            <div className="content">
              {" "}
              <Link to="/Shop">
                {" "}
                <ShopNowBtn />
              </Link>{" "}
            </div>
          </div>
        );
      })}
      <IoIosArrowForward className="next" size="32" onClick={nextslide} />
      <IoIosArrowBack className="prev" size="32" onClick={prevslide} />
    </div>
  );
};

export default Slider;
