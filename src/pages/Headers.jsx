/* eslint-disable react/prop-types */
import { useState } from 'react';
import Swal from 'sweetalert2';
import "./styles/pedidos.css"
import pruebaApi from '../api/pruebaApi';

export const Headers = ({
	allProducts,
	setAllProducts,
	total,
	countProducts,
	setCountProducts,
	setTotal,
}) => {
	const [active, setActive] = useState(false);

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
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, borrar',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				// Si el usuario confirma, borramos los productos
				setAllProducts([]);
				setTotal(0);
				setCountProducts(0);
				Swal.fire(
					'¡Borrado!',
					'El carrito ha sido borrado exitosamente.',
					'success'
				);
			}
		});
	};
	const handleButton = () => {
		const currentUser = JSON.parse(localStorage.getItem('currentUser'));
		const usuario = currentUser._id;
		const menus = allProducts;
		const estado = "pendiente"
		const importeTotal = total;
		const currentDate = new Date();
		const fecha = currentDate.toISOString();
		console.log(usuario)
		console.log(menus)
		console.log(estado)
		console.log(importeTotal)
		console.log(fecha)
		guardarPedidoDB(usuario, fecha, menus, estado, importeTotal)
	};
	const guardarPedidoDB = async (usuario, fecha, menus, estado, importeTotal) => {
		try {
			const resp = await pruebaApi.post('/pedido/nuevoPedido', {
				usuario,
				fecha,
				menus,
				estado,
				importeTotal
			});
			console.log(resp);
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<header className='header-pedidos'>
			<h1 className='title-pedidos'>Menú de Hamburguesas Rapiburger</h1>
			<div className='container-icon'>
				<div
					className='container-cart-icon'
					onClick={() => { setActive(!active); console.log(active) }}
				>
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
					<div className='count-products' >
						<span id='contador-productos'>{countProducts}</span>
					</div>
				</div>
				<div className={`container-cart-products ${active ? 'active' : ''}`} >
					{allProducts.length ? (
						<>
							<div className='row-product'>
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
									Vaciar carrito :(
								</button>
								<button className="btn-clear-all" onClick={handleButton}>
									COMPRAR
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