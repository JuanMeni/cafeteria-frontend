import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ItemProducto from "./ItemProducto";

const AdministrarProducto = () => {

  const URL = process.env.REACT_APP_API_CAFETERIA;
  console.log(URL);
  const[productos, setProductos] = useState([]);

  useEffect(()=>{
    consultarAPI();
  },[])

  const consultarAPI = async()=>{
    // peticion get
    try{
      // codigo que quiero ejecutar
      const repuesta = await fetch(URL);
      const listaProductos = await repuesta.json();
      setProductos(listaProductos);
    }catch(error){
      console.log(error);
      // agregar un msj para el usuario (ej. un alert) que espere o algo asi
    }
  }

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
          {
            productos.map((producto)=><ItemProducto key={producto.id} producto={producto}></ItemProducto>)
          }
          <ItemProducto></ItemProducto>
        </tbody>
      </Table>
    </section>
  );
};

export default AdministrarProducto;
