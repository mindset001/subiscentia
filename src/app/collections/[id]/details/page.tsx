import CollectionDetails from '@/components/collections/[id]/details/CollectionDetails';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import { JoinScentJourney } from '@/components/landing';

type DetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DetailsPage({ params }: DetailsPageProps) {
  const { id } = await params; // ✅ unwrap the async params

  if (!id) return notFound();

  return (
    <>
      <Navbar />
      <CollectionDetails collectionId={id} />
      <JoinScentJourney/>
      <Footer />
    </>
  );
}
