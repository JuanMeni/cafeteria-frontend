import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { cantidadCaracteres, validarPrecio } from "./helpers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CrearProducto = () => {
  // crear state y coincidir con los nombres del json server

  const [nombreProducto, setNombreProducto] = useState("");
  const [precio, setPrecio] = useState(0);
  const [imagen, setImagen] = useState("");
  const [categoria, setCategoria] = useState("");
  const [msjError, setMsjError] = useState(false);
  // variable de entorno con la direccion de nuestra API
  const URL = process.env.REACT_APP_API_CAFETERIA;
  // inicializar el hook useNavigate
  const navegacion = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    // validar los datos
    if (cantidadCaracteres(nombreProducto) && validarPrecio(precio)) {
      setMsjError(false);
      // crear un objeto
      const nuevoProducto={
        // si el nombre de la variable es el mismo, solo con poner un nombre y la "," bastara
        nombreProducto,
        precio,
        imagen,
        categoria
      }
      console.log(nuevoProducto);
      // enviar peticion a json server (API) create
      try {
        const repuesta = await fetch(URL, {
          method:'POST',
          headers:{
            "Content-type":"application/json"
          },
          body: JSON.stringify(nuevoProducto)
        })
        if(repuesta.status === 201){
          // mostramos un msj al usuario que se agrego el producto
          Swal.fire(
            'Producto creado!',
            'El producto fue creado exitosamente!',
            'success'
          );
          // redireccionar a la pagina de administrar
          navegacion('/administrar');
        }

        console.log(repuesta);


      } catch (error) {
        console.log(error)
        // mostrar un msj al usuario
      }
    } else {
      setMsjError(true);
    }
  };

  return (
    <section className="container mb-3">
      <h1 className="display-4 mt-5">Nuevo producto</h1>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNombreProdcuto">
          <Form.Label>Nombre producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe"
            onChange={(e) => setNombreProducto(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            onChange={(e) => setPrecio(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/foto/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
            onChange={(e) => setImagen(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Categoria*</Form.Label>
          <Form.Select onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Seleccione una opcion</option>
            <option value="bebida-caliente">Bebida caliente</option>
            <option value="bebida-fria">Bebida fria</option>
            <option value="dulce">Dulce</option>
            <option value="salado">Salado</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
      {/* mostrar alert cuando no se cumple la validaciones */}
      {msjError ? (
        <Alert variant="danger" className="mt-4">
          Debe corregir los datos.
        </Alert>
      ) : null}
    </section>
  );
};

export default CrearProducto;
