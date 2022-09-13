import {Form, Button} from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef} from "react";
import { cantidadCaracteres, validarPrecio } from "./helpers";
import Swal from "sweetalert2";

const EditarProducto = () => {
    // traer el parametro
    const {id} = useParams();
    console.log(id)

    const [producto, setProducto] = useState({});
    const URL = process.env.REACT_APP_API_CAFETERIA;
    // referencias
    const nombreProductoRef = useRef("");
    const precioRef = useRef(0);
    const imagenRef = useRef("");
    // navigate
    const navegacion = useNavigate();

    useEffect(()=>{
        consultarAPI();
    },[])

    const consultarAPI = async()=>{
        try {
            const respuesta = await fetch(URL+'/'+id);
            const dato = await respuesta.json()
            setProducto(dato);
        } catch (error) {
            console.log(error)
            // mostrar un msj intuitivo al usuario
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        // validar que todos los cambios son correctos
        if(cantidadCaracteres(nombreProductoRef.current.value) && validarPrecio(precioRef.current.value)){
        // crear un objeto con los datos modificados
        const productoEditar = {
            nombreProducto: nombreProductoRef.current.value,
            precio: precioRef.current.value,
            imagen: imagenRef.current.value,
            categoria: producto.categoria
        }
        console.log(productoEditar);
        // pedir a la API la actualizacion
        try {
            const resp = await fetch(`${URL}/${id}`,{
                method: "PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(productoEditar)
            })
            if(resp.status === 200){
                Swal.fire(
                    'Producto modificado!',
                    'El producto fue modificado exitosamente!',
                    'success'
                  );
            }
        } catch (error) {
            console.log(error)
            // mostrar un msj al usuario
        }
        // redireccionar a la web de administrar
        navegacion('/administrar');
        }else{
            // mostrar un msj de error de validacion de dato al usuario
        }
    }

    return (
        <section className="container mb-3">
      <h1 className="display-4 mt-5">Editar producto</h1>
      <hr />
      <Form onSubmit ={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNombreProdcuto">
          <Form.Label>Nombre producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe"
            defaultValue={producto.nombreProducto}
            ref={nombreProductoRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            defaultValue={producto.precio}
            ref={precioRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/foto/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
            defaultValue={producto.imagen}
            ref={imagenRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Categoria*</Form.Label>
          <Form.Select value={producto.categoria} onChange={e=>setProducto({...producto,categoria: e.target.value})}>
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
      {/* {msjError ? (
        <Alert variant="danger" className="mt-4">
          Debe corregir los datos.
        </Alert>
      ) : null} */}
    </section>
    );
};

export default EditarProducto;