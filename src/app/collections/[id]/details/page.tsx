import CollectionDetails from '@/components/collections/[id]/details/CollectionDetails';
import { notFound } from 'next/navigation';

// Remove incorrect import. Define local PageProps type below.

export default function DetailsPage({ params }: { params: { id: string } }) {
  if (!params.id) return notFound();
  return <CollectionDetails collectionId={params.id} />;
}
