import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { listMyOrders } from "../../actions/orderActions";

const HistoryScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const orderMylist = useSelector((state) => state.orderMylist);
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const { loading: loadingOrders, error: errorOrders, orders } = orderMylist;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listMyOrders());
    }
  }, [dispatch, history, userInfo]);

  return (
    <Box p="4">
      <Flex direction="column" align="flex-start" mt="20">
        <Heading
          as="h1"
          size="lg"
          mb="8"
          mx="4"
          mr="4"
          ml="8"
          mt="8"
          textAlign="left"
        >
          Historial de Ordenes
        </Heading>
        {loadingOrders ? (
          <Spinner size="lg" color="blue.500" />
        ) : errorOrders ? (
          <Box color="red.500">Error al cargar las órdenes: {errorOrders}</Box>
        ) : (
          <Table variant="simple" mx="4">
            <Thead>
              <Tr>
                <Th>ID de Orden</Th>
                <Th>Fecha</Th>
                <Th>Total</Th>
                <Th>Estado de Pago</Th>
                <Th>Estado de Entrega</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order.id_orden}>
                  <Td>{order.id_orden}</Td>
                  <Td>{order.fecha.substring(0, 10)}</Td>
                  <Td>${order.total}</Td>
                  <Td>Pagado</Td>
                  <Td>Entregado</Td>
                  <Td>
                    <Link to={`/order/${order.id_orden}`}>
                      <Button colorScheme="teal" size="sm">
                        Ver Detalles
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Flex>
    </Box>
  );
};

export default HistoryScreen;
