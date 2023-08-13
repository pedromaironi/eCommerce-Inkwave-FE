import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import avatarRegister from "./img/avatarRegister.svg";
import addUs from "./img/new.svg";
import wave from "./img/wavev.png";
import { Helmet } from "react-helmet";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { IoIosArrowDown } from "react-icons/io";
import HashLoader from "react-spinners/HashLoader";

import {
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("Example");
  const [ShowOrders, setShowOrders] = useState(false);

  const [email, setEmail] = useState("Example");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isEditablename, setisEditablename] = useState(false);
  const [isEditableemail, setisEditableemail] = useState(false);

  const nameinput = useRef(null);
  const emailinput = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const { error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  const { success } = userUpdateProfile;

  const orderMylist = useSelector((state) => state.orderMylist);

  const { loading: loadingOrders, error: errorOrders, orders } = orderMylist;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.nombre) {
        // Check if user or user.nombre is undefined
        dispatch(getUserDetails(userInfo.id));
        dispatch(listMyOrders());
      } else {
        setName(user.nombre);
        setEmail(user.correo_electronico);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(updateUserProfile({ id: user.id, name, email, password }));
    }
  };
  const inputs = document.querySelectorAll(".inputa");

  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value === "") {
      parent.classList.remove("focus");
    }
  }

  const nameinputfocus = () => {
    setisEditablename(!isEditablename);
    if (isEditablename) {
      nameinput.current.focus();
    } else {
    }
  };

  inputs.forEach((inputa) => {
    inputa.addEventListener("focus", addcl);
    inputa.addEventListener("blur", remcl);
  });
  const handelshow = () => {};

  return (
    <div className="registerSc">
      <Helmet>
        <title>Perfil</title>
      </Helmet>
      <Image className="wave" src={wave} />
      <div className="containera">
        <div className="imga">
          <Image src={addUs} />
        </div>
        <div className="rightinfos">
          <div className="showbtn" onClick={() => setShowOrders(!ShowOrders)}>
            {ShowOrders ? "Mostrar mi informacion" : "Mostrar mis ordenes"}{" "}
            <IoIosArrowDown />
          </div>
          <>
            {!ShowOrders ? (
              <div className="login-content">
                <form onSubmit={submitHandler}>
                  <Image src={avatarRegister} />
                  {error && <h4>{error}</h4>}
                  {success && <h4>Profile Updated</h4>}

                  <div className="input-div zz">
                    <div className="i">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="div">
                      <input
                        type="text"
                        value={name}
                        readOnly={isEditablename}
                        ref={nameinput}
                        className="inputa"
                        placeholder="Nombre..."
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-div one">
                    <div className="i">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="div">
                      <input
                        type="text"
                        value={email}
                        readOnly={isEditableemail}
                        ref={emailinput}
                        className="inputa"
                        placeholder="Correo electronico..."
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-div pass">
                    <div className="i">
                      <i className="fas fa-lock"></i>
                    </div>
                    <div className="div">
                      <input
                        type="password"
                        value={password}
                        required
                        className="inputa"
                        placeholder="Password..."
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-div pass">
                    <div className="i">
                      <i className="fas fa-lock"></i>
                    </div>
                    <div className="div">
                      <input
                        type="password"
                        value={confirmPassword}
                        className="inputa"
                        placeholder="Confirm password..."
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  {message && <h4 className="Message">{message}</h4>}
                  <input type="submit" className="btna2" value="Update" />
                </form>
              </div>
            ) : (
              <div className="tableorder">
                {loadingOrders ? (
                  <div className="loading">
                    <HashLoader
                      color={"#fff"}
                      loading={loadingOrders}
                      size={40}
                    />
                  </div>
                ) : errorOrders ? (
                  <h1>{errorOrders}</h1>
                ) : (
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>#</Th>
                        <Th>Fecha</Th>
                        <Th>Total</Th>
                        <Th>Pagado</Th>
                        <Th>Entregado</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {orders
                        .slice(
                          (currentPage - 1) * ordersPerPage,
                          currentPage * ordersPerPage
                        )
                        .map((order, index) => (
                          <Tr key={index}>
                            <Td>{order.id_orden}</Td>
                            <Td>{order.fecha.substring(0, 10)}</Td>
                            <Td>{order.total}</Td>
                            <Td>
                              {true
                                ? order.fecha.substring(0, 10)
                                : "Not Paid Yet"}
                            </Td>
                            <Td>
                              {true ? order.fecha.substring(0, 10) : "Not Yet"}
                            </Td>
                            <Td>
                              <Link to={`/order/${order.id_orden}`}>
                                <Button size="xs">Detalles</Button>
                              </Link>
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                )}
                <div className="pagination">
                  {Array.from({
                    length: Math.ceil(orders.length / ordersPerPage),
                  }).map((item, index) => (
                    <span
                      key={index}
                      className={`pagination-item ${
                        index + 1 === currentPage ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
