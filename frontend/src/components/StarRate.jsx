import React from "react";
import { Star } from "lucide-react";

export default function StarRate(){
    const [rating, setRating] =React.useState(null);
    const [hover, setHover] = React.useState("null"); 

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
                    onClick={() => setRating(currentRate)}
                    className="hidden"
                    />

                    <Star 
                    size = {20}
                    className={`transition-colors ${
                        currentRate <= (hover || rating) 
                        ? "text-blue-600 fill-blue-600" 
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