import CollectionDetails from '@/components/collections/[id]/details/CollectionDetails';
import { notFound } from 'next/navigation';

type DetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DetailsPage({ params }: DetailsPageProps) {
  const { id } = await params; // ✅ unwrap the async params

  if (!id) return notFound();

  return <CollectionDetails collectionId={id} />;
}
