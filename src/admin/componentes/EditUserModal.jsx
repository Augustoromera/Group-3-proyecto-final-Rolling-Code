/* eslint-disable react/prop-types */
// EditMenuModal.js
import React from 'react';
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const EditUserModal = ({ isOpen, setIsOpen, handleChangeFormUserEditar, handleSubmitFormUserEditar, formDateUserEditar }) => {
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
        <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles} onRequestClose={() => setIsOpen(false)}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Editar producto</h2>
                    <button type="button" className="btn-close m-3" onClick={() => setIsOpen(false)}></button>
                </div>
                <div className="modal-body">
                    <Form onSubmit={handleSubmitFormUserEditar}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formDateUserEditar.name}
                                onChange={handleChangeFormUserEditar}
                                placeholder="Ingrese el nombre del producto"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formDateUserEditar.email}
                                onChange={handleChangeFormUserEditar}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicRol">
                            <Form.Label>Rol</Form.Label>
                            <Form.Select
                                name="rol"
                                value={formDateUserEditar.rol}
                                onChange={handleChangeFormUserEditar}
                                required
                            >
                                <option value="">Seleccionar</option>
                                <option value="admin">Administrador</option>
                                <option value="user" >Usuario</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEstado">

                            <Form.Check
                                type="checkbox"
                                name="estado"
                                label="Activo"
                                checked={formDateUserEditar.estado === "Activo"}
                                onChange={handleChangeFormUserEditar}

                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button type="submit" variant="success" className="custom-button" >
                                Editar Usuario
                            </Button>

                        </div>
                    </Form>
                </div>
            </div >
        </Modal >
    );
};

export default EditUserModal;
