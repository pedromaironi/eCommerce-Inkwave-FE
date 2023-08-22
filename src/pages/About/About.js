import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Image } from "@chakra-ui/react";
import HashLoader from "react-spinners/HashLoader";
import "./aboutcss.css";
const About = () => {
  const Line = useRef(null);
  const text = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      Line.current.classList.add("lineon");
      text.current.classList.add("titleon");
    }, 5);

    return () => {};
  }, []);
  return (
    <>
      <Helmet>
        <title>Acerca de nosotros</title>
      </Helmet>

      <div className="headingA">
        <div className="line" ref={Line}></div>
        <h1 className="title" ref={text}>
          Acerca de nosotross
        </h1>
      </div>
      <div className="Content1">
        <div className="text">
          <h1>Por que elegirnos?</h1>
          <p>
            Somos tu destino confiable para todas tus necesidades de moda y
            estilo. Nuestra amplia gama de productos de alta calidad, desde
            prendas de vestir hasta accesorios, está cuidadosamente seleccionada
            para ofrecerte lo último en tendencias y diseño. Nuestra dedicación
            a la calidad y la satisfacción del cliente nos diferencia,
            brindándote una experiencia de compra excepcional y productos que se
            adaptan a tu estilo personal.
          </p>
        </div>

        <div className="imagecontainer">
          <div className="Imageabt">
            <Image
              className="mImage"
              boxSize="400px"
              objectFit="cover"
              src="https://images.unsplash.com/photo-1614771637369-ed94441a651a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
              alt="Segun Adebayo"
            />
          </div>
        </div>
      </div>
      <div className="Content2">
        <div className="imagecontainer">
          <div className="Imageabt">
            <Image
              className="mImage"
              boxSize="400px"
              objectFit="cover"
              src="https://images.unsplash.com/photo-1614038276039-667c23bc32fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=389&q=80"
              alt="Segun Adebayo"
            />
          </div>
        </div>
        <div className="text">
          <h1>Como?</h1>
          <p>
            Nuestra plataforma se basa en la búsqueda constante de la excelencia
            en la moda y la comodidad. Utilizamos tecnología avanzada para
            proporcionarte una navegación fácil y amigable, así como opciones de
            búsqueda y filtrado personalizadas para encontrar rápidamente lo que
            buscas. Además, nuestro equipo de expertos en moda y atención al
            cliente está siempre listo para brindarte asesoramiento y respuestas
            a tus preguntas. Tu experiencia de compra será rápida, segura y
            satisfactoria en todos los aspectos.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
