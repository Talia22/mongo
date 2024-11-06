import { Car } from '../../types/car';
import styles from '@/styles/CarItem.module.css';

type CarItemProps = {
    car: Car;
    handleEdit: (car: Car) => void;
    handleDelete: (id: string) => Promise<void>;
}

export default function CarItem({ car, handleEdit, handleDelete }: CarItemProps) {
    return (
        <div className={styles.carItem}>
            <span>{car.model}</span>
            <span>{car.plate_number}</span>
            <span>{car.color}</span>
            <button className={styles.carItemButton} onClick={() => handleEdit(car)}>Edit</button>
            <button className={styles.carItemButton} onClick={() => handleDelete(car._id)}>Delete</button>
        </div>
    );
};
