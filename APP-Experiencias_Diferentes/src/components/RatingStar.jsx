import { Rating } from "@material-tailwind/react";

export function DefaultRating() {
  return <Rating value={4} />;
}

export function RatingValue() {
  return (
      <div>
      <Rating 
        className="text-amber-400 w-5"
      />
    </div>
  );
}

export function ReadonlyRating() {
  return <Rating value={4} readonly className="text-amber-400 w-5"/>;
}