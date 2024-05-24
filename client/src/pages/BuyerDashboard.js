import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProperties,
  getSellerDetailsOfInterestedProperty,
} from "../features/buyer/buyerSlice";
import Navbar from "../components/Navbar";
import ProductBox from "../components/ProductBox";
import BuyerFilters from "../components/BuyerFilters";
import SellerData from "../components/SellerData";

function BuyerDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { properties, total, page, pages } = useSelector(
    (state) => state.buyer.allProperties
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "Buyer") {
      navigate("/login");
    } else {
      dispatch(getAllProperties(1));
    }
  }, [dispatch, navigate]);

  function handleInterestButton(id) {
    dispatch(getSellerDetailsOfInterestedProperty(id));
  }

  function handlePageChange(newPage) {
    dispatch(getAllProperties(newPage));
  }

  return (
    <div>
      <Navbar />
      <BuyerFilters />
      <p className="text-lg font-bold px-4">Available Properties</p>
      {properties && properties.length === 0 && (
        <p className="flex flex-col justify-center items-center">
          No properties available
        </p>
      )}
      <div className="flex flex-wrap gap-4">
        {properties &&
          properties.length > 0 &&
          properties.map((property) => (
            <ProductBox
              key={property._id}
              role="buyer"
              setShowModal={setShowModal}
              onInterest={handleInterestButton}
            >
              {property}
            </ProductBox>
          ))}
      </div>
      <div className="flex justify-center m-4">
        <button
          className="mr-2 px-3 py-1 bg-gray-300 rounded"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          <FaArrowLeft />
        </button>
        <span className="px-3 py-1">{`Page ${page} of ${pages}`}</span>
        <button
          className="ml-2 px-3 py-1 bg-gray-300 rounded"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pages}
        >
          <FaArrowRight />
        </button>
      </div>
      {showModal && <SellerData setShowModal={setShowModal} />}
    </div>
  );
}

export default BuyerDashboard;
