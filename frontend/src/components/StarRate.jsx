import React from "react";
import { Star } from "lucide-react";

export default function StarRate({ value, onChange, error }){
    const [rating, setRating] = React.useState(value);
    const [hover, setHover] = React.useState(null); 

    return (
        <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, index) => {
            const currentRate = index + 1;
            return (
                <label key={index} className="cursor-pointer">
                    <input 
                    type = "radio" 
                    name = "rate"
                    value={currentRate}
                    onClick={() => {
                        setRating(currentRate);
                        onChange && onChange(currentRate);
                    }}
                    className="hidden"
                    />

                    <Star 
                    size = {20}
                    className={`transition-colors ${
                        currentRate <= (hover || rating) 
                        ? "text-yellow-500 fill-yellow-500" 
                        : error 
                          ? "text-red-300 fill-red-300"
                          : "text-gray-300 fill-gray-300"
                    }`}
                    onMouseEnter={() => setHover(currentRate)}
                    onMouseLeave={() => setHover(null)}
                    />
                </label>
                );
        })}
        </div>
    );
}