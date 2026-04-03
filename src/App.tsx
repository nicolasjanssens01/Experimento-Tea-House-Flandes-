import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, Instagram, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDE_IMAGES = [
  {
    url: "https://i.imgur.com/hHht7AC.jpeg",
    caption: "Espacios para conectar, trabajar o actividades grupales"
  },
  {
    url: "https://i.imgur.com/SGPozRB.jpeg",
    caption: "Ambientes cálidos y acogedores"
  },
  {
    url: "https://i.imgur.com/QmaCpjn.jpeg",
    caption: "El lugar perfecto para tus reuniones"
  }
];

const FLAVORS = [
  {
    title: "Meriendas caseras",
    images: [
      "https://i.imgur.com/3sLAKOi.jpeg",
      "https://i.imgur.com/ljAvwwh.jpeg"
    ]
  },
  {
    title: "Tablas de picadas",
    images: [
      "https://i.imgur.com/uMyDoME.jpeg",
      "https://i.imgur.com/PrIP6ye.jpeg"
    ]
  }
];

function MiniSlider({ images, title }: { images: string[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-low shadow-sm group relative">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>
      
      {/* Mini Controls */}
      <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={prevSlide}
          className="w-8 h-8 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center text-on-surface active:scale-90"
        >
          <ChevronLeft size={18} />
        </button>
        <button 
          onClick={nextSlide}
          className="w-8 h-8 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center text-on-surface active:scale-90"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Mini Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-3 bg-white' : 'w-1 bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDE_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDE_IMAGES.length) % SLIDE_IMAGES.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative group">
      <div className="overflow-hidden rounded-xl aspect-[16/10] editorial-shadow bg-surface-container relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={SLIDE_IMAGES[currentIndex].url}
            alt={SLIDE_IMAGES[currentIndex].caption}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity active:scale-90"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDE_IMAGES.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="h-[1px] w-4 bg-outline-variant/30"></div>
        <motion.p 
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-headline italic text-on-surface-variant text-lg text-center"
        >
          {SLIDE_IMAGES[currentIndex].caption}
        </motion.p>
        <div className="h-[1px] w-4 bg-outline-variant/30"></div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* TopAppBar */}
      <nav className="fixed top-0 w-full z-50 glass-header editorial-shadow flex flex-col items-center justify-center px-6 py-8">
        <div className="flex flex-col items-center gap-2">
          <img 
            alt="Tea House Flandes Logo" 
            className="w-auto object-contain h-32 md:h-40" 
            src="https://i.imgur.com/TJB90mK.png" 
          />
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-5 space-y-12 pt-64 pb-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-headline text-4xl md:text-5xl leading-tight text-on-surface"
          >
            Encontrá tu<br />
            <span className="italic text-primary">espacio ideal</span>
          </motion.h1>
          
          <motion.a 
            href="#contacto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block bg-gradient-to-r from-primary to-primary-container text-on-primary px-10 py-4 rounded-lg font-semibold tracking-wide shadow-lg active:scale-95 transition-all duration-300"
          >
            RESERVAR
          </motion.a>
        </section>

        {/* Image Slider Section */}
        <ImageSlider />

        {/* Flavors Section */}
        <section className="grid grid-cols-2 gap-6">
          {FLAVORS.map((item, idx) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-4"
            >
              <MiniSlider images={item.images} title={item.title} />
              <p className="font-semibold uppercase tracking-widest text-primary text-[10px] text-center">
                {item.title}
              </p>
            </motion.div>
          ))}
        </section>

        {/* Contact Section */}
        <section 
          id="contacto" 
          className="bg-surface-container rounded-[2.5rem] px-8 py-12 space-y-10 text-center editorial-shadow"
        >
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Vení a visitarnos</span>
            <h2 className="font-headline text-3xl text-primary">Contacto & Reservas</h2>
          </div>

          <div className="space-y-8">
            <div className="flex justify-center gap-6 md:gap-12">
              <a 
                href="https://wa.me/541160123843" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-active:scale-90">
                  <MessageCircle className="text-secondary" size={24} />
                </div>
                <span className="text-[10px] font-bold tracking-tighter text-on-surface-variant">WHATSAPP</span>
              </a>
              <a 
                href="https://wa.me/541138198404" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-active:scale-90">
                  <MessageCircle className="text-secondary" size={24} />
                </div>
                <span className="text-[10px] font-bold tracking-tighter text-on-surface-variant text-center">
                  SEGUNDO<br />CONTACTO
                </span>
              </a>
              <a 
                href="https://www.instagram.com/teahouseflandes" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-active:scale-90">
                  <Instagram className="text-secondary" size={24} />
                </div>
                <span className="text-[10px] font-bold tracking-tighter text-on-surface-variant text-center">
                  INSTAGRAM<br />
                  <span className="text-primary">@teahouseflandes</span>
                </span>
              </a>
            </div>

            <div className="pt-6 flex flex-col items-center gap-2">
              <MapPin className="text-primary/40" size={20} />
              <p className="text-sm text-on-surface-variant font-medium">Florencio Varela, Buenos Aires</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-high py-10 px-6 text-center">
        <p className="text-[10px] tracking-widest text-on-surface-variant/60 font-bold uppercase">
          © 2026 TEA HOUSE FLANDES · Un lugar distinto para encuentros distintos.
        </p>
      </footer>
    </div>
  );
}
