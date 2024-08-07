import { useState, useContext } from "react";

import rateExperienceService from "../services/rateExperienceService";
import { AuthContext } from "../contexts/AuthContextProvider";

export function DefaultRating() {
  return <ReadonlyRating value={4} />;
}

export function RatingValue({ value, onChange }) {
  let initialValue = 0;
  let currentDate = new Date();
  let experienceDate = new Date(value.date);
  if (value.valoration && experienceDate < currentDate) {
    initialValue = Number(value.valoration);
  }
  const [rating, setRating] = useState(initialValue);
  if (experienceDate > currentDate) {
    return (
      <>
        <ReadonlyRating></ReadonlyRating>
      </>
    );
  }
  const [hoveredValue, setHoveredValue] = useState(null);
  const token = useContext(AuthContext).token;
  const handleMouseEnter = (index) => setHoveredValue(index + 1);
  const handleMouseLeave = () => setHoveredValue(null);

  const handleClick = (index) => {
    setRating(index + 1);
    const formData = { rating: index + 1, experienceId: value.id };
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    rateExperienceService(token, formDataToSend, value);
  };

  return (
    <div>
      <div className="flex justify-center space-x-1">
        {Array.from({ length: 5 }, (_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 cursor-pointer ${
              (hoveredValue || rating) > index
                ? "text-amber-400"
                : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          >
            <path d="M9.049 2.927C9.243 2.364 9.755 2 10.381 2c.625 0 1.138.364 1.332.927l1.162 3.579h3.666c.593 0 1.12.357 1.342.914.22.558.074 1.194-.364 1.616l-2.985 2.626 1.162 3.579c.194.563.074 1.199-.364 1.616-.439.418-1.075.574-1.665.395l-3.016-1.067-3.015 1.067c-.59.179-1.226.023-1.665-.395-.438-.417-.558-1.053-.364-1.616l1.162-3.579-2.985-2.626c-.438-.422-.584-1.058-.364-1.616.222-.557.75-.914 1.342-.914h3.666L9.049 2.927z" />
          </svg>
        ))}
      </div>
    </div>
  );
}

export function ReadonlyRating({ value }) {
  return (
    <div className="flex justify-center space-x-1">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${
            value > index ? "text-amber-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927C9.243 2.364 9.755 2 10.381 2c.625 0 1.138.364 1.332.927l1.162 3.579h3.666c.593 0 1.12.357 1.342.914.22.558.074 1.194-.364 1.616l-2.985 2.626 1.162 3.579c.194.563.074 1.199-.364 1.616-.439.418-1.075.574-1.665.395l-3.016-1.067-3.015 1.067c-.59.179-1.226.023-1.665-.395-.438-.417-.558-1.053-.364-1.616l1.162-3.579-2.985-2.626c-.438-.422-.584-1.058-.364-1.616.222-.557.75-.914 1.342-.914h3.666L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
}
