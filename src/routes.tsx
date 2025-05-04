import React from 'react';

const routes = {
  about: "/about",
  projects: "/projects",
  contact: "/contact",
  blog: "/blog",
  presentation: "/presentation"
};

export const RouteComponents: Record<string, React.FC> = {};

export default routes; 