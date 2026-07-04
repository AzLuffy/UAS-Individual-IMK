import React from 'react';

interface UINLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'custom';
}

export default function UINLogo({ className = '', size = 'md' }: UINLogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
    custom: '',
  };

  return (
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Go32TPNw_dvopDc0JP4XOZNmiM4f1-YBa7lHJrioVWNS4KkF5VpMSW4&s=10"
      alt="Logo Fakultas Sains dan Teknologi - UIN Syarif Hidayatullah Jakarta"
      className={`object-contain flex-shrink-0 ${sizeClasses[size]} ${className}`}
      referrerPolicy="no-referrer"
    />
  );
}
