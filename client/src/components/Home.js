import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Table, InputGroup, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "../App.css";

function Home() {
  const [products, setProducts] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("scrumMaster");
  const [totalProduct, setTotalProduct] = useState(0);

  const navigate = useNavigate();

  const getProducts = () => {
    axios
      .get("http://localhost:3000/api/product")
      .then((result) => {
        setProducts(result.data);
        setTotalProduct(Object.keys(result.data).length);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/product/delete/${id}`, { id })
      .then((result) => {
        //  remove the deleted product from the list
        const temp = {...products};
        delete temp[result.data];
        setProducts(temp);
        setTotalProduct(Object.keys(temp).length);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };


  // When App initially loads, fetch data and store in state
  useEffect(() => {
    getProducts();
  }, []);

  // If search is empty it shows all products else it will update search
  useEffect(() => {
    if (search === "") {
      getProducts();
    } else {
      axios
        .post("http://localhost:3000/api/product/search", {
          filter,
          search,
        })
        .then((result) => {
          setProducts(result.data);
          setTotalProduct(Object.keys(result.data).length);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [filter, search]);

  const productsTable = Object.entries(products).map((product) => (
    <tr key={product[0]}>
      <td className="text-center">{product[0]}</td>
      <td className="text-center">{product[1].productName}</td>
      <td className="text-center">{product[1].productOwnerName}</td>
      <td className="text-center">{product[1].developers.join(", ")}</td>
      <td className="text-center">{product[1].scrumMasterName}</td>
      <td className="text-center">
        {new Date(product[1].startDate).toLocaleDateString()}
      </td>
      <td className="text-center">{product[1].methodology}</td>
      <td className="text-center">
        <Button
          onClick={() => {
            navigate("/edit", { replace: true, state: { productId: product[0], product: product[1] } });
          }}
        >
          Edit
        </Button>
        &nbsp;
        <Button onClick={() => handleDelete(product[0])}>Delete</Button>
      </td>
    </tr>
  ));

  return (
    <div>
      <NavBar />
      <Container>
        <h1 className="title">BC Services</h1>
        <div>Total Products: {totalProduct}</div>
        <InputGroup>
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="scrumMaster">Scrum Master</option>
            <option value="developer">Developer</option>
          </select>
        </InputGroup>
        <Table striped bordered hover>
          <thead>
            <tr>
            <th className="text-center">Product Number</th>
              <th className="text-center">Product Name</th>
              <th className="text-center">Product Owner</th>
              <th className="text-center">Developer(s)</th>
              <th className="text-center">Scrum Master</th>
              <th className="text-center">Start Date</th>
              <th className="text-center">Methodology</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>{productsTable}</tbody>
        </Table>
        <br />
        <Button
          onClick={() => navigate("/create")}
          className="col-md-12 text-center"
        >
          Create
        </Button>
      </Container>
    </div>
  );
}

export default Home;