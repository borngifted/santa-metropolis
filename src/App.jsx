import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import './App.css';

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) return null;

  // Convert YouTube URL to embed format
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.includes('youtu.be/') 
      ? url.split('youtu.be/')[1].split('?')[0]
      : url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose}>×</button>
        <h2 className="video-modal-title">ATLAS THE REINDEER FILM</h2>
        <div className="video-container">
          <iframe
            src={embedUrl}
            width="100%"
            height="500"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; fullscreen; picture-in-picture"
            title="Atlas The Reindeer Film"
            style={{ borderRadius: '10px' }}
          />
        </div>
      </div>
    </div>
  );
};

const VideoSection = ({ children, videoSrc, className }) => {
  return (
    <section className={`video-section ${className}`}>
      <div className="video-background">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>
      <div className="section-content">
        {children}
      </div>
    </section>
  );
};

const SnowflakeParticle = ({ delay }) => {
  return (
    <div 
      className="snowflake" 
      style={{ 
        animationDelay: `${delay}s`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${8 + Math.random() * 10}s`
      }}
    >
      {['❄', '❅', '❆', '✦', '✧', '⋆'][Math.floor(Math.random() * 6)]}
    </div>
  );
};

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress">
      <div className="scroll-progress-bar" style={{ height: `${scrollProgress}%` }}></div>
    </div>
  );
};

function App() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoUrl = "https://youtu.be/x5_ahQVnEuA";

  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  return (
    <div className="App">
      {/* Snowflake Particles */}
      <div className="snowflakes">
        {Array.from({ length: 30 }, (_, i) => (
          <SnowflakeParticle key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Hero Section */}
      <VideoSection 
        videoSrc="/scene_1.mp4" 
        className="hero-section"
      >
        <div className="hero-content">
          <h1 className="hero-title">Santa's Metropolis</h1>
          <h2 className="hero-subtitle">Atlas & The Elves</h2>
          <p className="hero-tagline">Hidden beneath the polar ice, a steampunk Christmas awaits</p>
          <button className="premiere-button" onClick={openVideoModal}>
            <Play size={24} />
            Watch Premiere
          </button>
        </div>
      </VideoSection>

      {/* The Hidden Metropolis */}
      <VideoSection 
        videoSrc="/metropolis.mp4" 
        className="metropolis-section"
      >
        <div className="story-content">
          <h2 className="section-title">The Hidden Metropolis</h2>
          <p className="story-text">
            Beneath the polar ice lies a secret world where Christmas magic meets steampunk innovation. 
            Clockwork skyscrapers pierce aurora-lit skies, while brass pipes carry the dreams of children 
            across neon-lit streets. This is Santa's Metropolis, where the impossible becomes reality.
          </p>
        </div>
      </VideoSection>

      {/* Atlas the Reindeer */}
      <VideoSection 
        videoSrc="/new_atlas.mp4" 
        className="atlas-section"
      >
        <div className="story-content">
          <h2 className="section-title">Atlas the Reindeer</h2>
          <p className="story-text">
            Meet Atlas, a young reindeer chosen as the next guiding light. His antlers glow with 
            mysterious energy, and his brave heart will lead the way through the greatest storm 
            the metropolis has ever seen. The future of Christmas rests in his hooves.
          </p>
        </div>
      </VideoSection>

      {/* The Brave Elves */}
      <VideoSection 
        videoSrc="/elves.mp4" 
        className="elves-section"
      >
        <div className="story-content">
          <h2 className="section-title">The Brave Elves</h2>
          <p className="story-text">
            Pip and Jingles, two extraordinary elves with magical powers. Pip can 'whoop' through 
            time and space, while Jingles can tune into lost reindeer through echoes. Together, 
            they'll help Atlas save Christmas and protect their beloved metropolis.
          </p>
        </div>
      </VideoSection>

      {/* The Great Storm */}
      <VideoSection 
        videoSrc="/new_storm.mp4" 
        className="storm-section"
      >
        <div className="story-content">
          <h2 className="section-title">The Great Storm</h2>
          <p className="story-text">
            An unprecedented blizzard threatens the metropolis. When a baby reindeer goes missing 
            in the storm, it's up to Atlas and the elves to brave the tornado winds and bring 
            everyone home safely. The greatest test of courage begins now.
          </p>
        </div>
      </VideoSection>

      {/* Santa's Wisdom */}
      <VideoSection 
        videoSrc="/new_santa.mp4" 
        className="santa-section"
      >
        <div className="story-content">
          <h2 className="section-title">Santa's Wisdom</h2>
          <p className="story-text">
            Santa, the wise and funky leader of the metropolis, knows that every generation must 
            step forward. He believes in Atlas and the power of the next generation to carry 
            Christmas forward into a bright, magical future.
          </p>
        </div>
      </VideoSection>

      {/* The Resolution */}
      <VideoSection 
        videoSrc="/new_resolution.mp4" 
        className="resolution-section"
      >
        <div className="story-content">
          <h2 className="section-title">The Resolution</h2>
          <p className="story-text">
            Through courage, friendship, and the magic of Christmas, Atlas creates a path of light 
            through the storm. The metropolis is saved, and a new legend is born. The future of 
            Christmas is in good hooves, and the magic lives on.
          </p>
        </div>
      </VideoSection>

      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={closeVideoModal} 
        videoUrl={videoUrl} 
      />
    </div>
  );
}

export default App;

