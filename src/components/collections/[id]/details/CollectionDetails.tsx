import React from 'react';
import Hero from './components/Hero';
import Details from './components/Details';

interface CollectionDetailsProps {
  collectionId: string;
}

function CollectionDetails({ collectionId }: CollectionDetailsProps) {
  return (
    <div>
      <Hero />
      <Details collectionId={collectionId} />
    </div>
  );
}

export default CollectionDetails;