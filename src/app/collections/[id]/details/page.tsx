import CollectionDetails from '@/components/collections/[id]/details/CollectionDetails';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default async function DetailsPage({ params }: Props) {
  // Unwrap params if it's a Promise (Next.js 14+)
  const resolvedParams = await params;
  if (!resolvedParams.id) return notFound();
  return <CollectionDetails collectionId={resolvedParams.id} />;
}
