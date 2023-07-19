'use client';

import { useRouter } from 'next/navigation';

import { Loading } from '@/components/loading';

const Index = () => {
  const router = useRouter();

  router.push('/app/space');

  return <Loading />;
};

export default Index;
