import React from 'react';
import { Button } from 'react-bootstrap';

const ItemProducto = () => {
    return (
        <tr>
            <td>1</td>
            <td>Cafe</td>
            <td>$350</td>
            <td>https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1</td>
            <td>Bebida caliente</td>
            <td>
                <Button variant='warning'>Editar</Button>
                <Button variant='danger'>Borrar</Button>
            </td>
          </tr>
    );
};

export default ItemProducto;