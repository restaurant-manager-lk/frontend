import React, { useState, useEffect } from 'react';
import { ListRestaurantProps } from './List';

interface RestaurantPopupProps {
  restaurant: ListRestaurantProps | null;
  onClose: () => void;
  onSave: (restaurant: ListRestaurantProps, index: number | null) => void;
  index: number | null;
}

const RestaurantPopup: React.FC<RestaurantPopupProps> = ({ restaurant, onClose, onSave, index }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [editedRestaurant, setEditedRestaurant] = useState<ListRestaurantProps>({
    name: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    if (restaurant) {
      setEditedRestaurant(restaurant);
    } else {
      setEditedRestaurant({
        name: '',
        address: '',
        phone: '',
      });
    }
  }, [restaurant]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedRestaurant((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = () => {
    if (editedRestaurant) {
      onSave(editedRestaurant, index);
    }
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-3xl">
        <div>
          <input
            type="text"
            name="name"
            value={editedRestaurant.name}
            onChange={handleInputChange}
            className="block w-full mb-2 p-2 border rounded"
            placeholder="Name"
          />
          <input
            type="text"
            name="address"
            value={editedRestaurant.address}
            onChange={handleInputChange}
            className="block w-full mb-2 p-2 border rounded"
            placeholder="Address"
          />
          <input
            type="text"
            name="phone"
            value={editedRestaurant.phone}
            onChange={handleInputChange}
            className="block w-full mb-2 p-2 border rounded"
            placeholder="Phone"
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={handleSaveClick} className="bg-green-500 text-white rounded px-2 py-1">
            Save
          </button>
          <button onClick={onClose} className="bg-red-500 text-white rounded px-2 py-1">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPopup;
