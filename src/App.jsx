import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import './App.css';
import './video-grid.css';
import './loading.css';

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) return null;

  // Convert YouTube URL to embed format
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.includes('youtu.be/') 
      ? url.split('youtu.be/')[1].split('?')[0]
      : url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&fs=1`;
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose}>×</button>
        <h2 className="video-modal-title">ATLAS - A LEVLSTUDIO PRODUCTION</h2>
        <div className="video-container">
          <iframe
            src={embedUrl}
            width="100%"
            height="500"
            style={{ border: 'none', borderRadius: '10px' }}
            allowFullScreen
            allow="autoplay; fullscreen; picture-in-picture"
            title="Atlas The Reindeer Film"
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

const LoadingScreen = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-gears">
          <div className="gear gear-1">⚙</div>
          <div className="gear gear-2">⚙</div>
          <div className="gear gear-3">⚙</div>
        </div>
        <div className="loading-title">LevlStudio</div>
        <div className="loading-subtitle">Loading ATLAS Demo...</div>
        <div className="loading-bar-container">
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
        <div className="loading-snowflakes">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="loading-snowflake" style={{ 
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}>
              ❄
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoUrl = "https://youtu.be/x5_ahQVnEuA";

  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />
      
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
          <div className="company-logo">🎬</div>
          <h1 className="hero-title">LevlStudio</h1>
          <h2 className="hero-subtitle">Presenting Our Latest Short Film: ATLAS</h2>
          <p className="hero-tagline">State-of-the-art storytelling combining human creativity and advanced technology</p>
          <button className="premiere-button" onClick={openVideoModal}>
            <Play size={24} />
            Watch ATLAS
          </button>
        </div>
      </VideoSection>

      {/* Who We Are */}
      <VideoSection 
        videoSrc="/metropolis.mp4" 
        className="metropolis-section"
      >
        <div className="story-content">
          <h2 className="section-title">💡 Who We Are</h2>
          <div className="company-points">
            <div className="point">• A next-generation studio fusing AI, VFX, and live-action innovation</div>
            <div className="point">• A collective of storytellers, technologists, and artists pushing creative limits</div>
            <div className="point">• Built for speed, scale, and storytelling impact</div>
          </div>
        </div>
      </VideoSection>

      {/* What We Do */}
      <VideoSection 
        videoSrc="/new_atlas.mp4" 
        className="atlas-section"
      >
        <div className="story-content">
          <h2 className="section-title">🎥 What We Do</h2>
          <div className="company-points">
            <div className="point">• Produce short films, feature films, and original TV series</div>
            <div className="point">• Develop original IPs with built-in global audience appeal</div>
            <div className="point">• Use real-time workflows and AI tools to dramatically reduce production costs</div>
            <div className="point">• Deliver cinematic quality content faster, smarter, and bolder</div>
          </div>
        </div>
      </VideoSection>

      {/* Who We Do It For */}
      <VideoSection 
        videoSrc="/elves.mp4" 
        className="elves-section"
      >
        <div className="story-content">
          <h2 className="section-title">🌍 Who We Do It For</h2>
          <div className="company-points">
            <div className="point">• For the world market — with no limits in language, culture, or imagination</div>
            <div className="point">• For streaming platforms, broadcasters, and studios seeking next-gen content</div>
            <div className="point">• For audiences ready for something new — faster, fresher, and global</div>
          </div>
        </div>
      </VideoSection>

      {/* Our Mission */}
      <VideoSection 
        videoSrc="/new_storm.mp4" 
        className="storm-section"
      >
        <div className="story-content">
          <h2 className="section-title">🚀 Our Mission</h2>
          <p className="story-text">
            At LevlStudio, we believe stories have no boundaries. We revolutionize entertainment 
            by combining cutting-edge film technology with human creativity. Our method doesn't 
            just reduce costs — it revolutionizes revenue potential and unlocks unlimited 
            narrative possibilities.
          </p>
        </div>
      </VideoSection>

      {/* Technology & Innovation */}
      <VideoSection 
        videoSrc="/new_resolution.mp4" 
        className="santa-section"
      >
        <div className="story-content">
          <h2 className="section-title">⚡ Technology & Innovation</h2>
          <p className="story-text">
            We leverage AI, real-time VFX, and advanced production workflows to create 
            high-quality content at unprecedented speed and scale. Our technology stack 
            enables us to produce cinematic experiences that were previously impossible 
            within traditional budget constraints.
          </p>
        </div>
      </VideoSection>

      {/* ATLAS - Our Showcase */}
      <VideoSection 
        videoSrc="/new_santa.mp4" 
        className="resolution-section"
      >
        <div className="story-content">
          <h2 className="section-title">✨ ATLAS — A Holiday Tale Like No Other</h2>
          <p className="story-text">
            Experience the future of filmmaking with ATLAS — filled with magic, heart, and 
            cutting-edge technology. This short film demonstrates our capability to create 
            world-class content that rivals major studio productions, delivered faster and 
            more cost-effectively than ever before.
          </p>
        </div>
      </VideoSection>

      {/* Production Showcase Grid */}
      <section className="video-grid-section">
        <div className="grid-content">
          <h2 className="grid-title">Production Showcase</h2>
          <p className="grid-subtitle">Additional footage from our ATLAS production</p>
          <div className="video-grid">
            <div className="grid-video-item">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="grid-video"
              >
                <source src="/atlas.mp4" type="video/mp4" />
              </video>
              <div className="grid-video-overlay">
                <h3>Character Development</h3>
              </div>
            </div>
            <div className="grid-video-item">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="grid-video"
              >
                <source src="/scene_5.mp4" type="video/mp4" />
              </video>
              <div className="grid-video-overlay">
                <h3>Environment Design</h3>
              </div>
            </div>
            <div className="grid-video-item">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="grid-video"
              >
                <source src="/scene_7.mp4" type="video/mp4" />
              </video>
              <div className="grid-video-overlay">
                <h3>Production Pipeline</h3>
              </div>
            </div>
            <div className="grid-video-item">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="grid-video"
              >
                <source src="/storm.mp4" type="video/mp4" />
              </video>
              <div className="grid-video-overlay">
                <h3>VFX Showcase</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

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

