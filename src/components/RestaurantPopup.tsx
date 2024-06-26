import React, { useState, useEffect } from 'react';
import { ListRestaurantProps } from './List';

interface RestaurantPopupProps {
  restaurant: ListRestaurantProps | null;
  onClose: () => void;
  onSave: (restaurant: ListRestaurantProps, index: number | null) => void;
  index: number | null;
}

const RestaurantPopup: React.FC<RestaurantPopupProps> = ({ restaurant, onClose, onSave, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRestaurant, setEditedRestaurant] = useState<ListRestaurantProps>({
    _id: '',
    name: '',
    address: '',
    phone: '',
  });
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  useEffect(() => {
    if (restaurant) {
      setEditedRestaurant(restaurant);
      setIsEditing(false); 
    } else {
      setEditedRestaurant({
        _id: '',
        name: '',
        address: '',
        phone: '',
      });
      setIsEditing(true); 
    }
  }, [restaurant]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedRestaurant((prev) => ({ ...prev, [name]: value }));

    if (name === "phone") {
      const phonePattern = /^(?:0[0-9]{9}|\+94[0-9]{9}|[1-9][0-9]{8})$/;
      setIsPhoneValid(phonePattern.test(value));
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (editedRestaurant) {
      onSave(editedRestaurant, index);
    }
    setIsEditing(false);
  };

  const isFormValid = () => {
    return (
      editedRestaurant.name &&
      editedRestaurant.address &&
      editedRestaurant.phone &&
      isPhoneValid
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl w-96">
        {isEditing ? (
          <div>
            <div className='flex content-center justify-center'>
              <h2 className="text-xl font-bold mb-4">Restaurant Details</h2>
            </div>
            {!editedRestaurant.name && isEditing && (
              <p className="text-red-500" style={{ fontSize: "12px" }}>
                Please fill this field
              </p>
            )}
            <input
              type="text"
              name="name"
              value={editedRestaurant.name}
              onChange={handleInputChange}
              className="block w-full mb-4 p-2 border rounded"
              placeholder="Name"
              required
              disabled={!isEditing}
            />
            {!editedRestaurant.address && isEditing && (
              <p className="text-red-500" style={{ fontSize: "12px" }}>
                Please fill this field
              </p>
            )}
            <textarea
              name="address"
              value={editedRestaurant.address}
              onChange={handleInputChange}
              className="block w-full mb-4 p-2 border rounded"
              placeholder="Address"
              required
              rows={4} // specify the number of rows for the textarea
              disabled={!isEditing}
            />
            {!isPhoneValid && isEditing && (
              <p className="text-red-500" style={{ fontSize: "12px" }}>
                Not valid format
              </p>
            )}
            {!editedRestaurant.phone && isEditing && (
              <p className="text-red-500" style={{ fontSize: "12px" }}>
                Please fill this field
              </p>
            )}
            <input
              type="text"
              name="phone"
              value={editedRestaurant.phone}
              onChange={handleInputChange}
              className="block w-full mb-4 p-2 border rounded"
              placeholder="Phone"
              required
              disabled={!isEditing}
            />
          </div>
        ) : (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">{editedRestaurant.name}</h2>
            <p className="mb-2"><strong>Address:</strong> {editedRestaurant.address}</p>
            <p><strong>Phone:</strong> {editedRestaurant.phone}</p>
          </div>
        )}
        <div className="flex justify-center space-x-2 mt-5">
          {isEditing ? (
            <button
              onClick={handleSaveClick}
              className={`rounded-full px-6 py-2 ${
                isFormValid() ? "bg-green-500 text-white" : "bg-gray-500 text-gray-300"
              }`}
              disabled={!isFormValid()}
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white rounded-full px-6 py-2"
            >
              Edit
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-red-500 text-white rounded-full px-6 py-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPopup;
