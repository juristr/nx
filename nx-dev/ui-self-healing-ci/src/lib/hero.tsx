'use client';
import { useState } from 'react';
import { ButtonLink, SectionHeading } from '@nx/nx-dev/ui-common';
import { PlayIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { cx } from '@nx/nx-dev/ui-primitives';

export function Hero(): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeading as="h1" variant="display" className="text-slate-950 dark:text-white">
          <span className="rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
            Self-Healing
          </span>{' '}
          CI
          <br />
          Fix Builds Automatically
        </SectionHeading>
        <SectionHeading
          as="p"
          variant="subtitle"
          className="mx-auto mt-6 max-w-2xl text-slate-700 dark:text-slate-300"
        >
          Nx's self-healing CI automatically detects and fixes common build failures, 
          reducing downtime and keeping your team productive. Never wait for broken builds again.
        </SectionHeading>
        
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <ButtonLink
            href="#get-started"
            title="Get started"
            variant="primary"
            size="default"
          >
            Get Started
          </ButtonLink>
          <ButtonLink
            href="#learn-more"
            title="Learn More"
            variant="secondary"
            size="default"
          >
            See How It Works
          </ButtonLink>
        </div>
      </div>

      {/* Interactive Demo Section */}
      <div className="mt-16 lg:mt-24">
        <div className="mx-auto max-w-5xl">
          <div 
            className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-700"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Image placeholder - this would be replaced with actual image */}
            <div className={cx(
              "relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center transition-opacity duration-500",
              isHovered ? "opacity-0" : "opacity-100"
            )}>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <PlayIcon className="w-8 h-8 text-white ml-1" />
                </div>
                <p className="text-white text-lg font-medium">Self-Healing CI in Action</p>
                <p className="text-slate-400 text-sm mt-2">Hover to see the magic</p>
              </div>
            </div>
            
            {/* Video placeholder - this would be replaced with actual video */}
            <div className={cx(
              "absolute inset-0 bg-gradient-to-br from-emerald-900 to-green-900 flex items-center justify-center transition-opacity duration-500",
              isHovered ? "opacity-100" : "opacity-0"
            )}>
              <div className="text-center">
                <div className="animate-pulse">
                  <div className="mx-auto w-20 h-20 bg-emerald-400 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-green-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white text-lg font-medium">✓ Build failure detected</p>
                    <p className="text-emerald-200 text-lg font-medium">✓ Root cause identified</p>
                    <p className="text-emerald-100 text-lg font-medium">✓ Fix automatically applied</p>
                    <p className="text-emerald-50 text-lg font-medium">✓ Build pipeline restored</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            
            {/* Play button overlay */}
            <div className={cx(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
              isHovered ? "opacity-0" : "opacity-100"
            )}>
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <PlayIcon className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
          </div>
          
          <p className="text-center text-slate-600 dark:text-slate-400 text-sm mt-4">
            Watch how self-healing CI automatically detects and fixes build failures in real-time
          </p>
        </div>
      </div>
    </div>
  );
}