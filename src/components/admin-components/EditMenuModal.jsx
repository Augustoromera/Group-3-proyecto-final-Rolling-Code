/* eslint-disable react/prop-types */
// EditMenuModal.js
import React from 'react';
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const EditMenuModal = ({ isOpen, setIsOpen, handleChangeFormEditar, handleSubmitFormEditar, formDateEditar }) => {
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(3px)',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            maxWidth: '600px',
            border: 'none',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            padding: '20px',
            borderRadius: '8px',
            background: 'white',
        },
    };
    return (
        <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles} onRequestClose={() => setIsOpen(false)}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Editar un menu</h2>
                    <button type="button" className="btn-close m-3" onClick={() => setIsOpen(false)}></button>
                </div>
                <div className="modal-body">
                    <Form onSubmit={handleSubmitFormEditar}>
                        <Form.Group className="mb-3 ctm-form-group" controlId="formBasicNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                minLength="3"
                                maxLength="30"
                                value={formDateEditar.nombre}
                                onChange={(e)=>handleChangeFormEditar(e)}
                                placeholder="Ingrese el nombre"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 ctm-form-group" controlId="formBasicPrecio" >
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="precio"
                                min="1"
                                max="9999"
                                value={formDateEditar.precio}
                                onChange={(e)=>handleChangeFormEditar(e)}
                                placeholder='Ingrese el precio'
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 ctm-form-group" controlId="formBasicCategoria">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select
                                name="categoria"
                                value={formDateEditar.categoria}
                                onChange={(e)=>handleChangeFormEditar(e)}
                                style={{ width: '100%' }}
                                required
                            >
                                <option value="">Seleccionar</option>
                                <option value="clasica">Clásica</option>
                                <option value="gourmet">Gourmet</option>
                                <option value="cerdo">Cerdo</option>
                                <option value="vegetariana">Vegetariana</option>
                                <option value="vegana">Vegana</option>
                                <option value="choripán">Choripán</option>
                                <option value="parrillera">Parrillera</option>
                                <option value="provoleta">Provoleta</option>
                                <option value="milanesa">Milanesa</option>

                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEstado">

                            <Form.Check
                                type="checkbox"
                                name="estado"
                                label="Disponible"
                                checked={formDateEditar.estado === "Disponible"}
                                onChange={(e)=>handleChangeFormEditar(e)}

                            />
                        </Form.Group>
                        <Form.Group className="mb-3 ctm-form-group" controlId="formBasicImagen">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control
                                type="text"
                                name="imagen"
                                placeholder="URL de la imagen"
                                value={formDateEditar.imagen}
                                onChange={(e)=>handleChangeFormEditar(e)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 ctm-form-group" controlId="formBasicDetalle">
                            <Form.Label>Detalle</Form.Label>
                            <textarea
                                name="detalle"
                                className="form-control"
                                rows="3"
                                minLength="3"
                                maxLength="500"
                                value={formDateEditar.detalle}
                                onChange={(e)=>handleChangeFormEditar(e)}
                                placeholder='Agregue una breve descripcion del producto'
                                required
                            ></textarea>
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button type="submit" variant="success" className="custom-button" >
                                Editar menú
                            </Button>

                        </div>
                    </Form>
                </div>
            </div >
        </Modal >
    );
};

export default EditMenuModal;
