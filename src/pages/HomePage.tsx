import React from "react";
import Header from "../components/Header";
import List from "../components/List";


const restaurants = [
  { name: "Restaurant 1", address: "123 Main St", phone: "555-555-5555" },
  { name: "Restaurant 2", address: "456 Maple Ave", phone: "555-555-5555" },
  { name: "Restaurant 3", address: "789 Oak Dr", phone: "555-555-5555" },
];

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="flex pt-10 justify-center h-screen bg-gradient-to-t from-gray-300 to-gray-100 opacity-100">
        <div className="">
          <List/>
        </div>
      </div>
    </div>
  );
}
