import React, { useState } from "react";
import axios from "axios"; // Import axios for making API requests
import { getAllProperties, handleFilters } from "../features/buyer/buyerSlice";
import { useDispatch } from "react-redux";
function BuyerFilters() {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedBathrooms, setSelectedBathrooms] = useState("");
  const [selectedBedrooms, setSelectedBedrooms] = useState("");
  const dispatch = useDispatch();
  const handlePriceInputChange = (e) => {
    setPriceRange({ ...priceRange, [e.target.name]: parseInt(e.target.value) });
  };

  const handleBathroomChange = (e) => {
    setSelectedBathrooms(e.target.value);
  };

  const handleBedroomChange = (e) => {
    setSelectedBedrooms(e.target.value);
  };

  const handleApplyFilters = () => {
    const filters = {
      minPrice: priceRange.min === "" ? 0 : priceRange.min,
      maxPrice: priceRange.max === "" ? 0 : priceRange.max,
      numberOfBathrooms: selectedBathrooms === "" ? 0 : selectedBathrooms,
      numberOfBedrooms: selectedBedrooms === "" ? 0 : selectedBedrooms,
    };
    dispatch(handleFilters(filters));
  };

  return (
    <div className="p-4 flex gap-4 items-center">
      <div className="space-y-2">
        <label
          htmlFor="min-price"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Min Price
        </label>
        <input
          className="input w-[100px] mx-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="number"
          id="min-price"
          name="min"
          value={priceRange.min}
          onChange={handlePriceInputChange}
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="max-price"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Max Price
        </label>
        <input
          className="input w-[100px] mx-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="number"
          id="max-price"
          name="max"
          value={priceRange.max}
          onChange={handlePriceInputChange}
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="bathrooms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Bathrooms
        </label>
        <select
          id="bathrooms"
          className="inputw-[100px] mx-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={selectedBathrooms}
          onChange={handleBathroomChange}
        >
          <option value="">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5+">5+</option>
        </select>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="bedrooms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Bedrooms
        </label>
        <select
          id="bedrooms"
          className="input w-[100px] mx-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={selectedBedrooms}
          onChange={handleBedroomChange}
        >
          <option value="">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5+">5+</option>
        </select>
      </div>
      <div className="">
        <button
          className="bg-blue-500 text-white px-4 py-2 w-[150px] rounded hover:bg-blue-600"
          onClick={() => handleApplyFilters()}
        >
          Apply
        </button>
      </div>
      <div className="">
        <button
          className="bg-blue-500 text-white px-4 py-2 w-[150px] rounded hover:bg-blue-600"
          onClick={() => {
            dispatch(getAllProperties());
            setPriceRange({ min: "", max: "" });
            setSelectedBathrooms("");
            setSelectedBedrooms("");
          }}
        >
          Remove filters
        </button>
      </div>
    </div>
  );
}

export default BuyerFilters;
