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

}

export default Home;