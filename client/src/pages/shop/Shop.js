import React from 'react';
import { PRODUCTS } from '../../Products';
import { Product } from './Product';
import './Shop.scss';

export const Shop = () => {
  return (
    <div className="shop">
      <div className='shop-title'>
        <h2>Circle's shop</h2>
      </div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};