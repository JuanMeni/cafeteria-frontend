import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import './ItemProducto.css';

const ItemProducto = ({ producto, consultarAPI }) => {
  const { nombreProducto, _id, categoria, imagen, precio } = { ...producto };
  const URL = process.env.REACT_APP_API_CAFETERIA;
  const handleDelete = () => {
    Swal.fire({
      title: "¿Esta seguro de borrar este producto?",
      text: "No puede volver este paso atras.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // realizar la peticion para eliminar un producto DELETE
        try {
          const parametros = {
            method: "DELETE",
          };
          const repuesta = await fetch(URL + "/" + _id, parametros);

          if (repuesta.status === 200) {
            Swal.fire(
              "Producto eliminado!",
              "Su producto fue borrado.",
              "success"
            );
            // recargar la tabla de productos
            consultarAPI(); 
          }
        } catch (error) {
          console.log(error);
          // mostrar un msj de error al usuario
        }
      }
    });
  };

  return (
    <tr>
      <td>{_id}</td>
      {/* <td>{props.producto.nombreProducto}</td> */}
      <td>{nombreProducto}</td>
      <td>${precio}</td>
      <td className="truncate">{imagen}</td>
      <td>{categoria}</td>
      <td>
        <Link to={`/administrar/editar/${_id}`} className='btn btn-warning'>Editar</Link>
        <Button variant="danger" className="mx-1" onClick={handleDelete}>
          Borrar
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;
