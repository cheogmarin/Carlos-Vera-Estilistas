/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  Phone, 
  MapPin, 
  Star, 
  CheckCircle2, 
  Scissors, 
  Palette, 
  Sparkles, 
  Calendar, 
  Heart, 
  ShieldCheck, 
  Info,
  Share2,
  Send,
  Facebook,
  Linkedin,
  MessageCircle,
  Menu,
  X,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
const heroImage = 'https://i.ibb.co/pj5LHWc5/de-frente-peinando.png';
const aboutImage = 'https://i.ibb.co/sJPWyyXB/W-actriz.jpg';

// --- Types ---
type ServiceCategory = {
  title: string;
  icon: React.ReactNode;
  items: string[];
};

type RatingState = 'idle' | 'rating' | 'positive' | 'negative';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Sobre Nosotros', href: '#about' },
    { name: 'Servicios', href: '#services' },
    { name: 'Galería', href: '#gallery' },
    { name: 'InfoTips', href: '#tips' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex flex-col">
          <span className={`text-2xl font-display font-bold tracking-tighter ${scrolled ? 'text-brand-gold' : 'text-white'}`}>
            CARLOS VERA
          </span>
          <span className={`text-[10px] uppercase tracking-[0.2em] font-medium ${scrolled ? 'text-gray-500' : 'text-white/80'}`}>
            Estilistas
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium uppercase tracking-widest hover:text-brand-gold transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className={scrolled ? 'text-gray-800' : 'text-white'} /> : <Menu className={scrolled ? 'text-gray-800' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium uppercase tracking-widest text-gray-700 hover:text-brand-gold"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ServiceCard = ({ category }: { category: ServiceCategory; key?: React.Key }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-2xl shadow-sm border border-brand-nude hover:shadow-md transition-all"
  >
    <div className="w-12 h-12 blue-accent rounded-full flex items-center justify-center text-brand-gold mb-6">
      {category.icon}
    </div>
    <h3 className="text-xl font-display font-bold mb-4 text-gray-900">{category.title}</h3>
    <ul className="space-y-2">
      {category.items.map((item, idx) => (
        <li key={idx} className="text-gray-600 text-sm flex items-start">
          <ChevronRight className="w-4 h-4 text-brand-gold mt-0.5 mr-2 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

const ReputationManager = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [state, setState] = useState<RatingState>('idle');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (value: number) => {
    setRating(value);
    if (value >= 4) {
      setState('positive');
    } else {
      setState('negative');
    }
  };

  const reset = () => {
    setRating(0);
    setState('idle');
    setFeedback('');
    setSubmitted(false);
  };

  const handleSubmitFeedback = () => {
    setSubmitted(true);
    setTimeout(() => {
      reset();
    }, 3000);
  };

  return (
    <section className="py-20 bg-brand-nude/30">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Tu opinión nos importa</h2>
        <p className="text-gray-600 mb-10">Ayúdanos a seguir brindando el mejor servicio en el oriente del país.</p>

        <div className="bg-white p-10 rounded-3xl shadow-xl border border-white">
          <AnimatePresence mode="wait">
            {state === 'idle' || state === 'rating' ? (
              <motion.div 
                key="rating"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <p className="text-lg font-medium mb-6">¿Cómo calificarías tu experiencia?</p>
                <div className="flex justify-center space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => handleRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star 
                        className={`w-10 h-10 ${ (hover || rating) >= star ? 'fill-brand-gold text-brand-gold' : 'text-gray-300' }`} 
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : state === 'positive' ? (
              <motion.div 
                key="positive"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-display font-bold">¡Muchas gracias por tu apoyo!</h3>
                <p className="text-gray-600">Nos alegra saber que tuviste una excelente experiencia. ¿Podrías compartir tu reseña en Google para que otros nos conozcan?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="https://www.google.com/maps/search/Carlos+Vera+Estilistas+Lecheria" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-brand-gold text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all flex items-center justify-center"
                  >
                    Publicar en Google Maps
                  </a>
                  <button onClick={reset} className="text-gray-500 underline text-sm">Volver</button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="negative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {submitted ? (
                  <div className="py-10">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-display font-bold">¡Mensaje Recibido!</h3>
                    <p className="text-gray-600 mt-2">Gracias por tu mensaje. El Team Carlos Vera revisará tu caso personalmente.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-display font-bold">Lamentamos no haber cumplido tus expectativas</h3>
                    <p className="text-gray-600">Tu satisfacción es nuestra prioridad. Por favor, cuéntanos qué sucedió para que podamos mejorar de inmediato.</p>
                    <textarea 
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none min-h-[120px]"
                      placeholder="Escribe tus comentarios aquí de forma privada..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        onClick={handleSubmitFeedback}
                        className="bg-gray-800 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all flex items-center justify-center"
                      >
                        Enviar Comentario Privado
                      </button>
                      <button onClick={reset} className="text-gray-500 underline text-sm">Cancelar</button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const SocialShare = () => {
  const shareUrl = window.location.href;
  const title = "Carlos Vera Estilistas - ¡Personalizar la naturalidad es todo un arte!";

  const platforms = [
    { name: 'WhatsApp', icon: <MessageCircle className="w-5 h-5" />, color: 'bg-[#25D366]', url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}` },
    { name: 'Telegram', icon: <Send className="w-5 h-5" />, color: 'bg-[#0088cc]', url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}` },
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, color: 'bg-[#1877F2]', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, color: 'bg-[#0A66C2]', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center mt-8">
      {platforms.map((p) => (
        <a 
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${p.color} text-white p-3 rounded-full hover:scale-110 transition-transform shadow-md`}
          title={`Compartir en ${p.name}`}
        >
          {p.icon}
        </a>
      ))}
    </div>
  );
};

export default function App() {
  const [selectedGallery, setSelectedGallery] = useState<{ images: string[], index: number } | null>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroTextY = useTransform(scrollY, [0, 500], [0, -50]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const aboutRef = React.useRef(null);
  const servicesRef = React.useRef(null);
  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  const { scrollYProgress: servicesScroll } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"]
  });
  const aboutImageY = useTransform(aboutScroll, [0, 1], [0, 80]);
  const servicesBgY = useTransform(servicesScroll, [0, 1], [-100, 100]);

  const services: ServiceCategory[] = [
    {
      title: "Tratamientos Capilares",
      icon: <Sparkles />,
      items: ["Cirugía Capilar", "Queratina", "Hidratación Profunda", "Desriz"]
    },
    {
      title: "Colorimetría",
      icon: <Palette />,
      items: ["Tintes", "Mechas (Damas y Caballeros)", "Reflejos", "Transparencias"]
    },
    {
      title: "Cortes y Estilo",
      icon: <Scissors />,
      items: ["Cortes para Damas", "Últimas Tendencias", "Asesoría de Imagen"]
    },
    {
      title: "Eventos Especiales",
      icon: <Calendar />,
      items: ["Peinados para Novias", "15 Años", "Graduaciones"]
    },
    {
      title: "Belleza Integral",
      icon: <Heart />,
      items: ["Maquillaje Profesional", "Manicure y Pedicure", "Pestañas Postizas", "Depilación"]
    }
  ];

  return (
    <div className="min-h-screen selection:bg-brand-gold selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={heroImage} 
            alt="Carlos Vera Estilista" 
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <motion.div 
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl text-white font-bold mb-6 tracking-tight">
              Carlos Vera <span className="text-brand-gold italic">Estilistas</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light italic mb-10">
              "¡Personalizar la naturalidad es todo un arte!"
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#services" className="bg-brand-gold text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
                Ver Servicios
              </a>
              <a href="#contact" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
                Reservar Cita
              </a>
            </div>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <motion.img 
                  style={{ y: aboutImageY, scale: 1.1 }}
                  src={aboutImage} 
                  alt="Carlos Vera trabajando" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-brand-gold p-8 rounded-3xl text-white shadow-xl hidden lg:block max-w-xs">
                <p className="text-sm font-medium italic">"Mi mayor honor es servir a la Patrona de Oriente, la Virgen del Valle, desde hace 13 años."</p>
                <p className="text-xs mt-4 opacity-80">— Carlos Vera</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-sm">Trayectoria y Pasión</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Un legado de belleza en el Oriente Venezolano</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Nacido en Carúpano y proveniente de una familia católica devota, Carlos Vera ha consolidado una carrera excepcional marcada por la sensibilidad y el profesionalismo. Su reconocimiento trasciende fronteras, siendo el estilista oficial de la <span className="font-bold text-brand-gold">Virgen del Valle</span> en la Isla de Margarita desde el año 2011.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Junto al <span className="font-bold italic">Team Carlos Vera</span>, ofrece asesorías de imagen personalizadas, fusionando las últimas tendencias mundiales con la esencia natural de cada cliente.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 blue-accent rounded-full flex items-center justify-center text-brand-gold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm">Profesionalismo</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 blue-accent rounded-full flex items-center justify-center text-brand-gold">
                    <Heart className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm">Dedicación</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 blue-accent rounded-full flex items-center justify-center text-brand-gold">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm">Responsabilidad</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 blue-accent rounded-full flex items-center justify-center text-brand-gold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm">Precios Accesibles</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="relative py-24 overflow-hidden">
        <motion.div 
          style={{ y: servicesBgY }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://i.ibb.co/DHjdhwYR/fondo-2.png" 
            alt="Salon Background" 
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-sm">Nuestro Catálogo</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">Servicios de Excelencia</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} category={service} />
            ))}
          </div>
        </div>
      </section>

      {/* InfoTips & Hygiene Section */}
      <section id="tips" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* InfoTips */}
            <div className="bg-brand-sand/30 p-10 rounded-3xl border border-brand-sand">
              <div className="flex items-center space-x-4 mb-6">
                <Info className="text-brand-gold w-8 h-8" />
                <h3 className="text-2xl font-display font-bold">InfoTips: Belleza Natural</h3>
              </div>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <h4 className="font-bold mb-2 text-brand-gold">Champú Casero Orgánico</h4>
                  <p className="text-sm text-gray-600">Mezcla una taza de agua destilada con 1/4 de taza de jabón de castilla líquido y una cucharada de aceite de coco. Añade unas gotas de tu aceite esencial favorito para un aroma único y natural.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <h4 className="font-bold mb-2 text-brand-gold">Hidratación Post-Playa</h4>
                  <p className="text-sm text-gray-600">Después de un día en nuestras costas, aplica una mascarilla de aloe vera natural por 20 minutos para restaurar el brillo y la suavidad de tu cabello.</p>
                </div>
              </div>
            </div>

            {/* Hygiene */}
            <div className="bg-blue-50 p-10 rounded-3xl border border-blue-100">
              <div className="flex items-center space-x-4 mb-6">
                <ShieldCheck className="text-blue-600 w-8 h-8" />
                <h3 className="text-2xl font-display font-bold">Compromiso con tu Seguridad</h3>
              </div>
              <p className="text-gray-600 mb-6">En Carlos Vera Estilistas, tu salud es lo primero. Cumplimos con los más estrictos protocolos de bioseguridad:</p>
              <ul className="space-y-4">
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Desinfección profunda de herramientas después de cada uso.
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Uso de materiales desechables y toallas esterilizadas.
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Ambientes ventilados y purificados constantemente.
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Personal capacitado en normas de higiene internacional.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-sm">Nuestro Arte</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">Galería de Transformaciones</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Cada cliente es un lienzo. Aquí te mostramos algunos de nuestros trabajos más recientes y destacados.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                url: 'https://i.ibb.co/rK42tYV3/images-4-old.png', 
                title: 'Estilismo Profesional',
                gallery: [
                  'https://i.ibb.co/rK42tYV3/images-4-old.png',
                  'https://i.ibb.co/Q7KghYBW/images-1.jpg',
                  'https://i.ibb.co/Z7z8K14/images-2.jpg',
                  'https://i.ibb.co/mFhXNMSH/con-texto.jpg'
                ]
              },
              { 
                url: 'https://i.ibb.co/QFDvgwKV/image-1.png', 
                title: 'Maquillaje de Gala',
                gallery: [
                  'https://i.ibb.co/QFDvgwKV/image-1.png',
                  'https://i.ibb.co/Xkf9rsm7/images.jpg',
                  'https://i.ibb.co/sJ2TQdTV/images-4.jpg',
                  'https://i.ibb.co/5xGjGmHd/images-2.jpg'
                ]
              },
              { 
                url: 'https://i.ibb.co/mVTbzd3g/principal.png', 
                title: 'Nuestro Salón',
                gallery: [
                  'https://i.ibb.co/mVTbzd3g/principal.png',
                  'https://i.ibb.co/k2TjNkt8/images-1.jpg',
                  'https://i.ibb.co/tMVkDnw9/images.jpg'
                ]
              },
              { 
                url: 'https://i.ibb.co/PGDKkfxK/COLOR-0.png', 
                title: 'Colorimetría Avanzada',
                gallery: [
                  'https://i.ibb.co/PGDKkfxK/COLOR-0.png',
                  'https://i.ibb.co/ZRKrM1nn/color2.jpg',
                  'https://i.ibb.co/rG1GP09d/color4.jpg'
                ]
              },
              { 
                url: 'https://i.ibb.co/nsZYhpnC/IMAGES-2-NOVIA.png', 
                title: 'Peinados de Novia',
                gallery: [
                  'https://i.ibb.co/nsZYhpnC/IMAGES-2-NOVIA.png',
                  'https://i.ibb.co/fYrZQ0LW/images-3.jpg',
                  'https://i.ibb.co/2YphMRFb/images-1.jpg',
                  'https://i.ibb.co/LXZpQ6hj/images.jpg'
                ]
              },
              { url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1000', title: 'Herramientas de Calidad' }
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square"
                onClick={() => {
                  if ('gallery' in img && img.gallery) {
                    setSelectedGallery({ images: img.gallery, index: 0 });
                  } else {
                    setSelectedGallery({ images: [img.url], index: 0 });
                  }
                }}
              >
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">{img.title}</p>
                    <span className="text-brand-gold text-sm uppercase tracking-widest">Ver más</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-brand-gold transition-colors z-[110]"
              onClick={() => setSelectedGallery(null)}
            >
              <X className="w-10 h-10" />
            </button>

            {selectedGallery.images.length > 1 && (
              <>
                <button 
                  className="absolute left-4 md:left-10 text-white hover:text-brand-gold transition-colors z-[110] bg-black/20 p-2 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedGallery({
                      ...selectedGallery,
                      index: (selectedGallery.index - 1 + selectedGallery.images.length) % selectedGallery.images.length
                    });
                  }}
                >
                  <ChevronLeft className="w-10 h-10" />
                </button>
                <button 
                  className="absolute right-4 md:right-10 text-white hover:text-brand-gold transition-colors z-[110] bg-black/20 p-2 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedGallery({
                      ...selectedGallery,
                      index: (selectedGallery.index + 1) % selectedGallery.images.length
                    });
                  }}
                >
                  <ChevronRight className="w-10 h-10" />
                </button>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white font-medium bg-black/40 px-4 py-1 rounded-full backdrop-blur-sm">
                  {selectedGallery.index + 1} / {selectedGallery.images.length}
                </div>
              </>
            )}

            <div className="w-full h-full flex items-center justify-center" onClick={() => setSelectedGallery(null)}>
              <motion.img
                key={selectedGallery.index}
                initial={{ scale: 0.9, opacity: 0, x: 20 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0.9, opacity: 0, x: -20 }}
                src={selectedGallery.images[selectedGallery.index]}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reputation Section */}
      <ReputationManager />

      {/* Contact & Location Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div>
                <h2 className="text-4xl font-display font-bold mb-6">Visítanos en Lechería</h2>
                <p className="text-gray-600 text-lg">Estamos ubicados en el corazón de la ciudad, listos para transformar tu imagen.</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 blue-accent rounded-full flex items-center justify-center text-brand-gold flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Dirección</h4>
                    <p className="text-gray-600">Av. Principal de Lechería, C.C. Coconut Center, Planta Baja, Local 05, frente al Banco de Venezuela. Lechería, Estado Anzoátegui.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 blue-accent rounded-full flex items-center justify-center text-brand-gold flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Teléfonos</h4>
                    <p className="text-gray-600">(0281) 281.8266 / (0281) 281.8763</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 blue-accent rounded-full flex items-center justify-center text-brand-gold flex-shrink-0">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Redes Sociales</h4>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">@carlosveraestilistas</a>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-4 text-center lg:text-left">Comparte nuestro arte:</p>
                <SocialShare />
              </div>
            </div>

            <div className="h-[450px] rounded-3xl overflow-hidden shadow-lg bg-gray-100 border border-gray-200 relative group">
              <iframe 
                src="https://www.google.com/maps?q=Carlos+Vera+Estilistas+Lecheria+Coconut+Center&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Carlos Vera Estilistas"
                className="grayscale hover:grayscale-0 transition-all duration-700"
              ></iframe>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <a 
                  href="https://maps.app.goo.gl/bmriKsnKS3cDSrfc6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-brand-gold px-4 py-2 rounded-full font-bold shadow-lg flex items-center space-x-2 text-sm"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Abrir en Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-10">
            <h2 className="text-3xl font-display font-bold tracking-tighter mb-2">CARLOS VERA</h2>
            <p className="text-brand-gold text-sm tracking-[0.4em] uppercase">Estilistas</p>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Especialistas en asesoría de imagen con las últimas tendencias mundiales. 
            Dedicación, respeto y profesionalismo en cada detalle.
          </p>
          <div className="flex justify-center space-x-6 mb-10">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Share2 /></a>
          </div>
          <div className="border-t border-white/10 pt-10 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Carlos Vera Estilistas. Todos los derechos reservados.</p>
            <p className="mt-2 italic">"¡Personalizar la naturalidad es todo un arte!"</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
