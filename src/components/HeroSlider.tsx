"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  title: string;
  desc: string;
  cta: string;
  image: string;
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[870px] w-full flex items-center justify-center overflow-hidden bg-surface-container-highest">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img 
            alt="Hero Background" 
            className="w-full h-full object-cover" 
            src={slides[currentSlide].image}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-primary/80 to-primary/40"></div>
        </motion.div>
      </AnimatePresence>
      
      <div className="relative z-10 max-w-[1280px] mx-auto px-margin text-white w-full">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl space-y-stack-sm"
          >
            <h1 className="font-display-xl text-display-xl text-white">{slides[currentSlide].title}</h1>
            <p className="font-body-lg text-body-lg text-secondary-fixed opacity-90 leading-relaxed">
              {slides[currentSlide].desc}
            </p>
            <div className="pt-stack-sm">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-tertiary-container text-on-tertiary-container px-8 py-4 rounded-lg font-headline-md hover:bg-tertiary transition-colors duration-300 shadow-lg"
              >
                {slides[currentSlide].cta}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === idx ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
