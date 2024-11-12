import React, { useState, useEffect } from 'react';
import PlantCard from './PlantCard';
import NewPlantForm from './NewPlantForm';
import ErrorPage from './ErrorPage';

function PlantList() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    // Fetch the plant data when the component mounts
    fetch('http://localhost:6001/plants')
      .then((r) => r.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error('Error fetching plants:', error));
  }, []);

  // Handle adding a new plant to the list
  function handleAddPlant(newPlant) {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  }

  // Handle updating the price of a plant
  function handlePriceUpdate(id, newPrice) {
    // Send patch request to update the price
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === id ? { ...plant, price: updatedPlant.price } : plant
          )
        );
      })
      .catch((error) => console.error('Error updating price:', error));
  }

  // Handle deleting a plant
  function handleDelete(id) {
    // Send DELETE request to remove the plant
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
      })
      .catch((error) => console.error('Error deleting plant:', error));
  }

   // If there's an error, display the ErrorPage component
   if (error) {
    return < ErrorPage message={error} />;
  }

  return (
    <div>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <ul className="cards">
        {plants.map((plantObj) => (
          <PlantCard
            key={plantObj.id}
            id={plantObj.id}
            image={plantObj.image}
            plantName={plantObj.name}
            price={plantObj.price}
            inStock={plantObj.inStock}
            onPriceUpdate={handlePriceUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default PlantList;
