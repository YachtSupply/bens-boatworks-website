'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Video from 'yet-another-react-lightbox/plugins/video';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import { ZoomIn, Play } from 'lucide-react';

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
    return <Image src={imgSrc} alt={alt} fill sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized onError={() => setImgError(true)} />;
  }
  return <div className="absolute inset-0 bg-navy" />;
}

const ASPECT = ['aspect-[4/5]', 'aspect-[3/2]', 'aspect-square', 'aspect-[2/3]', 'aspect-[3/4]', 'aspect-[16/9]'];

export function PortfolioGrid({ items, videos = [], businessName }: PortfolioGridProps) {
  const [index, setIndex] = useState(-1);
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());
  const markFailed = (src: string) => setFailedSrcs((prev) => new Set(prev).add(src));

  const visibleItems = items.filter((item) => !failedSrcs.has(item.src));
  const visibleVideos = videos.filter((v) => !failedSrcs.has(v.src));

  const imageSlides = visibleItems.map((item) => ({ src: item.src, title: item.caption }));
  const videoSlides = visibleVideos.map((v) => ({
    type: 'video' as const, poster: v.poster || undefined, title: v.caption || undefined,
    sources: [{ src: v.src, type: getVideoMimeType(v.src) }], width: 1920, height: 1080,
  }));
  const slides = [...imageSlides, ...videoSlides];

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
        {visibleItems.map((item, i) => (
          <button
            key={item.src}
            onClick={() => setIndex(i)}
            className={`relative ${ASPECT[i % ASPECT.length]} w-full overflow-hidden rounded-lg group cursor-pointer mb-3 break-inside-avoid block focus:outline-none focus:ring-2 focus:ring-gold`}
          >
            <Image
              src={item.src}
              alt={item.caption || (businessName ? `${businessName} project ${i + 1}` : `Project ${i + 1}`)}
              fill sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              unoptimized onError={() => markFailed(item.src)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-end p-4">
              <p className="text-white text-sm font-medium translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                {item.caption}
              </p>
            </div>
            <div className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ZoomIn size={16} className="text-navy" strokeWidth={1.5} />
            </div>
          </button>
        ))}
        {visibleVideos.map((v, i) => (
          <button
            key={`video-${v.src}`}
            onClick={() => setIndex(visibleItems.length + i)}
            className="relative aspect-video w-full overflow-hidden rounded-lg group cursor-pointer mb-3 break-inside-avoid block focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <VideoThumbnail src={v.src} poster={v.poster || undefined} alt={v.caption || `Video ${i + 1}`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
                <Play size={22} className="text-navy group-hover:text-white ml-0.5" strokeWidth={1.5} />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-end p-4">
              <p className="text-white text-sm font-medium translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                {v.caption}
              </p>
            </div>
          </button>
        ))}
      </div>
      <Lightbox
        open={index >= 0} index={index} close={() => setIndex(-1)} slides={slides}
        plugins={[Captions, Video]} video={{ autoPlay: true, controls: true, playsInline: true }}
        styles={{
          container: { backgroundColor: 'rgba(12, 27, 42, 0.97)' },
          root: { '--yarl__slide_captions_container_background': 'rgba(0,0,0,0.5)', '--yarl__slide_max_width': '92vw', '--yarl__slide_max_height': '92vh' } as Record<string, string>,
        }}
      />
    </>
  );
}
