import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import './App.css';
import './video-grid.css';
import './loading.css';
import './video-background.css';

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

const HeroVideoBackground = ({ isVisible }) => {
  return (
    <div className="hero-video-background">
      <video
        autoPlay={isVisible}
        muted
        loop
        playsInline
        className="hero-background-video"
        preload="metadata"
        onError={(e) => console.error('Hero video error:', e)}
      >
        <source src="/scene_1.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-overlay"></div>
    </div>
  );
};

const VideoGridBackground = ({ isVisible }) => {
  const videos = [
    // Original footage
    '/metropolis.mp4', '/new_atlas.mp4', '/elves.mp4', '/new_storm.mp4', 
    '/new_resolution.mp4', '/new_santa.mp4', '/atlas.mp4', '/storm.mp4',
    // Scene footage
    '/scene_2.mp4', '/scene_3.mp4', '/scene_4.mp4', '/scene_5.mp4', '/scene_6.mp4',
    '/scene_7.mp4', '/scene_8.mp4', '/scene_9.mp4', '/scene_10.mp4', '/scene_11.mp4',
    '/scene_12.mp4', '/scene_13.mp4', '/scene_14.mp4', '/scene_15.mp4', '/scene_16.mp4',
    '/scene_17.mp4', '/scene_18.mp4', '/scene_19-v.mp4', '/scene_20.mp4', '/scene_21.mp4',
    // Shot footage
    '/_shot_1_202507270015.mp4', '/_shot_1_202507270104.mp4', '/_shot_1_202507270106.mp4',
    '/_shot_2_202507270001.mp4', '/_shot_3_202507270015.mp4', '/_shot_4_202507270015.mp4',
    '/_shot_5_202507270053.mp4', '/_shot_6_202507270115.mp4', '/_shot_6_202507270118.mp4',
    '/_shot_7_202507270057.mp4',
    // Scene compositions
    '/_scene_dutch_202507260814.mp4', '/_scene_extreme_202507301630.mp4',
    '/_scene_meeting_202507260813.mp4', '/_scene_spotting_202507271058.mp4', 
    '/_scene_wolf_202507270120.mp4', '/_scene_wolf_202507301615.mp4',
    '/_scene_wolf_202507301616.mp4',
    // Character animations
    '/The_reindeer_runs_202507270057.mp4', '/The_two_characters_202507260748.mp4',
    '/The_wolf_is_202507271913.mp4', '/The_wolf_is_202507271917.mp4',
    '/Wolf_paces_left_202507301827.mp4', '/A_gust_of_202507260745.mp4',
    '/A_gust_of_202507260748.mp4', '/Lean_down_202507270104.mp4', '/Lean_down_202507270106.mp4'
  ];

  return (
    <div className="video-grid-background">
      {videos.map((videoSrc, index) => (
        <div key={index} className="grid-video-cell">
          <video
            autoPlay={isVisible}
            muted
            loop
            playsInline
            className="grid-background-video"
            preload="metadata"
            onError={(e) => console.error('Grid video error:', videoSrc, e)}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      ))}
      <div className="video-grid-overlay"></div>
    </div>
  );
};

const HeroSection = ({ children, className }) => {
  const [isVisible] = useState(true); // Hero is always visible initially
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className={`hero-section ${className || ''}`}>
      <HeroVideoBackground isVisible={isVisible} />
      <div className="hero-content">
        {children}
      </div>
    </section>
  );
};

const VideoSection = ({ children, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`video-section ${className}`}>
      <VideoGridBackground isVisible={isVisible} />
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
      <HeroSection>
        <div className="company-logo">🎬</div>
        <h1 className="hero-title">LevlStudio</h1>
        <h2 className="hero-subtitle">Presenting Our Latest Short Film: ATLAS</h2>
        <p className="hero-tagline">State-of-the-art storytelling combining human creativity and advanced technology</p>
        <button className="premiere-button" onClick={openVideoModal}>
          <Play size={24} />
          Watch ATLAS
        </button>
      </HeroSection>

      {/* Who We Are */}
      <VideoSection 
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

