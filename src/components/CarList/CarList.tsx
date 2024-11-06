import CarItem from '../CarItem/CarItem';
import { Car } from '../../types/car';
import styles from '@/styles/CarList.module.css';

interface CarListProps {
    cars: Car[];
    handleEdit: (car: Car) => void;
    handleDelete: (id: string) => Promise<void>;
}

export default function CarList({ cars, handleEdit, handleDelete }: CarListProps) {

    return (
        <div className={styles.carList}>
            <div className={styles.header}>
                <span>Model</span>
                <span>Plate</span>
                <span>Color</span>
                <span>Edit</span>
                <span>Delete</span>
            </div>
            {cars.length > 0 ? (
                cars.map((car) => (
                    <CarItem key={car._id} car={car} handleEdit={handleEdit} handleDelete={handleDelete} />
                ))
            ) : (
                <p>No cars available.</p>
            )}
        </div>
    );
};

