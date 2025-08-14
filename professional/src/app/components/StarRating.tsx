export const StarRating = ({ rating }: { rating: number }) => {
  const stars: JSX.Element[] = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    } else if (rating > i - 1) {
      stars.push(<span key={i} className="text-yellow-400">½</span>);
    } else {
      stars.push(<span key={i} className="text-yellow-400">☆</span>);
    }
  }
  return <div className="flex text-sm">{stars}</div>;
};


