import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000";

const initialState = {
  isLoading: [],
  sellerProperties: [],
  selectedPropertyForEditing: "",
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.isLoading = action.payload;
    },
    setAllPropertiesOfSeller(state, action) {
      state.sellerProperties = action.payload;
    },
    setNewProperty(state, action) {
      state.sellerProperties = [...state.sellerProperties, action.payload];
    },
    updateAllProperties(state, action) {
      const propertyId = action.payload;
      state.sellerProperties = state.sellerProperties.filter(
        (prop) => prop._id !== propertyId
      );
    },
    setSelectPropertyToEdit(state, action) {
      state.selectedPropertyForEditing = state.sellerProperties.filter(
        (prop) => prop._id === action.payload
      );
    },
    setSelectedPropertyToEmpty(state, action) {
      state.selectedPropertyForEditing = "";
    },
    updateExistingProperties(state, action) {
      const updatedProperty = action.payload;
      const index = state.sellerProperties.findIndex(
        (property) => property._id === updatedProperty._id
      );

      if (index !== -1) {
        state.sellerProperties[index] = updatedProperty;
      }
    },
  },
});
export function getAllPropertiesOfSeller() {
  return async function (dispatch, getState) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/properties/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        dispatch({
          type: "seller/setAllPropertiesOfSeller",
          payload: response.data,
        });
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        let errorMessage = "An error occurred. Please try again.";

        if (status === 400) {
          errorMessage = data.message;
        } else if (status === 401) {
          errorMessage = "Unauthorized access. Please log in.";
        } else if (status === 404) {
          errorMessage = "Resource not found.";
        } else if (status === 500) {
          errorMessage = "Internal server error.";
        }

        alert(errorMessage);
      } else if (error.request) {
        alert("No response received. Please try again.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };
}

export function createNewProperty(propertyInfo, setShowModal) {
  return async function (dispatch, getState) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/api/properties/`,
        propertyInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setShowModal(false);
        dispatch({
          type: "seller/setNewProperty",
          payload: response.data,
        });
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        let errorMessage = "An error occurred. Please try again.";

        if (status === 400) {
          errorMessage = data.message;
        } else if (status === 401) {
          errorMessage = "Unauthorized access. Please log in.";
        } else if (status === 404) {
          errorMessage = "Resource not found.";
        } else if (status === 500) {
          errorMessage = "Internal server error.";
        }

        alert(errorMessage);
      } else if (error.request) {
        alert("No response received. Please try again.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };
}

export function deleteExistingProperty(propertyId) {
  return async function (dispatch, getState) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${API_URL}/api/properties/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch({
          type: "seller/updateAllProperties",
          payload: propertyId,
        });
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        let errorMessage = "An error occurred. Please try again.";

        if (status === 400) {
          errorMessage = data.message;
        } else if (status === 401) {
          errorMessage = "Unauthorized access. Please log in.";
        } else if (status === 404) {
          errorMessage = "Resource not found.";
        } else if (status === 500) {
          errorMessage = "Internal server error.";
        }

        alert(errorMessage);
      } else if (error.request) {
        alert("No response received. Please try again.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };
}

export function editExistingProperty(propertyId, propertyInfo, setShowModal) {
  return async function (dispatch, getState) {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${API_URL}/api/properties/${propertyId}`,
        propertyInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setShowModal(false);
        dispatch({
          type: "seller/setSelectedPropertyToEmpty",
          payload: "",
        });
        dispatch({
          type: "seller/updateExistingProperties",
          payload: response.data,
        });
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        let errorMessage = "An error occurred. Please try again.";

        if (status === 400) {
          errorMessage = data.message;
        } else if (status === 401) {
          errorMessage = "Unauthorized access. Please log in.";
        } else if (status === 404) {
          errorMessage = "Resource not found.";
        } else if (status === 500) {
          errorMessage = "Internal server error.";
        }

        alert(errorMessage);
      } else if (error.request) {
        alert("No response received. Please try again.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };
}

export const { setLoadingStatus, setSelectPropertyToEdit } =
  sellerSlice.actions;

export default sellerSlice.reducer;
