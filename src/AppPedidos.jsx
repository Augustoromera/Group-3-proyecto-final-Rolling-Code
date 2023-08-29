import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Headers } from './pages/Headers';
import { ProductList } from './pages/ProductList';
import Header from './components/Header';


function AppPedidos() {
	const [allProducts, setAllProducts] = useState([]);
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
	allProducts={allProducts}
	setAllProducts={setAllProducts}
	total={total}
	setTotal={setTotal}
	countProducts={countProducts}
	setCountProducts={setCountProducts}
	/>
      </>
  )
}


export default AppPedidos;
