import React, { useState } from "react";
import product_image_1 from "../../assets/plateName.png";
import product_image_2 from "../../assets/plateName.png";
import product_image_3 from "../../assets/plateName.png";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const DashboardProduct = () => {
  const [productsData, setProductsData] = useState([
    {
      product_id: 1,
      product_image: product_image_1,
      owner_name: "Malik",
      product_plateno: "malik@gmail.com",
      product_price: 50000,
    },
    {
      product_id: 2,
      product_image: product_image_2,
      owner_name: "Ali",
      product_plateno: "ali@gmail.com",
      product_price: 40000,
    },
    {
      product_id: 3,
      product_image: product_image_3,
      owner_name: "Usman",
      product_plateno: "usman@gmail.com",
      product_price: 50000,
    },
    {
      product_id: 4,
      product_image: product_image_1,
      owner_name: "Hafsa",
      product_plateno: "hafsa@gmail.com",
      product_price: 30000,
    },
    {
      product_id: 5,
      product_image: product_image_2,
      owner_name: "Sara",
      product_plateno: "sara@gmail.com",
      product_price: 50000,
    },
    {
      product_id: 6,
      product_image: product_image_3,
      owner_name: "Fatima",
      product_plateno: "fatima@gmail.com",
      product_price: 10000,
    },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [editedUserName, setEditedUserName] = useState("");
  // const [editedUserEmail, setEditedUserEmail] = useState("");
  // const [editedUserImage, setEditedUserImage] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Function to open the edit modal
  // const openEditModal = (user) => {
  //   setSelectedProduct(user);
  //   setEditedUserName(user.user_name);
  //   setEditedUserEmail(user.user_email);
  //   setEditedUserImage(user.user_image);
  //   setIsEditModalOpen(true);
  // };

  // // Function to handle saving edited data
  // const handleEditSave = () => {
  //   const updatedUsers = usersData.map((user) =>
  //     user.user_id === selectedUser.user_id
  //       ? { ...user, user_name: editedUserName, user_email: editedUserEmail, user_image: editedUserImage }
  //       : user
  //   );
  //   setUsersData(updatedUsers);
  //   setIsEditModalOpen(false);
  // };

  // Function to handle file change for profile picture
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setEditedUserImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // Function to open delete confirmation modal
  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  // Function to delete the user
  const handleDeleteUser = () => {
    const updatedProducts = productsData.filter(
      (product) => product.product_id !== selectedProduct.product_id
    );
    setProductsData(updatedProducts);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-xl font-semibold mb-4  lg:text-left text-center">
        Products
      </h1>
      <div className="overflow-x-auto">
        <div className="min-w-[800px] bg-white rounded-3xl shadow-lg overflow-hidden p-2">
          {/* Header */}
          <div className="grid grid-cols-6 bg-gray-100 rounded-xl border-[1px] border-black">
            <div className="p-4 font-medium">Item ID</div>
            <div className="p-4 font-medium">Picture</div>
            <div className="p-4 font-medium">Owner Name</div>
            <div className="p-4 font-medium">Plate No</div>
            <div className="p-4 font-medium">Price</div>
            <div className="p-4 font-medium">Delete</div>
          </div>

          {/* User Rows */}
          <div className="divide-y divide-gray-200">
            {productsData.map((product) => (
              <div
                key={product.product_id}
                className="grid grid-cols-6 items-center bg-white hover:bg-gray-50"
              >
                <div className="p-4 text-gray-700">{product.product_id}</div>
                <div className="p-4">
                  <img
                    src={product.product_image}
                    alt={product.product_name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                </div>
                <div className="p-4 text-gray-700">{product.owner_name}</div>
                <div className="p-4 text-gray-700  break-words">
                  {product.product_plateno}
                </div>
                <div className="p-4 text-gray-700">
                  {product.product_price.toLocaleString()}
                </div>
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => openDeleteModal(product)}
                >
                  <MdDeleteOutline className="w-7 h-7" />
                </button>
                {/* <div className="p-4 flex space-x-4">

                <button className="text-gray-600 hover:text-gray-800" onClick={() => openEditModal(user)}>
                  <FaRegEdit className="w-6 h-7" />
                </button>

                <button className="text-gray-600 hover:text-gray-800" onClick={() => openDeleteModal(product)}>
                  <MdDeleteOutline className="w-7 h-7" />
                </button>
              </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {/* {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>
            <div className="mb-4 text-center">
              <img src={editedUserImage} alt="Profile" className="w-20 h-20 rounded-full object-cover mx-auto mb-4" />
              <input type="file" onChange={handleImageChange} />
            </div>
            <div className="mb-4">
              <label>Name:</label>
              <input
                type="text"
                value={editedUserName}
                onChange={(e) => setEditedUserName(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>
            <div className="mb-4">
              <label>Email:</label>
              <input
                type="email"
                value={editedUserEmail}
                onChange={(e) => setEditedUserEmail(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button onClick={handleEditSave} className="bg-green-500 text-white px-4 py-2 rounded-lg">Save</button>
              <button onClick={() => setIsEditModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )} */}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleDeleteUser}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
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

export default DashboardProduct;
