
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto border-t py-6 bg-background">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground">
          &copy; {currentYear} Quinten's E-Portfolio. All rights reserved.
        </div>
        <div className="text-sm text-muted-foreground">
          2CCS01 - Applied Computer Science / Electronics - ICT
        </div>
      </div>
    </footer>
  );
};

export default Footer;
