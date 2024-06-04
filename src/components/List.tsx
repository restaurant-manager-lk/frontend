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
      <div className="flex justify-center mt-4 scale-75">
        <button
          type="button"
          className="text-black border-2 border-black bg-gray-100 hover:bg-blue-500 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>

      <div className="m-5 mt-2 overflow-auto ">
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
