'use client';
import { useEffect, useState } from "react";
import { fetchCars, addCar, updateCar, deleteCar } from '@/services/carServices';
import CarForm from '../components/CarForm/CarForm';
import CarList from '../components/CarList/CarList';
import { Car } from '../types/car';
import styles from '@/styles/mainPage.module.css';

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
    <div className={styles.container}>
      <h1 className={styles.title}>Cars</h1>
      <CarForm newCar={newCar} setNewCar={setNewCar} handleSubmit={handleSubmit} editCar={!!editCar} />
      <CarList cars={cars} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
}