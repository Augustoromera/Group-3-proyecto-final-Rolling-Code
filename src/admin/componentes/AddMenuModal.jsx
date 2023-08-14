/* eslint-disable react/prop-types */
// AddMenuModal.js
import React from 'react';
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// eslint-disable-next-line react/prop-types
const AddMenuModal = ({ isOpen, setIsOpen, onRequestClose, handleChangeForm, handleSubmitForm, formDate }) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    return (
        <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles} onRequestClose={onRequestClose}>
        <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Agregar producto</h2>
                    <button type="button" className="btn-close m-3" onClick={() => setIsOpen(false)}></button>
                </div>
                <div className="modal-body">
                    <Form onSubmit={handleSubmitForm}>
                        <Form.Group className="mb-3" controlId="formBasicNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formDate.nombre}
                                onChange={handleChangeForm}
                                placeholder="Ingrese el nombre del producto"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPrecio">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="precio"
                                value={formDate.precio}
                                onChange={handleChangeForm}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCategoria">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select
                                name="categoria"
                                value={formDate.categoria}
                                onChange={handleChangeForm}
                                style={{ width: '100%' }}
                                required
                            >
                                <option value="">Seleccionar</option>
                                <option value="parrilla">Parrilla</option>
                                <option value="empanadas">Empanadas</option>
                                <option value="milanesas">Milanesas</option>
                                <option value="pastas">Pastas</option>
                                <option value="asado">Asado</option>
                                <option value="pizzas">Pizzas</option>
                                <option value="empanadas">Empanadas</option>
                                <option value="comida criolla">Comida Criolla</option>
                                <option value="mariscos">Mariscos</option>
                                <option value="comida vegetariana">Comida Vegetariana</option>
                                <option value="comida vegana">Comida Vegana</option>
                                <option value="comida regional">Comida Regional</option>
                                <option value="postres argentinos">Postres Argentinos</option>
                                <option value="vinos argentinos">Vinos Argentinos</option>

                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEstado">

                            <Form.Check
                                type="checkbox"
                                name="estado"
                                label="Disponible"
                                checked={formDate.activo}
                                onChange={handleChangeForm}

                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDetalle">
                            <Form.Label>Detalle</Form.Label>
                            <textarea
                                name="detalle"
                                className="form-control"
                                rows="3"
                                value={formDate.detalle}
                                onChange={handleChangeForm}
                                required
                            ></textarea>
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button type="submit" variant="success" className="custom-button" >
                                Dar de alta
                            </Button>

                        </div>
                    </Form>
                </div>
            </div >
        </Modal >
    );
};

export default AddMenuModal;
