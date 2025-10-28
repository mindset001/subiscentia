import CollectionDetails from '@/components/collections/[id]/details/CollectionDetails';
import { notFound } from 'next/navigation';

type DetailsPageProps = {
  params: {
    id: string;
  };
};

export default function DetailsPage({ params }: DetailsPageProps) {
  if (!params?.id) return notFound();
  return <CollectionDetails collectionId={params.id} />;
}
