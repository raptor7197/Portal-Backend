import React from 'react';

const Card = ({ size, title, tags }) => {
  const cardSizes = {
    small: 'h-48',
    medium: 'w-1/2 h-1/3',
    large: 'h-2/3',
    extralarge: 'w-full',
    heightlarge: 'h-2/3',
    heightextralarge: 'h-2/3',
  };

  return (
    <div className={`bg-gray-100 p-4 rounded shadow ${cardSizes[size]} border-black border-2`}>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="flex flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-sm bg-blue-200 text-blue-800 rounded-full px-2 py-1 mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
