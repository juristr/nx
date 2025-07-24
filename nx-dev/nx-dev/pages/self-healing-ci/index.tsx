'use client';
import { DefaultLayout } from '@nx/nx-dev/ui-common';
import type { ReactElement } from 'react';
import { NextSeo } from 'next-seo';
import {
  CallToAction,
  Hero,
  ValuePropositions,
  Features,
  HowItWorks,
  Testimonials,
} from '@nx/nx-dev/ui-self-healing-ci';

export function SelfHealingCI(): ReactElement {
  return (
    <>
      <NextSeo
        title="Self-Healing CI - Fix Your Builds Automatically"
        description="Nx's self-healing CI automatically detects and fixes common build failures, reducing downtime and keeping your team productive."
        openGraph={{
          url: 'https://nx.dev/self-healing-ci',
          title: 'Self-Healing CI - Fix Your Builds Automatically',
          description:
            "Nx's self-healing CI automatically detects and fixes common build failures, reducing downtime and keeping your team productive.",
          images: [
            {
              url: 'https://nx.dev/socials/nx-media.png',
              width: 800,
              height: 421,
              alt: 'Nx: Self-Healing CI',
              type: 'image/jpeg',
            },
          ],
          siteName: 'Nx',
          type: 'website',
        }}
        canonical="https://nx.dev/self-healing-ci"
      />
      <DefaultLayout hideBackground={true}>
        <Hero />

        <div className="mt-32 lg:mt-56">
          <HowItWorks />
        </div>

        <div className="mt-32 lg:mt-56">
          <ValuePropositions />
        </div>

        <div className="mt-32 lg:mt-56">
          <Features />
        </div>

        <div className="mt-32 lg:mt-56">
          <Testimonials />
        </div>

        <div className="mt-32 lg:mt-56">
          <CallToAction />
        </div>
      </DefaultLayout>
    </>
  );
}

export default SelfHealingCI;