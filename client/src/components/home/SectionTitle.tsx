import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <h2 className="text-2xl md:text-3xl font-heading text-text-primary mb-6">
      {children}
    </h2>
  );
};

export default SectionTitle;
