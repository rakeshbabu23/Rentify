import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewProperty,
  editExistingProperty,
  setSelectPropertyToEdit,
} from "../features/seller/sellerSlice";

function AddProperty({ setShowModal }) {
  const [selectedProperty] = useSelector(
    (state) => state.seller.selectedPropertyForEditing
  );

  const [formData, setFormData] = useState({
    address: "",
    area: "",
    numberOfBedrooms: "",
    numberOfBathrooms: "",
    nearbyHospitals: [""],
    nearbyColleges: [""],
    price: "",
    image: "",
  });

  useEffect(() => {
    if (selectedProperty !== "") {
      setFormData({
        address: (selectedProperty && selectedProperty.address) || "",
        area: (selectedProperty && selectedProperty.area) || "",
        numberOfBedrooms:
          (selectedProperty && selectedProperty.numberOfBedrooms) || "",
        numberOfBathrooms:
          (selectedProperty && selectedProperty.numberOfBathrooms) || "",
        nearbyHospitals:
          selectedProperty && selectedProperty.nearbyHospitals.length
            ? selectedProperty.nearbyHospitals
            : [""],
        nearbyColleges:
          selectedProperty && selectedProperty.nearbyColleges.length
            ? selectedProperty.nearbyColleges
            : [""],
        price: (selectedProperty && selectedProperty.price) || "",
        image: (selectedProperty && selectedProperty.image) || "",
      });
    }
  }, [selectedProperty]);

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (e, index, field) => {
    const { value } = e.target;
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  const handleAddField = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  const handleRemoveField = (index, field) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (
      formData.address &&
      formData.area &&
      formData.numberOfBedrooms &&
      formData.numberOfBathrooms &&
      formData.price
    ) {
      if (selectedProperty === "" || selectedProperty === undefined) {
        dispatch(createNewProperty(formData, setShowModal));
      } else {
        dispatch(
          editExistingProperty(selectedProperty._id, formData, setShowModal)
        );
      }
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
        <div className="bg-white w-[100vw] p-6 rounded-lg border border-gray-300 max-w-4xl mx-auto relative">
          <div>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setShowModal(false);
                dispatch(setSelectPropertyToEdit());
              }}
            >
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="field">
                  <label className="label">Address</label>
                  <input
                    className={`input w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formSubmitted &&
                      !formData.address.trim() &&
                      "border-red-500"
                    }`}
                    type="text"
                    name="address"
                    value={formData && formData.address}
                    onChange={handleChange}
                  />
                  {formSubmitted && !formData.address.trim() && (
                    <p className="text-red-500 text-xs pt-1">
                      Address is required
                    </p>
                  )}
                </div>
                <div className="field">
                  <label className="label">Area (in Sq.ft)</label>
                  <input
                    className={`input w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formSubmitted && !formData.area && "border-red-500"
                    }`}
                    type="number"
                    name="area"
                    value={formData && formData.area}
                    onChange={handleChange}
                  />
                  {formSubmitted && !formData.area && (
                    <p className="text-red-500 text-xs pt-1">
                      Area is required
                    </p>
                  )}
                </div>
                <div className="field">
                  <label className="label">Number of Bedrooms</label>
                  <input
                    className={`input w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formSubmitted &&
                      !formData.numberOfBedrooms &&
                      "border-red-500"
                    }`}
                    type="number"
                    name="numberOfBedrooms"
                    value={formData && formData.numberOfBedrooms}
                    onChange={handleChange}
                  />
                  {formSubmitted && !formData.numberOfBedrooms && (
                    <p className="text-red-500 text-xs pt-1">
                      Number of Bedrooms is required
                    </p>
                  )}
                </div>
                <div className="field">
                  <label className="label">Number of Bathrooms</label>
                  <input
                    className={`input w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formSubmitted &&
                      !formData.numberOfBathrooms &&
                      "border-red-500"
                    }`}
                    type="number"
                    name="numberOfBathrooms"
                    value={formData && formData.numberOfBathrooms}
                    onChange={handleChange}
                  />
                  {formSubmitted && !formData.numberOfBathrooms && (
                    <p className="text-red-500 text-xs pt-1">
                      Number of Bathrooms is required
                    </p>
                  )}
                </div>
                <div className="field">
                  <label className="label">Price</label>
                  <input
                    className={`input w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formSubmitted && !formData.price && "border-red-500"
                    }`}
                    type="number"
                    name="price"
                    value={formData && formData.price}
                    onChange={handleChange}
                  />
                  {formSubmitted && !formData.price && (
                    <p className="text-red-500 text-xs pt-1">
                      Price is required
                    </p>
                  )}
                </div>
                <div className="field">
                  <label className="label">Image URL</label>
                  <input
                    className="input w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="text"
                    name="image"
                    value={formData && formData.image}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="h-[70vh] overflow-auto">
                <div className="field">
                  <label className="label">Nearby Hospitals</label>
                  {formData &&
                    formData.nearbyHospitals.map((hospital, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <input
                          className="input w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          type="text"
                          value={hospital}
                          onChange={(e) =>
                            handleArrayChange(e, index, "nearbyHospitals")
                          }
                        />
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() =>
                            handleRemoveField(index, "nearbyHospitals")
                          }
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="mt-2 text-blue-500 hover:text-blue-700"
                    onClick={() => handleAddField("nearbyHospitals")}
                  >
                    Add Hospital
                  </button>
                </div>
                <div className="field">
                  <label className="label">Nearby Colleges</label>
                  {formData &&
                    formData.nearbyColleges.map((college, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <input
                          className="input w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          type="text"
                          value={college}
                          onChange={(e) =>
                            handleArrayChange(e, index, "nearbyColleges")
                          }
                        />
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() =>
                            handleRemoveField(index, "nearbyColleges")
                          }
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="mt-2 text-blue-500 hover:text-blue-700"
                    onClick={() => handleAddField("nearbyColleges")}
                  >
                    Add College
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className=" bg-black text-white py-2 px-4 rounded-md hover:bg-grey-light"
                type="submit"
              >
                {selectedProperty !== "" && selectedProperty !== undefined
                  ? "Update Property"
                  : "Add Property"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProperty;
