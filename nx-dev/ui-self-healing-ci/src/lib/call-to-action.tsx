import Link from 'next/link';
import { ButtonLink } from '@nx/nx-dev/ui-common';

export function CallToAction(): JSX.Element {
  return (
    <section className="relative isolate px-6 py-32 sm:py-40 lg:px-8">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-black/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-white/10"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="self-healing-pattern"
            width={200}
            height={200}
            x="50%"
            y={0}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg
          x="50%"
          y={0}
          className="overflow-visible fill-emerald-200/20 dark:fill-emerald-800/20"
        >
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#self-healing-pattern)"
        />
      </svg>
      
      <div
        className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-emerald-400 to-green-500 opacity-20"
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
        />
      </div>
      
      <div className="mx-auto max-w-4xl text-center">
        <h2
          id="cta"
          className="text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl dark:text-white"
        >
          Stop Fighting Fires
          <br />
          <span className="bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
            Start Self-Healing
          </span>
        </h2>
        
        <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-slate-700 dark:text-slate-300">
          Join thousands of engineering teams who've eliminated CI downtime. 
          Experience automatic build healing in your environment today.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <ButtonLink
            href="https://cloud.nx.app/setup"
            title="Start Free Trial"
            variant="primary"
            size="large"
            className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Free Trial
          </ButtonLink>
          
          <Link
            href="/contact"
            title="Book a Demo"
            className="group text-lg font-semibold leading-6 text-slate-950 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300"
          >
            Book a Demo{' '}
            <span
              aria-hidden="true"
              className="inline-block transition group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Trusted by engineering teams at
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="px-6 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <span className="font-semibold text-slate-700 dark:text-slate-300">TechCorp</span>
            </div>
            <div className="px-6 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <span className="font-semibold text-slate-700 dark:text-slate-300">ScaleUp Inc</span>
            </div>
            <div className="px-6 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <span className="font-semibold text-slate-700 dark:text-slate-300">InnovateLabs</span>
            </div>
            <div className="px-6 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <span className="font-semibold text-slate-700 dark:text-slate-300">DevCorp</span>
            </div>
          </div>
        </div>

        {/* Trial details */}
        <div className="mt-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-slate-950 dark:text-white mb-4">
            30-Day Free Trial Includes:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <div className="font-medium text-slate-950 dark:text-white">Full Platform Access</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">All self-healing features included</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <div className="font-medium text-slate-950 dark:text-white">Expert Setup Support</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Dedicated onboarding engineer</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <div className="font-medium text-slate-950 dark:text-white">No Credit Card Required</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Start immediately, no commitment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}