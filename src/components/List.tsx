import React, { useState } from "react";

interface ListItemProps {
  name: string;
  address: string;
  phone: string;
}

const List: React.FC = () => {
  const initialItems: ListItemProps[] = [
    { name: "Restaurant 1", address: "123 Main St", phone: "555-555-5555" },
    { name: "Restaurant 2", address: "456 Maple Ave", phone: "555-555-5555" },
    { name: "Restaurant 3", address: "789 Oak Dr", phone: "555-555-5555" },
  ];

  const [items, setItems] = useState(initialItems);

  const handleDelete = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border-2 ">
      <div className="m-5 overflow-auto ">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <p>No restaurants are registered</p>
            <button className="bg-blue-500 text-white rounded px-2 py-1 mt-2">
              <i className="fas fa-plus"></i>
            </button>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 py-2"
            >
              <div className="mr-10">
                <h2 className="font-bold">
                  {item.name}({item.phone})
                </h2>
                <p>{item.address}</p>
              </div>
              <div>
                <button className="bg-blue-500 text-white rounded px-2 py-1 mr-2">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white rounded px-2 py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
