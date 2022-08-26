import React from 'react';
import { Button } from 'react-bootstrap';

const ItemProducto = ({producto}) => {
    const{nombreProducto, id, categoria, imagen, precio} = {...producto}
    return (
        <tr>
            <td>{id}</td>
            {/* <td>{props.producto.nombreProducto}</td> */}
            <td>{nombreProducto}</td>
            <td>${precio}</td>
            <td>{imagen}</td>
            <td>{categoria}</td>
            <td>
                <Button variant='warning'>Editar</Button>
                <Button variant='danger'>Borrar</Button>
            </td>
          </tr>
    );
};

export default ItemProducto;