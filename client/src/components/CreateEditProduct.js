import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";

export default function CreateEditProduct() {
  // Using hooks to initialize state
  const location = useLocation();
  const navigate = useNavigate();

  const [productName, setProductName] = useState(
    location.state?.product?.productName || ""
  );
  const [productNameError, setProductNameError] = useState("");

  const [productOwnerName, setProductOwnerName] = useState(
    location.state?.product?.productOwnerName || ""
  );
  const [productOwnerNameError, setProductOwnerNameError] = useState("");

  const [developers, setDevelopers] = useState(
    location.state?.product?.developers || []
  );

  const [developersError, setDevelopersError] = useState("");

  const [scrumMasterName, setScrumMasterName] = useState(
    location.state?.product?.scrumMasterName || ""
  );
  const [scrumMasterNameError, setScrumMasterNameError] = useState("");

  const [startDate, setStartDate] = useState("");

  const [startDateError, setStartDateError] = useState("");

  const [methodology, setMethodology] = useState(
    location.state?.product?.methodology || "Agile"
  );

  // Updating the developers array with new names
  const handleDevelopers = (name, index) => {
    const temp = [...developers];
    temp[index] = name;
    setDevelopers(temp);
  };

  // Reset error messages when the form is submitted
  const resetError = () => {
    setProductNameError("");
    setProductOwnerNameError("");
    setDevelopersError("");
    setScrumMasterNameError("");
    setStartDateError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetError();

    // Checking if required fields are empty and setting appropriate error messages
    if (!productName) {
      setProductNameError("Product Name - Required");
    }

    if (!productOwnerName) {
      setProductOwnerNameError("Product Owner Name - Required");
    }

    if (!developers[0]) {
      setDevelopersError("Developer Name - Required");
    }

    if (!startDate) {
      setStartDateError("Start Date - Required");
    }

    if (!scrumMasterName) {
      setScrumMasterNameError("Scrum Master Name - Required");
    }

    // If any required fields are empty, return without submitting form for edit
    if (
      location.state &&
      (!productName || !productOwnerName || !developers[0] || !scrumMasterName)
    ) {
      return;
    }

    // If any required fields are empty, return without submitting form for create
    if (
      !location.state &&
      (!productName ||
        !productOwnerName ||
        !developers[0] ||
        !scrumMasterName ||
        !startDate)
    ) {
      return;
    }

    // organizing data in an object
    if (location.state) {
      const updateProduct = {
        productId: location.state?.product?.productId,
        productName: productName,
        productOwnerName: productOwnerName,
        developers: developers.filter((developer) => developer !== ""),
        scrumMasterName: scrumMasterName,
        methodology,
      };

      axios
        .put(
          `http://localhost:3000/api/product/${location.state?.productId}`,
          updateProduct
        )
        .then((result) => {
          // Return back to home page if successful
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      // organizing data in an object
      const newProduct = {
        productName,
        productOwnerName,
        developers,
        scrumMasterName,
        startDate,
        methodology,
      };

      axios
        .post("http://localhost:3000/api/product", newProduct)
        .then((result) => {
          // Return back to home page if successful
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      <NavBar />
      <Form>
        <Form.Group controlId="formProductName">
          <Form.Control
            isInvalid={productNameError}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            required
            type="text"
            value={productName}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {productNameError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formProductOwnerName">
          <Form.Control
            isInvalid={productOwnerNameError}
            onChange={(e) => setProductOwnerName(e.target.value)}
            placeholder="Product Owner Name"
            required
            type="text"
            value={productOwnerName}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {productOwnerNameError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="developers" controlId="formDevelopers">
          <Form.Control
            isInvalid={developersError}
            onChange={(e) => {
              handleDevelopers(e.target.value, 0);
            }}
            placeholder="Developer Name"
            required
            type="text"
            value={developers[0]}
          ></Form.Control>
          <Form.Control
            onChange={(e) => {
              handleDevelopers(e.target.value, 1);
            }}
            placeholder="Developer Name"
            type="text"
            value={developers[1]}
          ></Form.Control>
          <Form.Control
            onChange={(e) => {
              handleDevelopers(e.target.value, 2);
            }}
            placeholder="Developer Name"
            type="text"
            value={developers[2]}
          ></Form.Control>
          <Form.Control
            onChange={(e) => {
              handleDevelopers(e.target.value, 3);
            }}
            placeholder="Developer Name"
            type="text"
            value={developers[3]}
          ></Form.Control>
          <Form.Control
            onChange={(e) => {
              handleDevelopers(e.target.value, 4);
            }}
            placeholder="Developer Name"
            type="text"
            value={developers[4]}
          ></Form.Control>
        </Form.Group>
        <Form.Control.Feedback
          type="invalid"
          style={{ display: developersError ? "block" : "none" }}
        >
          {developersError}
        </Form.Control.Feedback>
        <Form.Group controlId="formScrumMasterName">
          <Form.Control
            isInvalid={scrumMasterNameError}
            onChange={(e) => setScrumMasterName(e.target.value)}
            placeholder="Scrum Master Name"
            required
            type="text"
            value={scrumMasterName}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {scrumMasterNameError}
          </Form.Control.Feedback>
        </Form.Group>
        {location.state?.product?.startDate ? null : (
          <Form.Group controlId="formStartDate">
            <Form.Control
              isInvalid={startDateError}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
              required
              type="Date"
            ></Form.Control>
          </Form.Group>
        )}
        <Form.Group controlId="formMethodology">
          <Form.Select
            onChange={(e) => setMethodology(e.target.value)}
            value={methodology}
          >
            <option value={"Agile"}>Agile</option>
            <option value={"Waterfall"}>Waterfall</option>
          </Form.Select>
        </Form.Group>
        <Button
          className="col-md-12 text-center"
          onClick={(e) => handleSubmit(e)}
          type="submit"
        >
          {location.state ? "Update" : "Create"}
        </Button>
      </Form>
    </div>
  );
}
