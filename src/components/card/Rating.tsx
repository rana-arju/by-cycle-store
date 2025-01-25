import React from "react";
import star1 from "../../assets/rating/fullStar.png";
import star2 from "../../assets/rating/helfStar.png";
import star3 from "../../assets/rating/emptyStar.png";

interface RatingProps {
  rating: number; // Current rating (e.g., 3.5)
  maxRating?: number; // Maximum rating value (default is 5)
}

const Rating: React.FC<RatingProps> = ({ rating, maxRating = 5 }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      if (rating >= i) {
        // Full Star
        stars.push(<img key={i} src={star1} alt="star" style={{height: "15px", width: "15px"}} />);
      } else if (rating >= i - 0.5) {
        // Half Star
        stars.push(<img key={i} src={star2} alt="star" style={{height: "15px", width: "15px"}} />);
      } else {
        // Empty Star
        stars.push(<img key={i} src={star3} alt="star" style={{height: "15px", width: "15px"}} />);
      }
    }
    return stars;
  };

  return <div style={{ display: "flex", gap: "4px" }}>{renderStars()}</div>;
};

export default Rating;
