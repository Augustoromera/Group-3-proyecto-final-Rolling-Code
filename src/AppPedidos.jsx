import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Headers } from './pages/Headers';
import { ProductList } from './pages/ProductList';
import Header from './components/Header';
import { Footer } from './components/Footer';


function AppPedidos() {
	const [allProducts, setAllProducts] = useState([]);
	const [listMenus, setListMenus] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);

	return (
		<>
			<Header />
			<Headers
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
			/>
			<ProductList
				listMenus={listMenus}
				setListMenus={setListMenus}
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
			/>
			<Footer></Footer>
		</>
	)
}


export default AppPedidos;
