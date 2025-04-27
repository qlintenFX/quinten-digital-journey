import React, { Suspense, lazy } from 'react';
import Layout from '@/components/layout/Layout';

// Lazy load Home component
const Home = lazy(() => import('./Home'));

const Index = () => {
  return (
    <Layout>
      <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]">Loading content...</div>}>
        <Home />
      </Suspense>
    </Layout>
  );
};

export default Index;
