import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantPopup from "./RestaurantPopup";

export interface ListRestaurantProps {
  _id: string;
  name: string;
  address: string;
  phone: string;
}

const List: React.FC = () => {
  const initialRestaurants: ListRestaurantProps[] = [];

  const [selectedRestaurant, setSelectedRestaurant] =
    useState<ListRestaurantProps | null>(null);
  const [selectedRestaurantIndex, setSelectedRestaurantIndex] = useState<
    number | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurants, setRestaurants] = useState(initialRestaurants);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/restaurants/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRestaurants(data);
        console.log(restaurants);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        navigate('/404');
      });
  }, [restaurants, navigate]);

  const handleRestaurantClick = (index: number) => {
    setSelectedRestaurant(restaurants[index]);
    setSelectedRestaurantIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();

    fetch(
      `http://localhost:8000/restaurants/delete/${restaurants[index]._id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const newRestaurants = restaurants.filter(
          (restaurant, i) => i !== index
        );
        setRestaurants(newRestaurants);
      });
  };

  const handleSave = (
    updatedRestaurant: ListRestaurantProps,
    index: number | null
  ) => {
    const newRestaurants = [...restaurants];

    if (index === null) {
      fetch("http://localhost:8000/restaurants/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRestaurant),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          newRestaurants.push(data);
          setRestaurants(newRestaurants);
          setIsModalOpen(false);
        });
    } else {
      fetch(
        `http://localhost:8000/restaurants/update/${newRestaurants[index]._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRestaurant),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          newRestaurants[index] = data;
          setRestaurants(newRestaurants);
          setIsModalOpen(false);
        });
    }
    setRestaurants(newRestaurants);
    setIsModalOpen(false);
  };

  const handleAddNewRestaurant = () => {
    setSelectedRestaurant(null);
    setSelectedRestaurantIndex(null);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border-2 ">
      <div className="flex justify-center mt-4 scale-75">
        <button
          type="button"
          className="text-black border-2 border-black bg-gray-100 hover:bg-blue-500 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2"
          onClick={handleAddNewRestaurant}
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
        {restaurants.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <p>No restaurants are registered</p>
            <button
              className="bg-blue-500 text-white rounded px-2 py-1 mt-2"
              onClick={handleAddNewRestaurant}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        ) : (
          restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 py-2 hover:bg-gray-200 cursor-pointer m-2 p-3 rounded-md"
              onClick={() => handleRestaurantClick(index)}
            >
              <div className="mr-10">
                <h2 className="font-bold">{restaurant.name}</h2>
                <p>{restaurant.address}</p>
              </div>
              <div>
                <button
                  onClick={(event) => handleDelete(event, index)}
                  className="text-black border-2 scale-75 border-black bg-gray-100 hover:bg-red-500 hover:border-gray-100 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2"
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {isModalOpen && (
        <RestaurantPopup
          restaurant={selectedRestaurant}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          index={selectedRestaurantIndex}
        />
      )}
    </div>
  );
};

export default List;
