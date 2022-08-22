import React from "react";
import { Form, Button } from "react-bootstrap";

const CrearProducto = () => {
  return (
    <section className="container">
      <h1 className="display-4 mt-5">Nuevo producto</h1>
      <hr />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNuevo">
          <Form.Label>Email adddsadsadress</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </section>
  );
};

export default CrearProducto;
