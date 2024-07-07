import React from 'react';

interface ClassificaoEstrelaProps {
  rating: number;
  setRating: (rating: number) => void;
}

const ClasificaoEstrelas: React.FC<ClassificaoEstrelaProps> = ({ rating, setRating }) => {
  const handleRating = (index: number) => {
    setRating(index + 1);
  };

  return (
    <div>
      {[...Array(5)].map((star, index) => (
        <span
          key={index}
          style={{ cursor: 'pointer', color: index < rating ? 'gold' : 'gray' }}
          onClick={() => handleRating(index)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default ClasificaoEstrelas;
