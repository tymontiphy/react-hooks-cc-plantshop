import React, { useState, useEffect } from "react";
import Search from "./Search";
import PlantCard from "./PlantCard"; // Import PlantCard
import Header from "./Header"; // Import Header
import NewPlantForm from "./NewPlantForm"; // Import NewPlantForm
import '../index.css'; // Assuming your styles are in App.css

function App() {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        setFilteredPlants(data); // Initially show all plants
      });
  }, []);

  // Handle search input change (when search button is clicked)
  const handleSearch = (query) => {
    if (!query) {
      setFilteredPlants(plants); // Show all plants if no query
    } else {
      const filtered = plants.filter((plant) =>
        plant.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPlants(filtered); // Update filtered plants list
    }
  };

  // Handle price update for a plant
  const handlePriceUpdate = (id, newPrice) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id ? { ...plant, price: newPrice } : plant
      )
    );
  };

  // Handle plant deletion
  const handleDelete = (id) => {
    setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
    setFilteredPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
  };

  // Handle adding new plant
  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((newPlantFromServer) => {
        setPlants((prevPlants) => [...prevPlants, newPlantFromServer]);
        setFilteredPlants((prevPlants) => [...prevPlants, newPlantFromServer]);
      });
  };

  return (
    <div>
      <Header /> {/* Add the Header component */}
      <Search onSearch={handleSearch} />
      <NewPlantForm onAddPlant={handleAddPlant} /> {/* Add the NewPlantForm component */}
      <ul className="cards">
        {filteredPlants.map((plant) => (
          <PlantCard
            key={plant.id}
            id={plant.id}
            image={plant.image}
            plantName={plant.name}
            price={plant.price}
            inStock={plant.inStock}
            onPriceUpdate={handlePriceUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;