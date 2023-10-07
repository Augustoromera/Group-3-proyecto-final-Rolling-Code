/* eslint-disable react/prop-types */
// AddMenuModal.js
import React from 'react';
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// eslint-disable-next-line react/prop-types
const AddUserModal = ({ isOpen, setIsOpen, onRequestClose, handleChangeFormUser, handleSubmitFormUser, formDateUser }) => {
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)' ,
            backdropFilter: 'blur(3px)',
        },
    };
    return (
        <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}  className="custom-modal" onRequestClose={onRequestClose}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Agregar un usuario</h2>
                    <button type="button" className="btn-close m-3 bg-warning p-1" onClick={() => setIsOpen(false)}></button>
                </div>
                <div className="modal-body justify-content-center">
                    <Form onSubmit={handleSubmitFormUser}>
                        <div className="row justify-content-center">
                            <Form.Group className="mb-3 ctm-form-group" controlId="formBasicName">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    onChange={(e) => handleChangeFormUser(e)}
                                    minLength="3"
                                    maxLength="40"
                                    pattern="[A-Za-z\s]+"
                                    placeholder="Ingrese el nombre completo"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 ctm-form-group" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    onChange={(e) => handleChangeFormUser(e)}
                                    placeholder="Ingrese el email"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 ctm-form-group" controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    minLength="8"
                                    maxLength="12"
                                    placeholder="Ingrese la contraseña"
                                    onChange={(e) => handleChangeFormUser(e)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 ctm-form-group" controlId="formBasicRol">
                                <Form.Label></Form.Label>
                                <Form.Select
                                    name="role"
                                    onChange={(e) => handleChangeFormUser(e)}
                                    style={{ width: '100%' }}
                                >
                                    <option value="">Seleccionar Rol</option>
                                    <option value="admin">Administrador</option>
                                    <option value="user" >Usuario</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3 ctm-form-group" controlId="formBasicEstado">
                                <Form.Check
                                    type="checkbox"
                                    name="status"
                                    label="Activo"
                                    checked={formDateUser.status === "active"}
                                    onChange={(e) => handleChangeFormUser(e)}
                                />
                            </Form.Group>
                        </div>

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

export default AddUserModal;
