import React, { useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  useDeleteProductMutation,
  useGetSellerProductQuery,
  useUpdateProductMutation,
} from '../Redux/ProductRoutes/productApi';
import { toast } from 'react-toastify';
import PlateNumber from '../PlateNumber';
import UpdatePopup from '../components/SellerDashboard/UpdatePopup';
import { useSelector } from 'react-redux';

const MyListing = () => {
  const {language} = useSelector((state)=>state.language);
  const [deleteModal, setDeleteModal] = useState(null);
  const [updateModal, setUpdateModal] = useState(null);
  const [deleteProduct, { isLoading: deleteLoader }] =
    useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const {
    data: sellerProducts,
    isLoading,
    isError,
  } = useGetSellerProductQuery();
  const [formData, setFormData] = useState({
    plateNo: '',
    price: '',
    discountpercent: '',
    availability: 'Active',
  });

  const handleDelete = async (id) => {
    try {
      const resp = await deleteProduct(id).unwrap();
      toast.success(resp?.message);
    } catch (error) {
      console.error(error);
    }
    setDeleteModal(null);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct({
        id: updateModal,
        updatePlate: formData,
      }).unwrap();
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Update failed', error);
      toast.error(error?.data?.message);
    }
    setUpdateModal(null);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error </h1>;

  return (
    <main className='px-2 sm:px-16 mt-12 font-bold relative'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>{language==='eng'?'My Listing':'قائمتي'}</h1>
        <Link to={'/createPlate'}>
          <CiCirclePlus size='40px' className='text-black' />
        </Link>
      </div>
      <div className='flex flex-col gap-4 mt-12'>
        {sellerProducts?.map(
          ({
            _id,
            views,
            plateNo,
            price,
            discountpercent,
            discountedPrice,
            availability,
          }) => (
            <div
              className='border bottom-1 border-black p-4 flex flex-col sm:flex-row justify-between'
              key={_id}
            >
              <div className='flex gap-4'>
                <div className='w-32 sm:w-40'>
                  <PlateNumber plateNo={plateNo} />
                </div>
                <div className='flex flex-col'>
                  <h1>{language==='eng'?'Private Plate :':'لوحة خاصة :'} {plateNo}</h1>
                  <h1>{discountedPrice} Q.T</h1>
                  <h1 className='flex items-center gap-2'>
                    <FaEye />
                    <span>{views} {language==='eng'?'views':'وجهات النظر'}</span>
                  </h1>
                </div>
              </div>
              <div className='flex flex-col items-end justify-end'>
                <div className='flex gap-4 mt-2'>
                  <button
                    disabled={deleteLoader}
                    className='p-2 border border-1 border-black rounded'
                    onClick={() => setDeleteModal(_id)}
                  >
                    {language==='eng'?'Delete':'يمسح'}
                  </button>
                  <button
                    className='p-2 bg-black text-white rounded'
                    onClick={() => {
                      setUpdateModal(_id);
                      setFormData({
                        plateNo,
                        price,
                        discountpercent,
                        availability,
                      });
                    }}
                  >
                    {language==='eng'?'Update':'تحديث'}
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {deleteModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg'>
            <h2 className='text-lg font-bold'>{language==='eng'?'Confirm Delete':'تأكيد الحذف'}</h2>
            <p>{language==='eng'?"Are you sure you want to delete this product?":"هل أنت متأكد أنك تريد حذف هذا المنتج؟"}</p>
            <div className='flex justify-end gap-4 mt-4'>
              <button
                className='px-4 py-2 bg-gray-300 rounded-lg'
                onClick={() => setDeleteModal(null)}
              >
                {language==='eng'?'Cancel':'يلغي'}
              </button>
              <button
                className='px-4 py-2 bg-red-500 text-white rounded-lg'
                onClick={() => handleDelete(deleteModal)}
              >
                {language==='eng'?'Delete':'يمسح'}
              </button>
            </div>
          </div>
        </div>
      )}

      {updateModal && (
        <UpdatePopup
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleUpdateSubmit}
          onClose={() => setUpdateModal(null)}
        />
      )}
    </main>
  );
};

export default MyListing;
