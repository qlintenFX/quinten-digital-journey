
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import ProjectDetail from '@/components/projects/ProjectDetail';
import NotFound from './NotFound';

const Index = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default Index;
