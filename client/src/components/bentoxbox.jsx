import React from 'react';
import Card from '../components/card';

const BentoBox = () => {
  const cards = [
    { size: 'small', title: 'App A', tags: ['app'] },
    { size: 'medium', title: 'Website B', tags: ['web'] },
    { size: 'heightLarge', title: 'App J', tags: ['app'] },
    { size: 'small', title: 'AI Project C', tags: ['ai'] },
    { size: 'extralarge', title: 'App D', tags: ['app'] },
    { size: 'medium', title: 'Website E', tags: ['web'] },
    { size: 'small', title: 'AI Project F', tags: ['ai'] },
    { size: 'small', title: 'App G', tags: ['app'] },
    { size: 'extralarge', title: 'Website H', tags: ['web'] },
    { size: 'large', title: 'AI Project I', tags: ['ai'] },
    { size: 'heightextralarge', title: 'App K', tags: ['app'] },
    { size: 'small', title: 'Website L', tags: ['web'] },
    { size: 'medium', title: 'AI Project M', tags: ['ai'] },
    { size: 'small', title: 'App N', tags: ['app'] },
    // Add more card data as needed
  ];

  // Function to chunk the cards array into groups of 4
  const chunkArray = (arr, chunkSize) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArr.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArr;
  };

  // Divide cards into chunks of 4
  const chunkedCards = chunkArray(cards, 4);

  return (
    <div className="flex flex-row flex-wrap gap-2" id='projects'>
      {chunkedCards.map((chunk, index) => (
        <div key={index} className="flex flex-wrap gap-4">
          {chunk.map((card, cardIndex) => (
            <Card
              key={cardIndex}
              size={card.size}
              title={card.title}
              tags={card.tags}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default BentoBox;
