import React from 'react';
import CV from './components/cv/CV';

const routes = {
  cv: "/cv",
  about: "/about",
  projects: "/projects",
  contact: "/contact",
  blog: "/blog"
};

export const RouteComponents: Record<string, React.FC> = {
  [routes.cv]: CV
};

export default routes; 