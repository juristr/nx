import { SectionHeading } from '@nx/nx-dev/ui-common';
import { 
  ExclamationTriangleIcon, 
  MagnifyingGlassIcon, 
  WrenchScrewdriverIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

export function HowItWorks(): JSX.Element {
  const steps = [
    {
      icon: ExclamationTriangleIcon,
      title: "Detection",
      description: "Automatically detects build failures and CI pipeline issues in real-time",
      color: "text-red-500 bg-red-50 dark:bg-red-900/20"
    },
    {
      icon: MagnifyingGlassIcon,
      title: "Analysis",
      description: "AI-powered root cause analysis identifies the exact source of the problem",
      color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: WrenchScrewdriverIcon,
      title: "Healing",
      description: "Automatically applies proven fixes and optimizations to resolve issues",
      color: "text-orange-500 bg-orange-50 dark:bg-orange-900/20"
    },
    {
      icon: CheckCircleIcon,
      title: "Restoration",
      description: "Validates the fix and restores your CI pipeline to full functionality",
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
    }
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeading as="h2" variant="title" className="text-slate-950 dark:text-white">
          How Self-Healing CI Works
        </SectionHeading>
        <SectionHeading
          as="p"
          variant="subtitle"
          className="mx-auto mt-6 max-w-2xl text-slate-700 dark:text-slate-300"
        >
          Our intelligent system monitors, analyzes, and fixes your CI pipeline automatically, 
          so your team can focus on building great software.
        </SectionHeading>
      </div>

      <div className="mt-16 lg:mt-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 z-0" />
              )}
              
              <div className="relative z-10 bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${step.color} mb-6`}>
                  <step.icon className="w-6 h-6" />
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-slate-950 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline visualization */}
      <div className="mt-16 lg:mt-20">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl font-bold text-slate-950 dark:text-white text-center mb-8">
            From Failure to Fix in Minutes
          </h3>
          
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center text-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mb-2"></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Build Fails</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">0:00</span>
              </div>
              
              <div className="flex-1 h-0.5 bg-gradient-to-r from-red-500 via-blue-500 via-orange-500 to-emerald-500 mx-4"></div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-4 h-4 bg-emerald-500 rounded-full mb-2"></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Build Restored</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">~3:00</span>
              </div>
            </div>
            
            <div className="absolute top-0 left-1/4 transform -translate-x-1/2">
              <div className="flex flex-col items-center text-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mb-1"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">Analyzing</span>
              </div>
            </div>
            
            <div className="absolute top-0 right-1/4 transform translate-x-1/2">
              <div className="flex flex-col items-center text-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mb-1"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">Healing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}