'use client';

import React, { useRef, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react';

interface Doctor {
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviews: number;
  patients: number;
  income: string;
}

const defaultDoctors: Doctor[] = [
  {
    name: "Dra. Camila Alves",
    specialty: "Ortodoncia",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 4.9,
    reviews: 321,
    patients: 632,
    income: "Gs. 17.529.000",
  },
  {
    name: "Dr. Juan Pereira",
    specialty: "Implantología",
    image: "https://randomuser.me/api/portraits/men/31.jpg",
    rating: 4.8,
    reviews: 289,
    patients: 590,
    income: "Gs. 13.300.000",
  },
  {
    name: "Dra. Mariana Costa",
    specialty: "Endodoncia",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.7,
    reviews: 310,
    patients: 610,
    income: "Gs. 15.400.000",
  },
  {
    name: "Dr. Pedro Silva",
    specialty: "Periodoncia",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4.8,
    reviews: 278,
    patients: 570,
    income: "Gs. 12.950.000",
  },
];

interface DoctorCarouselProps {
  doctors?: Doctor[];
}

export const DoctorCarousel: React.FC<DoctorCarouselProps> = ({ doctors = defaultDoctors }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', skipSnaps: false });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {doctors.map((doctor, idx) => (
            <div key={idx} className="relative flex-none w-64 h-96 rounded-xl overflow-hidden shadow-xl group">
              <img src={doctor.image} alt={doctor.name} className="object-cover w-full h-full" />
              <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-[#3b82f6]/25 backdrop-blur-md text-white p-3 shadow-md">
                <h3 className="text-base font-semibold leading-tight">{doctor.name}</h3>
                <p className="text-xs">{doctor.specialty}</p>
                <div className="flex items-center gap-1 text-sm mt-1">
                  <span className="text-yellow-400 text-sm">★</span>
                  {doctor.rating} <span className="text-white/80 text-xs">({doctor.reviews})</span>
                </div>
                <p className="text-xs mt-1">{doctor.patients} pacientes</p>
                <p className="text-[#bbf7d0] font-semibold text-sm mt-1">{doctor.income}</p>
                <p className="text-[11px] text-white/90 leading-tight">Ingresos del mes</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Botões de navegação */}
      <button onClick={scrollPrev} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 shadow rounded-full p-2 border border-gray-200 dark:border-gray-700 transition disabled:opacity-40" aria-label="Anterior" style={{left: -24}}>
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button onClick={scrollNext} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 shadow rounded-full p-2 border border-gray-200 dark:border-gray-700 transition disabled:opacity-40" aria-label="Próximo" style={{right: -24}}>
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
      </button>
    </div>
  );
}; 