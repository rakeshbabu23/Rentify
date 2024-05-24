import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
function ProductBox({
  children,
  role,
  onEdit,
  onDelete,
  onInterest,
  setShowModal,
}) {
  return (
    <div className="h-[550px]  flex flex-col items-center p-4 overflow-hidden">
      <div className="border-2 rounded-md w-[21vw] border-white shadow-md overflow-hidden transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
        <div className="h-[200px] object-fit overflow-hidden">
          <img
            className="w-full h-[100%] "
            src={
              children.image === ""
                ? "https://assets.buildout.com/assets/plugins/photo_placeholder-623024d78d77741a2e8b3318edee992ccd44bf2abfffe503a77470578eff2a60.png"
                : children.image
            }
            alt={children.alt || "Product Image"}
          />
        </div>
        <div className="relative p-2 h-[350px]  overflow-auto">
          <p className="">
            <span className="font-semibold">Area:</span> {children.area} sq ft
          </p>
          <p>
            <span className="font-semibold">Address: </span>
            {children.address}
          </p>
          <div className="flex gap-2">
            <p>
              <span className="font-semibold">Bedrooms:</span>{" "}
              {children.numberOfBedrooms}
            </p>
            <p>
              <span className="font-semibold">Bathrooms:</span>{" "}
              {children.numberOfBathrooms}
            </p>
          </div>
          <p>
            {" "}
            <span className="font-semibold">Price:</span> ₹
            {children.price.toLocaleString()}
          </p>
          <div>
            <p className="font-semibold">
              Nearby Colleges:{" "}
              <span className="font-normal">
                {children.nearbyColleges.join(", ") == ""
                  ? "No Colleges"
                  : children.nearbyColleges.join(", ")}
              </span>
            </p>
          </div>
          <div>
            <p className="font-semibold">
              Nearby Hospitals:{" "}
              <span className="font-normal">
                {children.nearbyHospitals.join(", ") == ""
                  ? "No hospitals"
                  : children.nearbyHospitals.join(", ")}
              </span>
            </p>
          </div>
          {role == "seller" && (
            <div className="absolute right-5 bottom-10 flex justify-end gap-2 pb-2 pr-2 ">
              <button
                className="bg-blue-500 text-white w-[50px] px-4 py-2 rounded-md"
                onClick={() => onEdit(children._id)}
              >
                <FaEdit />
              </button>
              <button
                className=" text-white bg-red-500 w-[50px] px-4 py-2 rounded-md"
                onClick={() => onDelete(children._id)}
              >
                <FaTrash />
              </button>
            </div>
          )}
          {role == "buyer" && (
            <div className="border-1 border-blue-500 absolute right-5 bottom-10 flex justify-end gap-2 pb-2 pr-2 ">
              <button
                onClick={() => {
                  onInterest(children._id);
                  setShowModal(true);
                }}
                className="border-[2px] border-blue-500 bg-white text-blue-500 hover:bg-blue-500 hover:text-white w-[150px] px-4 py-2 rounded-md"
              >
                I'm interested
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductBox;
