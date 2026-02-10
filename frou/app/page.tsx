'use client';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProducts } from '@/redux/slices/productSlice';
import { fetchCategories } from '@/redux/slices/categorySlice';
import ProductForm from '@/components/products/ProductForm';
import ProductTable from '@/components/products/ProductTable';
import Pagination from '@/components/common/Pagination';

export default function Page() {
  const dispatch = useAppDispatch();
  const { total } = useAppSelector(s => s.products);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts({ page }));
  }, [page]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <ProductForm />
      <ProductTable />
      <Pagination page={page} total={total} onChange={setPage} />
    </div>
  );
}
