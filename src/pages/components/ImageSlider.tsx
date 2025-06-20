import { useComponentTranslation } from '@/i18n';
import React, { useState, useRef, useEffect } from 'react';

import Hugo from '/src/assets/images/hugo.jpg?w=250;400;800;1200;&format=webp&quality=90&as=srcset&imagetools';
import Christophe from '/src/assets/images/christophe.jpg?w=250;400;800;1200;&format=webp&quality=90&as=srcset&imagetools';
import Julien from '/src/assets/images/julien.png?w=250;400;800;1200;&format=webp&quality=90&as=srcset&imagetools';
import Barnabe from '/src/assets/images/barnabe.png?w=250;400;800;1200;&format=webp&quality=90&as=srcset&imagetools';

interface ImageData {
  url: string;
  name: string;
  description: string;
}

const images: ImageData[] = [
  { url: Hugo, name: 'Barnabé Dardenne', description: 'sales' },
  { url: Christophe, name: 'Hugo Simon', description: 'designer' },
  { url: Julien, name: 'Christophe Leroy', description: 'frontend' },
  { url: Barnabe, name: 'Julien Leclercq', description: 'backend' },
  { url: Hugo, name: 'Barnabé Dardenne', description: 'sales' },
  { url: Christophe, name: 'Hugo Simon', description: 'designer' },
  { url: Julien, name: 'Christophe Leroy', description: 'frontend' },
  { url: Barnabe, name: 'Julien Leclerq', description: 'backend' },
];

const getResponsiveConfig = () => {
  const width = window.innerWidth;
  
  if (width < 768) {
    return {
      widths: [30, 60, 30, 0, 0, 0, 0, 0],
      gap: 2,
      startLeft: -25
    };
  } else if (width < 1024) {
    return {
      widths: [25, 50, 25, 20, 0, 0, 0, 0],
      gap: 1.5,
      startLeft: -20
    };
  } else {
    return {
      widths: [20, 30, 20, 15, 15, 15, 15, 15],
      gap: 1,
      startLeft: -18
    };
  }
};

const calculateZones = (config: ReturnType<typeof getResponsiveConfig>) => {
  const zones = [];
  let currentLeft = config.startLeft;
  
  config.widths.forEach((width, index) => {
    zones.push({
      width,
      left: currentLeft
    });
    currentLeft += width + config.gap;
  });
  
  return zones;
};

interface ImagePosition {
  imageIndex: number;
  zoneIndex: number;
  isTransitioning: boolean;
}

const ImageSlider: React.FC = () => {
  const t = useComponentTranslation('imageslider');
  const [config, setConfig] = useState(getResponsiveConfig());
  const [zones, setZones] = useState(calculateZones(config));
  
  const visibleCount = config.widths.filter(w => w > 0).length;
  
  const [imagePositions, setImagePositions] = useState<ImagePosition[]>(
    images.map((_, index) => ({
      imageIndex: index,
      zoneIndex: index,
      isTransitioning: false
    }))
  );
  
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const newConfig = getResponsiveConfig();
      setConfig(newConfig);
      setZones(calculateZones(newConfig));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        handleNext();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isDragging]);

  const handleNext = () => {
    setImagePositions(prev => prev.map(pos => ({
      ...pos,
      zoneIndex: (pos.zoneIndex - 1 + 8) % 8,
      isTransitioning: true
    })));
  };


  const handleImageClick = (clickedPosition: ImagePosition) => {
    if (isDragging) return;
    
    const targetZoneIndex = 1;
    const currentZone = clickedPosition.zoneIndex;
    
    const steps = (currentZone - targetZoneIndex + 8) % 8;
    
    for (let i = 0; i < steps; i++) {
      setTimeout(() => {
        handleNext();
      }, i * 100);
    }
  };

  const getZIndex = (position: ImagePosition) => {
    if (position.zoneIndex === 0) {
      return -1;
    }
    return 1;
  };

  return (
    <div className="relative w-full h-[70vw] md:h-[60vw] lg:h-[30vw] 2xl:h-[30vw] !max-w-[2050px] lg:pl-100">
      <div className="h-full relative">
        <div 
          ref={containerRef}
          className="relative h-full cursor-pointer select-none">
          <div className="absolute top-10 left-0 w-full h-full">
            {imagePositions.map((position) => {
              const zone = zones[position.zoneIndex];
              const image = images[position.imageIndex];
              const isVisible = position.zoneIndex < visibleCount;
              
              return (
                <div
                  key={position.imageIndex}
                  className="absolute transition-all ease-out cursor-pointer"
                  style={{
                    left: `${zone.left}vw`,
                    width: `${zone.width}vw`,
                    aspectRatio: '6.5/7',
                    transform: `translateX(${dragOffset * 0.5}px)`,
                    opacity: isVisible && zone.width > 0 ? 1 : 0,
                    visibility: isVisible && zone.width > 0 ? 'visible' : 'hidden',
                    transitionDuration: '1000ms',
                    zIndex: getZIndex(position),
                  }}
                  onClick={() => handleImageClick(position)}
                >
                  <img
                    srcSet={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover object-top"
                    draggable={false}
                  />
                  
                  {position.zoneIndex === 2 && (
                    <div className='flex flex-col h-full lg:h-[11vw] lg:pb-5 justify-end'>
                      <h4 className="text-14 md:!text-20 xl:text-[24px] font-bold pb-5">
                        {image.name}
                      </h4>
                      
                      <p className="!text-12 md:!text-15 xl:!text-20">
                        {t(`${image.description}`)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;