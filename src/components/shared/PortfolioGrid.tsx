'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Video from 'yet-another-react-lightbox/plugins/video';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';

interface PortfolioItem { src: string; caption: string; }
interface VideoItem { src: string; poster?: string; caption?: string; }
interface PortfolioGridProps { items: PortfolioItem[]; videos?: VideoItem[]; businessName?: string; }

function getVideoMimeType(src: string): string {
  const ext = src.split('?')[0].split('.').pop()?.toLowerCase();
  if (ext === 'mp4') return 'video/mp4';
  if (ext === 'webm') return 'video/webm';
  if (ext === 'mov') return 'video/mp4';
  if (ext === 'ogg' || ext === 'ogv') return 'video/ogg';
  return 'video/mp4';
}

function VideoThumbnail({ src, poster, alt }: { src: string; poster?: string; alt: string }) {
  const [thumb, setThumb] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const attempted = useRef(false);

  useEffect(() => {
    if (poster || attempted.current) return;
    attempted.current = true;
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.preload = 'metadata';
    video.src = src;
    const capture = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 360;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          if (dataUrl !== 'data:,') setThumb(dataUrl);
        }
      } catch { /* CORS */ }
    };
    const onLoaded = () => { video.currentTime = 0.1; };
    video.addEventListener('loadeddata', onLoaded, { once: true });
    video.addEventListener('seeked', capture, { once: true });
    return () => { video.removeEventListener('loadeddata', onLoaded); video.removeEventListener('seeked', capture); video.src = ''; };
  }, [src, poster]);

  const imgSrc = !imgError && (poster || thumb);
  if (imgSrc) {
    return <Image src={imgSrc} alt={alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" unoptimized onError={() => setImgError(true)} />;
  }
  return <div style={{ position: 'absolute', inset: 0, background: '#333' }} />;
}

export function PortfolioGrid({ items, videos = [], businessName }: PortfolioGridProps) {
  const [index, setIndex] = useState(-1);
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());
  const markFailed = (src: string) => setFailedSrcs((prev) => new Set(prev).add(src));

  const visibleItems = items.filter((item) => !failedSrcs.has(item.src));
  const visibleVideos = videos.filter((v) => !failedSrcs.has(v.src));

  const imageSlides = visibleItems.map((item) => ({ src: item.src, title: item.caption }));
  const videoSlides = visibleVideos.map((v) => ({
    type: 'video' as const,
    poster: v.poster || undefined,
    title: v.caption || undefined,
    sources: [{ src: v.src, type: getVideoMimeType(v.src) }],
    width: 1920, height: 1080,
  }));
  const slides = [...imageSlides, ...videoSlides];

  return (
    <>
      <div>
        {visibleItems.map((item, i) => (
          <button key={item.src} onClick={() => setIndex(i)} style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}>
            <Image
              src={item.src}
              alt={item.caption || (businessName ? `${businessName} project ${i + 1}` : `Project ${i + 1}`)}
              width={400} height={300}
              className="object-cover"
              unoptimized
              onError={() => markFailed(item.src)}
            />
            <span>{item.caption}</span>
          </button>
        ))}
        {visibleVideos.map((v, i) => (
          <button key={`video-${v.src}`} onClick={() => setIndex(visibleItems.length + i)} style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}>
            <span>▶ {v.caption || `Video ${i + 1}`}</span>
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Captions, Video]}
        video={{ autoPlay: true, controls: true, playsInline: true }}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
          root: { '--yarl__slide_captions_container_background': 'rgba(0,0,0,0.5)', '--yarl__slide_max_width': '92vw', '--yarl__slide_max_height': '92vh' } as Record<string, string>,
        }}
      />
    </>
  );
}
