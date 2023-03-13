import React from 'react';
import { PRODUCTS } from '../../Products';
import { Product } from './Product';
import './Shop.scss';

export const Shop = () => {
  return (
    <div className="shop">
      <div className='shop-title'>
        <h1>Circle's shop</h1>
      </div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>
  );
};