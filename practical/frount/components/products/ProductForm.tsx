'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addProduct } from '@/redux/slices/productSlice';
import Button from '../common/Button';
import * as Yup from 'yup';

export default function ProductForm() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.categories.list);

  const initialValues = {
    name: '',
    description: '',
    quantity: '',
    categories: [] as string[],
  };

  const handleSubmit = (values: any, { resetForm }: any) => {
    dispatch(addProduct(values));
    resetForm();
  };

  const productSchema = Yup.object({
  name: Yup.string()
    .required('Product name is required')
    .min(3, 'Minimum 3 characters')
    .max(100, 'Maximum 100 characters'),

  description: Yup.string()
    .required('Description is required'),

  quantity: Yup.number()
    .required('Quantity is required')
    .min(0, 'Quantity cannot be negative'),

  categories: Yup.array()
    .min(1, 'Select at least one category')
    .required('Category is required'),
});


  return (
    <div className="bg-white p-4 rounded shadow">
      <Formik
        initialValues={initialValues}
        validationSchema={productSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div className="mb-2">
              <Field
                name="name"
                placeholder="Name"
                className="border p-2 w-full"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-2">
              <Field
                as="textarea"
                name="description"
                placeholder="Description"
                className="border p-2 w-full"
              />
              <ErrorMessage
                name="description"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-2">
              <Field
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="border p-2 w-full"
              />
              <ErrorMessage
                name="quantity"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <select
                multiple
                className="border p-2 w-full"
                onChange={e =>
                  setFieldValue(
                    'categories',
                    Array.from(e.target.selectedOptions).map(
                      option => option.value,
                    ),
                  )
                }
              >
                {categories?.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <ErrorMessage
                name="categories"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              Add Product
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
