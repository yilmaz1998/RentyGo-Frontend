'use client';

import { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import { Car } from '@/types/types';


const page = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axiosInstance.get("/cars");
        setCars(response.data.cars);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };

    fetchCars();
  }, []);

  return (
      <div>
        <h1>Rentygo Home Page</h1>
        {cars.map((car) => (
          <div key={car.id}>
            <h2>{car.brand} {car.model}</h2>
            <p>Year: {car.year}</p>
            <p>Price per day: ${car.pricePerDay}</p>
            <img src={car.imageUrl} className="w-1/5" />
          </div>
        ))}
      </div>
  )
}

export default page