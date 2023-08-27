/* eslint-disable react/prop-types */
// EditMenuModal.js
import React from 'react';
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const EditUserModal = ({ isOpen, setIsOpen, handleChangeFormUserEditar, handleSubmitFormUserEditar, formDateUserEditar }) => {
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
                    <h2 className="modal-title">Editar Usuario</h2>
                    <button type="button" className="btn-close m-3" onClick={() => setIsOpen(false)}></button>
                </div>
                <div className="modal-body">
                    <Form onSubmit={handleSubmitFormUserEditar}>
                        <Form.Group className="mb-3 ctm-form-group" controlId="formBasicName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formDateUserEditar.username}
                                onChange={handleChangeFormUserEditar}
                                placeholder="Ingrese el nombre del producto"
                                minLength="3"
                                maxLength="40"
                                pattern="[A-Za-z\s]+"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 ctm-form-group" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formDateUserEditar.email}
                                onChange={handleChangeFormUserEditar}
                                placeholder="Ingrese el email"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 ctm-form-group" controlId="formBasicRol">
                            <Form.Label>Rol</Form.Label>
                            <Form.Select
                                name="rol"
                                value={formDateUserEditar.role}
                                onChange={handleChangeFormUserEditar}
                                style={{ width: '100%' }}
                            >
                                <option value="">Seleccionar</option>
                                <option value="admin">Administrador</option>
                                <option value="user" >Usuario</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEstado">

                            <Form.Check
                                type="checkbox"
                                name="status"
                                label="Activo"
                                checked={formDateUserEditar.status === "active"}
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
