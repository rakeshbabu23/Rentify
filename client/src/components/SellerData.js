import React from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSelectPropertyToEdit } from "../features/seller/sellerSlice";
import { handleEmail } from "../features/buyer/buyerSlice";

function SellerData({ setShowModal }) {
  const sellerDetails = useSelector(
    (state) => state.buyer.sellerDetails.sellerData
  );
  const selectedPropertyId = useSelector(
    (state) => state.buyer.sellerDetails.propertyId
  );
  const buyer = useSelector((state) => state.buyer);
  const dispatch = useDispatch();

  const handleEmailClick = (sellerId) => {
    dispatch(handleEmail(sellerId, selectedPropertyId, setShowModal));
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
        <div className="bg-white w-[90vw] sm:w-[50vw] p-6 rounded-lg border border-gray-300 max-w-4xl mx-auto relative">
          <div>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setShowModal(false);
              }}
            >
              <FaTimes />
            </button>
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Seller Details</h2>
            <div className="mb-4">
              <p className="text-lg">
                <strong>Name:</strong> {sellerDetails && sellerDetails.name}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-lg">
                <strong>Email:</strong> {sellerDetails && sellerDetails.email}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-lg">
                <strong>Phone Number:</strong>{" "}
                {sellerDetails && sellerDetails.phoneNumber}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                className="inline-flex items-center bg-blue-500 text-white justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 hover:bg-blue-600"
                onClick={() => handleEmailClick(sellerDetails.sellerId)}
              >
                {buyer.emailLoadingStatus
                  ? "Sending..."
                  : "Get More Details via Email"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerData;
