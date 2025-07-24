import { SectionHeading } from '@nx/nx-dev/ui-common';
import { 
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

export function ValuePropositions(): JSX.Element {
  const mainValues = [
    {
      icon: ClockIcon,
      title: "Reduce Downtime by 90%",
      description: "Automatically fix build failures in minutes, not hours. Keep your development velocity high with instant problem resolution.",
      stats: "From 2+ hours to 3 minutes average resolution time",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: CurrencyDollarIcon,
      title: "Save Engineering Hours",
      description: "Eliminate manual debugging and fixing of CI issues. Your team can focus on shipping features instead of maintaining infrastructure.",
      stats: "Save 15-20 hours per week per team",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: UserGroupIcon,
      title: "Improve Developer Experience",
      description: "Remove the frustration of broken builds and deployment blockers. Developers get faster feedback and uninterrupted flow.",
      stats: "85% reduction in CI-related developer interruptions",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const additionalBenefits = [
    {
      icon: ChartBarIcon,
      title: "Increased Deployment Frequency",
      description: "Deploy 3x more often with confidence in your CI pipeline stability"
    },
    {
      icon: ShieldCheckIcon,
      title: "Higher Build Success Rate",
      description: "Achieve 99.5%+ build success rates with automated issue prevention"
    },
    {
      icon: LightBulbIcon,
      title: "Continuous Learning",
      description: "System gets smarter over time, preventing future issues proactively"
    }
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeading as="h2" variant="title" className="text-slate-950 dark:text-white">
          All Signal, No Noise
        </SectionHeading>
        <SectionHeading
          as="p"
          variant="subtitle"
          className="mx-auto mt-6 max-w-2xl text-slate-700 dark:text-slate-300"
        >
          Self-healing CI delivers real value where it matters most: 
          your team's time, your infrastructure costs, and your product velocity.
        </SectionHeading>
      </div>

      {/* Main Value Propositions */}
      <div className="mt-16 lg:mt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {mainValues.map((value, index) => (
            <div key={value.title} className="text-center group">
              <div className="relative">
                <div className={`mx-auto w-20 h-20 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute -top-2 -left-2 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce delay-100"></div>
                  <div className="absolute -top-1 -right-3 w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-bounce delay-200"></div>
                  <div className="absolute -bottom-2 left-1 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-4">
                {value.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
                {value.description}
              </p>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {value.stats}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Benefits */}
      <div className="mt-20 lg:mt-32">
        <h3 className="text-3xl font-bold text-slate-950 dark:text-white text-center mb-12">
          Beyond Just Fixing Issues
        </h3>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {additionalBenefits.map((benefit, index) => (
            <div key={benefit.title} className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-400 dark:to-slate-500 rounded-xl flex items-center justify-center mb-6">
                <benefit.icon className="w-6 h-6 text-white dark:text-slate-900" />
              </div>
              
              <h4 className="text-xl font-semibold text-slate-950 dark:text-white mb-3">
                {benefit.title}
              </h4>
              
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Calculator Teaser */}
      <div className="mt-20 lg:mt-32">
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Calculate Your ROI
          </h3>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            See how much time and money self-healing CI can save your team. 
            Most organizations see ROI within the first month.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold mb-2">15-20hrs</div>
              <div className="text-emerald-100">Saved per week per team</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold mb-2">$50k+</div>
              <div className="text-emerald-100">Annual savings per team</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold mb-2">90%</div>
              <div className="text-emerald-100">Reduction in downtime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}