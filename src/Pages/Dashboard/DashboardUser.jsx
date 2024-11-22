import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserProfileMutation,
} from '../../Redux/userRoutes/userApi';
import { toast } from 'react-toastify';

const DashboardUser = () => {
  //api fetching
  const { data: AllUsers } = useGetAllUsersQuery();

  const users = AllUsers?.users;
  const [loadProduct, setLoadProduct] = useState(6);

  const comingData = users?.slice(0, loadProduct);
  console.log('prodct', comingData);
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  // states used
  const [editUser, setEditUser] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openEditModal = (user) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };
  const handleEditSave = async () => {
    try {
      const response = await updateUserProfile({
        id: editUser?._id,
        updatedUserData: {
          name: editUser?.name,
          email: editUser?.email,
          role: editUser?.role,
        },
      }).unwrap();

      if (response?.message) {
        toast.success(response.message);
        setIsEditModalOpen(false);
        console.log('res', response);
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update user profile');
    }
  };

  // Function to open delete confirmation modal
  const openDeleteModal = (id) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  // Function to delete the user
  const handleDeleteUser = async () => {
    try {
      console.log('check id', selectedId);
      const res = await deleteUser({ id: selectedId }).unwrap();
      toast.success(res?.message);
    } catch (error) {
      console.log(error?.data?.message);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className='w-[82%] mx-auto'>
      <h1 className='text-xl font-semibold mb-4 lg:text-left text-center'>
        Users
      </h1>
      <div className='overflow-x-auto'>
        <div className='min-w-[500px] bg-white rounded-3xl shadow-lg overflow-hidden p-2'>
          {/* Header */}
          <div className='grid grid-cols-5 bg-gray-100 rounded-xl border-[1px] border-black'>
            <div className='p-4 font-medium'>User ID</div>
            <div className='p-4 font-medium'>Name</div>
            <div className='p-4 font-medium'>Email</div>
            <div className='p-4 font-medium'>Role</div>
            <div className='p-4 font-medium'>Actions</div>
          </div>

          {/* User Rows */}
          <div className='divide-y divide-gray-200'>
            {comingData?.map((user, index) => (
              <div
                key={user._id}
                className='grid grid-cols-5 items-center bg-white hover:bg-gray-50'
              >
                <div className='p-4 text-gray-700'>{index + 1}</div>

                <div className='p-4 text-gray-700'>{user?.name}</div>
                <div className='p-4 text-gray-700 break-words'>
                  {user?.email}
                </div>
                <div className='p-4 text-gray-700'>{user?.role}</div>
                <div className='p-4 flex space-x-2  justify-end'>
                  <button
                    className='text-gray-600 hover:text-gray-800'
                    onClick={() => openEditModal(user)}
                  >
                    <FaRegEdit className='w-6 h-7' />
                  </button>
                  <button
                    className='text-gray-600 hover:text-gray-800'
                    onClick={() => openDeleteModal(user?._id)}
                  >
                    <MdDeleteOutline className='w-7 h-7' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {users?.length > loadProduct && (
        <button
          className={`animated-button mt-4 px-4 bg-white py-4 ${
            users?.length <= loadProduct && 'cursor-not-allowed'
          }`}
          onClick={() => setLoadProduct((prev) => prev + 6)}
          disabled={users?.length <= loadProduct}
        >
          <span className='button-content '> LoadMore</span>
        </button>
      )}

      {isEditModalOpen && (
        <div className='fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-xl shadow-lg w-[400px]'>
            <h2 className='text-lg font-semibold mb-4'>Edit User</h2>
            <div className='mb-4 text-center'></div>
            <div className='mb-4'>
              <label>Name:</label>
              <input
                type='text'
                value={editUser?.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            <div className='mb-4'>
              <label>Email:</label>
              <input
                type='email'
                value={editUser?.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            <div className='mb-4'>
              <label>Role:</label>
              <select
                value={editUser?.role}
                onChange={(e) =>
                  setEditUser({ ...editUser, role: e.target.value })
                }
                className='w-full border rounded-lg p-2 mt-1'
              >
                <option value='admin'>Admin</option>
                <option value='seller'>Seller</option>
                <option value='buyer'>Buyer</option>
              </select>
            </div>

            <div className='flex justify-end gap-4'>
              <button
                onClick={handleEditSave}
                className='bg-green-500 text-white px-4 py-2 rounded-lg'
              >
                Save
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className='bg-gray-300 px-4 py-2 rounded-lg'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className='fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-xl shadow-lg'>
            <h2 className='text-lg font-semibold mb-4'>
              Are you sure you want to delete?
            </h2>
            <div className='flex justify-end gap-4'>
              <button
                onClick={handleDeleteUser}
                className='bg-red-500 text-white px-4 py-2 rounded-lg'
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className='bg-gray-300 px-4 py-2 rounded-lg'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardUser;
