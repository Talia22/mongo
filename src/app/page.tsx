'use client';
import { useEffect, useState } from "react";
import { fetchCars, addCar, updateCar, deleteCar } from '@/services/carServices';

interface Car {
  _id: string;
  model: string;
  plate_number: string;
  color: string;
}

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newCar, setNewCar] = useState<{ model: string; plate_number: string; color: string }>({
    model: '',
    plate_number: '',
    color: ''
  });
  const [editCar, setEditCar] = useState<Car | null>(null);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const carData = await fetchCars();
        setCars(carData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editCar) {
        await updateCar(editCar._id, newCar);
        setCars((prevCars) => prevCars.map(car => (car._id === editCar._id ? { ...editCar, ...newCar } : car)));
        setEditCar(null);
      } else {
        const response = await addCar(newCar);
        setCars((prevCars) => [...prevCars, response]);
      }
      setNewCar({ model: '', plate_number: '', color: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCar(id);
      setCars((prevCars) => prevCars.filter(car => car._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  const handleEdit = (car: Car) => {
    setEditCar(car);
    setNewCar({ model: car.model, plate_number: car.plate_number, color: car.color });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Cars</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="model"
          value={newCar.model}
          onChange={handleInputChange}
          placeholder="Model"
          required
        />
        <input
          type="text"
          name="plate_number"
          value={newCar.plate_number}
          onChange={handleInputChange}
          placeholder="Plate Number"
          required
        />
        <input
          type="text"
          name="color"
          value={newCar.color}
          onChange={handleInputChange}
          placeholder="Color"
          required
        />
        <button type="submit">{editCar ? 'Edit Car' : 'Add Car'}</button>
      </form>

      <div>
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <span>{car.model} - Plate: {car.plate_number} - Color: {car.color}</span>
              <button onClick={() => handleEdit(car)} style={{ marginLeft: '10px' }}>Edit</button>
              <button onClick={() => handleDelete(car._id)} style={{ marginLeft: '10px' }}>Delete</button>
            </div>
          ))
        ) : (
          <p>No cars available.</p>
        )}
      </div>
    </div>
  );
}