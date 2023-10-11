/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import "./styles/pedidos.css"
import pruebaApi from '../api/pruebaApi';
import { useAuth } from '../context/AuthContext';
import { getAuthToken } from '../api/auth';

export const Headers = ({
	allProducts,
	setAllProducts,
	total,
	countProducts,
	setCountProducts,
	setTotal,
}) => {
	const [active, setActive] = useState(false);
	const { user } = useAuth();
	const onDeleteProduct = product => {
		const results = allProducts.filter(
			item => item._id !== product._id
		);
		setTotal(total - product.precio * product.quantity);
		setCountProducts(countProducts - product.quantity);
		setAllProducts(results);
	};
	const onCleanCart = () => {
		Swal.fire({
			title: '¿Estás seguro?',
			text: 'Esta acción borrará todos los productos en el carrito',
			icon: 'warning',
			showCancelButton: true,
			background: 'black',
			color: 'white',
			customClass: {
				container: 'custom-swal-container',
				title: 'custom-swal-title',
				content: 'custom-swal-content',
				confirmButton: 'custom-swal-confirm-button',
				cancelButton: 'custom-swal-cancel-button',
			},
			confirmButtonText: 'Sí, borrar',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				setAllProducts([]);
				setTotal(0);
				setCountProducts(0);
				Swal.fire({
					icon: 'success',
					title: 'Carrito borrado',
					text: '¡Puedes volver a hacer tu carrito!',
					showConfirmButton: true,
					timer: 2000,
					background: 'black',
					color: 'white',
					customClass: {
						container: 'custom-swal-container',
						title: 'custom-swal-title',
						content: 'custom-swal-content',
						confirmButton: 'custom-swal-confirm-button',
						cancelButton: 'custom-swal-cancel-button',
					},
				}
				);
			}
		});
	};
	const handleButton = () => {
		const usuario = user.id;
		const menus = allProducts.map(product => product._id);
		const estado = "pendiente"
		const importeTotal = total;
		const currentDate = new Date();
		const fecha = currentDate.toISOString();
		guardarPedidoDB(usuario, fecha, menus, estado, importeTotal)
			.then(() => {
				setAllProducts([]);
				setTotal(0);
				setCountProducts(0);
				setActive(false)
				Swal.fire({
					icon: 'success',
					title: 'Compra confirmada',
					text: '¡Tu compra ha sido confirmada con éxito!',
					showConfirmButton: true,
					timer: 2000,
					background: 'black',
					color: 'white',
					customClass: {
						container: 'custom-swal-container',
						title: 'custom-swal-title',
						content: 'custom-swal-content',
						confirmButton: 'custom-swal-confirm-button',
						cancelButton: 'custom-swal-cancel-button',
					},
					confirmButtonColor: '#FFD700',
					cancelButtonColor: '#FFD700',
					allowOutsideClick: false,

				});
			})
			.catch((error) => {
				console.error('Error al guardar el pedido:', error);
				Swal.fire({
					icon: 'error',
					title: 'Error',
					customClass: {
						container: 'custom-swal-container',
						title: 'custom-swal-title',
						content: 'custom-swal-content',
						confirmButton: 'custom-swal-confirm-button',
						cancelButton: 'custom-swal-cancel-button',
					},
					text: 'Hubo un problema al procesar tu compra. Por favor, inténtalo de nuevo más tarde.',
				});
			});
	};
	const guardarPedidoDB = async (usuario, fecha, menus, estado, importeTotal) => {
		try {
			const resp = await pruebaApi.post('/api/pedidos/nuevoPedido', {
				usuario: usuario,
				fecha: fecha,
				menus: menus,
				estado: estado,
				importeTotal: importeTotal
			}, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${getAuthToken()}`,
					User: JSON.stringify(user),
				},
			});
			console.log(resp);
		} catch (error) {
			console.log(error)
		}
	}
	const handleScroll = () => {
		const scrollY = window.scrollY;
		const windowHeight = window.innerHeight;
		const scrollThreshold = 0.8; // 30% de la página

		if (scrollY > windowHeight * scrollThreshold) {
			setActive(false);
		}
	};
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	return (
		<header className='header-pedidos' id='header-pedidos'>
			<h1 className='title-pedidos text-center'>Menú de Hamburguesas Rapiburger</h1>
			<div className='container-icon'>
				<div
					className='container-cart-icon'
					onClick={() => { setActive(true); }}
				>
					<a href='#header-pedidos'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='icon-cart'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
							/>
						</svg>
					</a>

					<div className='count-products' >
						<span id='contador-productos'>{countProducts}</span>
					</div>
				</div>
				<div className={`container-cart-products pt-5 ${active ? 'active' : ''}`} >
					{allProducts.length ? (
						<>
							<div className='row-product p'>
								<br />
								<h2 className='title-pedido'>Pedido</h2>
								{allProducts.map((product, index) => (
									<div className='cart-product hd-cart' key={index}>
										<div className='info-cart-product'>
											<img
												src={product.imagen}
												alt={product.nombre}
												className='product-image'
											/>
											<p className='titulo-producto-carrito'>
												{product.nombre}
											</p>
											<span className='cantidad-producto-carrito'>
												x{product.quantity}
											</span>
											<span className='precio-producto-carrito'>
												${product.precio}
											</span>
										</div>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='icon-close'
											onClick={() => onDeleteProduct(product)}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									</div>
								))}
							</div>
							<div className='cart-total p'>
								<h3>Total:</h3>

								<span className='total-pagar'>${isNaN(total) ? '0.00' : total}</span>
							</div>

							<div className="cart-buttons">
								<button className='btn-clear-all' onClick={onCleanCart}>
									Vaciar
								</button>
								<button className="btn-clear-all" onClick={handleButton}>
									COMPRAR CARRITO :)
								</button>
								<button className="btn-clear-all" onClick={() => setActive(false)}>
									Ocultar
								</button>
							</div>
						</>

					) : (
						<button className="btn-clear-all closeCart" onClick={() => setActive(false)}>
							Cerrar (Carrito vacío)
						</button>
					)}
				</div>

			</div>

		</header>
	);
};