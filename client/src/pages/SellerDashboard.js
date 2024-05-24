import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExistingProperty,
  getAllPropertiesOfSeller,
  setSelectPropertyToEdit,
} from "../features/seller/sellerSlice";
import AddProperty from "../components/AddProperty";
import ProductBox from "../components/ProductBox";
function SellerDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const seller = useSelector((state) => state.seller);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "Seller") {
      navigate("/login");
    } else {
      dispatch(getAllPropertiesOfSeller());
    }
  }, []);
  const handleEdit = (id) => {
    dispatch(setSelectPropertyToEdit(id));
    setShowModal(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteExistingProperty(id));
  };
  return (
    <>
      <div>
        {!showModal && <Navbar />}
        <div className="flex flex-row justify-end px-8 pt-2">
          <button
            onClick={() => setShowModal(true)}
            className=" bg-black text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-[100px]"
          >
            Post Property
          </button>
        </div>
        <p className="text-lg font-bold px-4">Your Properties</p>
        {seller && seller.sellerProperties.length == 0 && (
          <p className="flex flex-col justify-center items-center">
            No properties
          </p>
        )}
        <div className="flex flex-wrap gap-4">
          {seller &&
            seller.sellerProperties.length > 0 &&
            seller.sellerProperties.map((property) => (
              <ProductBox
                role="seller"
                onEdit={handleEdit}
                onDelete={handleDelete}
              >
                {property}
              </ProductBox>
            ))}
        </div>
      </div>
      {showModal && <AddProperty setShowModal={setShowModal} />}
    </>
  );
}

export default SellerDashboard;
