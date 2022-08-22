import React from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ItemProducto from "./ItemProducto";

const AdministrarProducto = () => {
  return (
    <section className="container">
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className="display-4 mt-5">Productos disponibles</h1>
        <Button variant="primary" className='mt-5'>Agregar</Button>
      </div>
      <hr />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Cod.</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>URL de imagen</th>
            <th>Categoria</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {/* aqui hacer un map */}
          <ItemProducto></ItemProducto>
        </tbody>
      </Table>
    </section>
  );
};

export default AdministrarProducto;
