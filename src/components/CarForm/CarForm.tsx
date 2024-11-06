import React from 'react';
import styles from '@/styles/CarForm.module.css';

type CarFormProps = {
    newCar: { model: string; plate_number: string; color: string };
    setNewCar: React.Dispatch<React.SetStateAction<{ model: string; plate_number: string; color: string }>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    editCar: boolean;
}


export default function CarForm({ newCar, setNewCar, handleSubmit, editCar }: CarFormProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCar((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type="text"
                name="model"
                value={newCar.model}
                onChange={handleInputChange}
                placeholder="Model"
                className={styles.input}
                required
            />
            <input
                type="text"
                name="plate_number"
                value={newCar.plate_number}
                onChange={handleInputChange}
                placeholder="Plate Number"
                className={styles.input}
                required
            />
            <input
                type="text"
                name="color"
                value={newCar.color}
                onChange={handleInputChange}
                placeholder="Color"
                className={styles.input}
                required
            />
            <button type="submit" className={styles.button}>{editCar ? 'Edit Car' : 'Add Car'}</button>
        </form>
    );
};

