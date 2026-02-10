'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeProduct } from '@/redux/slices/productSlice';
import moment from 'moment';

export default function ProductTable() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(s => s.products.list);

  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th>Name</th>
          <th>Categories</th>
          <th>Created</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((p: any) => (
          <tr key={p.id} className="border-t">
            <td>{p.name}</td>
            <td>
                <span  className="bg-gray-200 px-2 py-1 mr-1 rounded">
                  {p?.categories}
                </span>
           
            </td>
            <td>{moment(p.createdAt).format('DD-MM-YYYY')}</td>
            <td>
              <button
                className="text-red-500"
                onClick={() => dispatch(removeProduct(p.id))}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
