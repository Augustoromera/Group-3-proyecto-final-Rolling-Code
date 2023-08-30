import { useEffect } from 'react';
import Swal from 'sweetalert2';
import "./styles/pedidos.css"
import pruebaApi from '../api/pruebaApi';
import './styles/pedidos.css';

export const ProductList = ({
  listMenus,
  setListMenus,
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const onAddProduct = product => {
    const existingProduct = allProducts.find(item => item._id === product._id);
    if (existingProduct) {
      const updatedProducts = allProducts.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setTotal(total + product.precio);
      setCountProducts(countProducts + 1);
      setAllProducts(updatedProducts);
    } else {
      const newProduct = { ...product, quantity: 1 };
      setTotal(total + newProduct.precio);
      setCountProducts(countProducts + 1);
      setAllProducts([...allProducts, newProduct]);
    }
    
    Swal.fire({
      icon: 'success',
      title: 'Añadido al carrito exitosamente',
      showConfirmButton: false,
      timer: 1500
    });
  };

  const cargarProductoDB = async () => {
    try {
      const resp = await pruebaApi.get('/admin/listarMenu');
      const productsWithQuantity = resp.data.menus.map(product => ({
        ...product,
        quantity: 1 
      }));
      setListMenus(productsWithQuantity);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarProductoDB();
  }, []);

  return (
    <div className='body-pedidos'>
      <p className='description-pedidos'>Explora nuestra selección de deliciosas hamburguesas argentinas y disfruta de su sabor auténtico.</p>
      <div className='container-items product-list-container'>
        {listMenus.map((product, index) => (
          <div className={`item ${product.estado === 'No Disponible' ? 'unavailable my-item' : 'my-item'}`} key={index}>
            <figure>
              <img src={product.imagen} alt={product.nombre} />
            </figure>
            <div className='info-product d-flex'>
              <h2>{product.nombre}</h2>
              <p className='category'>{product.categoria}</p>
              <p className='details'>{product.detalle}</p>
              <p className='price'>${product.precio}</p>
              {product.estado === 'No Disponible' ? (
                <p className='unavailable-text'>Disculpa, este producto no está disponible.</p>
              ) : (
                <button className='add-to-cart-button' onClick={() => onAddProduct(product)}>
                  Añadir al carrito
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};