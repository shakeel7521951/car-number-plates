import React, { useState } from "react";
// import user_image_1 from '../../assets/plateName.png';
// import user_image_2 from '../../assets/plateName.png';
// import user_image_3 from '../../assets/plateName.png';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { PaymentData } from "../../StaticData/data";
import PieChartComponent from "../../components/RechartsCharts/PieChartComponent";
import { generatePieData } from "../SellerDashboard";
const DashboardPayment = () => {
  const [paymentsData, setpaymentsData] = useState(PaymentData);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [editedBuyerName, setEditedBuyerName] = useState("");
  const [editedSellerName, setEditedSellerName] = useState("");
  const [editedPlateNo, setEditedPlateNo] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedBankAcc, setEditedBankAcc] = useState("");
  // const [editedStatus, setEditedStatus] = useState("");
  // const [editedOrderImage, setEditedOrderImage] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Function to open the edit modal
  const openEditModal = (payment) => {
    setSelectedPayment(payment);
    setEditedBuyerName(payment.buyer_name);
    setEditedSellerName(payment.seller_name);
    setEditedPlateNo(payment.plate_no);
    setEditedPrice(payment.price);
    setEditedBankAcc(payment.bank_acc);
    // setEditedStatus(order.status);
    setIsEditModalOpen(true);
  };

  // Function to handle saving edited data
  const handleEditSave = () => {
    const updatedOrders = paymentsData.map((order) =>
      order.order_id === selectedPayment.order_id
        ? {
            ...order,
            buyer_name: editedBuyerName,
            plate_no: editedPlateNo,
            seller_name: editedSellerName,
            price: editedPrice,
            bank_acc: editedBankAcc, // Update status
          }
        : order
    );
    setpaymentsData(updatedOrders);
    setIsEditModalOpen(false);
  };

  // Function to handle file change for profile picture
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setEditedOrderImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // Function to open delete confirmation modal
  const openDeleteModal = (order) => {
    setSelectedPayment(order);
    setIsDeleteModalOpen(true);
  };
  const totalRevenue = 10000;
  const revenueFilled = 10000;
  const totalSales = 5000;
  const salesFilled = 3000;
  const totalListings = 2000;
  const listingsFilled = 1000;
  const totalPendingPayments = 500;
  const paidPayments = 300;

  // Function to delete the user
  const handleDeletePayment = () => {
    const updatedPayments = paymentsData.filter(
      (order) => order.order_id !== selectedPayment.order_id
    );
    setpaymentsData(updatedPayments);
    setIsDeleteModalOpen(false);
  };
  const getStatusStyles = (status) => {
    switch (status) {
      case "Accepted":
        return "text-[#260BF1] border-[#260BF1] border-[1px] px-[0px] py-[8px] text-center rounded-lg";
      case "Rejected":
        return "text-[#F20000] border-[#F20000] border-[1px] px-[0px] py-[8px] text-center rounded-lg";
      case "Pending":
        return "text-[#A2C3F4] border-[#A2C3F4] border-[1px] px-[0px] py-[8px] text-center rounded-lg";
      default:
        return "text-gray-700 border-gray-200";
    }
  };
 
  console.log("Selected Order:", selectedPayment);
  console.log("Selected Order price:", editedPrice);
  // console.log("Edited Image:", editedOrderImage);
  const price = Number(editedPrice.split(",").join(""));
  console.log(price);
  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-xl font-semibold mb-4 lg:text-left text-center">
        Payments
      </h1>



      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center px-8 mb-3'>
        {/* Revenue Chart */}
        <div className='bg-gradient-to-b from-[#c3e78a] to-white rounded-2xl shadow-md pt-4'>
          <PieChartComponent
            data={generatePieData(
              totalRevenue,
              revenueFilled,
              '#1D3B9C',
              '#ccc'
            )}
            title='Sending'
          />
        </div>

        {/* Sales Chart */}
        <div className='bg-gradient-to-b from-[#c3e78a] to-white rounded-2xl shadow-md pt-4'>
          <PieChartComponent
            data={generatePieData(totalSales, salesFilled, '#8CFF00', '#ccc')}
            title='Recive'
          />
        </div>

        <div className='bg-gradient-to-b from-[#c3e78a] to-white rounded-2xl shadow-md pt-4'>
          <PieChartComponent
            data={generatePieData(
              totalListings,
              listingsFilled,
              '#A71414',
              '#ccc'
            )}
            title='Pending'
          />
        </div>

        <div className='bg-gradient-to-b from-[#c3e78a] to-white rounded-2xl shadow-md pt-4'>
          <PieChartComponent
            data={generatePieData(
              totalPendingPayments,
              paidPayments,
              '#98B5DE',
              '#ccc'
            )}
            title='Remaining Belance'
          />
        </div>
      </div>




    
      <div className="overflow-x-auto">
        <div className="min-w-[700px] bg-white rounded-3xl shadow-lg overflow-hidden p-2">
          {/* Header */}
          <div className="grid grid-cols-8 gap-2 bg-gray-100 rounded-xl border-[1px] border-black">
            <div className="p-4 font-medium">Order ID</div>
            <div className="p-4 font-medium">Picture</div>
            <div className="p-4 font-medium">Buyer Name</div>
            <div className="p-4 font-medium">Plate No</div>
            <div className="p-4 font-medium">Seller Name</div>
            <div className="p-4 font-medium">Price</div>
            <div className="p-4 font-medium">Bank Account</div>
            <div className="p-4 font-medium">Edit Status</div>
          </div>

          {/* User Rows */}
          <div className="divide-y divide-gray-200">
            {paymentsData.map((payment) => (
              <div
                key={payment.order_id}
                className="grid grid-cols-8 items-center bg-white hover:bg-gray-50"
              >
                <div className="p-4 text-gray-700">{payment.order_id}</div>
                <div className="p-4">
                  <img
                    src={payment.picture}
                    alt=""
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                </div>
                <div className="p-4 text-gray-700">{payment.buyer_name}</div>
                <div className="p-4 text-gray-700">{payment.plate_no}</div>
                <div className="p-4 text-gray-700">{payment.seller_name}</div>
                <div className="p-4 text-gray-700">{payment.price}</div>
                <div className="p-4 text-gray-700 break-words">
                  {payment.bank_acc}
                </div>
                {/* <div className={` ${getStatusStyles(payment.status)}`}>
  {order.status}
</div> */}

                <div className="p-4 flex space-x-1">
                  {/* Edit Button */}
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => openEditModal(payment)}
                  >
                    <FaRegEdit className="w-6 h-7" />
                  </button>
                  {/* Delete Button */}

                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => openDeleteModal(payment)}
                  >
                    <MdDeleteOutline className="w-7 h-7" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h1 className="text-xl font-semibold my-4 lg:text-left text-center">
        Payments History
      </h1>
       <div className="overflow-x-auto">
       <div className="min-w-[700px] bg-white rounded-3xl shadow-lg overflow-hidden p-2">
        {/* Header */}
        <div className="grid grid-cols-7 bg-gray-100 rounded-xl border-[1px] border-black">
          <div className="p-4 font-medium">Order ID</div>
          <div className="p-4 font-medium">Picture</div>
          <div className="p-4 font-medium">Buyer Name</div>
          <div className="p-4 font-medium">Plate No</div>
          <div className="p-4 font-medium">Seller Name</div>
          <div className="p-4 font-medium">Price</div>
          <div className="p-4 font-medium">Status</div>
          {/* <div className="p-4 font-medium">Edit Status</div> */}
        </div>

        {/* User Rows */}
        <div className="divide-y divide-gray-200">
          {paymentsData.map((payment) => (
            <div
              key={payment.order_id}
              className="grid grid-cols-7 items-center bg-white hover:bg-gray-50"
            >
              <div className="p-4 text-gray-700">{payment.order_id}</div>
              <div className="p-4">
                <img
                  src={payment.picture}
                  alt=""
                  className="w-14 h-14 rounded-lg object-cover"
                />
              </div>
              <div className="p-4 text-gray-700">{payment.buyer_name}</div>
              <div className="p-4 text-gray-700">{payment.plate_no}</div>
              <div className="p-4 text-gray-700">{payment.seller_name}</div>
              <div className="p-4 text-gray-700">{payment.price}</div>
              {/* <div className="p-4 text-gray-700">{payment.status}</div> */}
              <div className={` ${getStatusStyles(payment.status)}`}>
                {payment.status}
              </div>
            </div>
          ))}
        </div>
      </div>
       </div>


      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Edit Payment Details</h2>

            <div className="mb-4">
              <label>Buyer Name:</label>
              <input
                type=""
                value={editedBuyerName}
                onChange={(e) => setEditedBuyerName(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>
            <div className="mb-4">
              <label>Plate Number:</label>
              <input
                type="number"
                value={editedPlateNo}
                onChange={(e) => setEditedPlateNo(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>
            <div className="mb-4">
              <label>Seller Name:</label>
              <input
                type="text"
                value={editedSellerName}
                onChange={(e) => setEditedSellerName(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>
            <div className="mb-4">
              <label>Price:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setEditedPrice(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>

            <div className="mb-4">
              <label>Bank Account:</label>
              <input
                type="text"
                value={editedBankAcc}
                onChange={(e) => setEditedBankAcc(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={handleEditSave}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleDeletePayment}
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

export default DashboardPayment;
