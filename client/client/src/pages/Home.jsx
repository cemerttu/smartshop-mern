import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ProductCard from '../components/ProductCard';

export default function Home(){
  const [products, setProducts] = useState([]);
  useEffect(()=>{ api.get('/products').then(r=>setProducts(r.data)).catch(()=>{}); }, []);
  return <div>{products.map(p => <ProductCard key={p._id} product={p} />)}</div>;
}
