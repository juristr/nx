import { SectionHeading } from '@nx/nx-dev/ui-common';

export function Testimonials(): JSX.Element {
  const testimonials = [
    {
      quote: "Self-healing CI has been a game changer for our team. We went from spending 40% of our time fixing build issues to almost zero. Our deployment frequency increased by 300%.",
      author: "Sarah Chen",
      role: "Engineering Director",
      company: "TechCorp",
      avatar: "SC"
    },
    {
      quote: "The ROI was immediate. Within the first week, we saved more hours than the entire cost of the solution. It's like having a senior DevOps engineer working 24/7.",
      author: "Marcus Rodriguez",
      role: "VP of Engineering",
      company: "ScaleUp Inc",
      avatar: "MR"
    },
    {
      quote: "What impressed me most is how it learns from our specific environment. The fixes get more accurate over time, and now we rarely see repeated issues.",
      author: "Dr. Emily Watson",
      role: "CTO",
      company: "InnovateLabs",
      avatar: "EW"
    }
  ];

  const stats = [
    {
      metric: "3000+",
      label: "Teams using self-healing CI",
      description: "Trusted by engineering teams worldwide"
    },
    {
      metric: "99.5%",
      label: "Build success rate",
      description: "Industry-leading reliability"
    },
    {
      metric: "15min",
      label: "Average setup time",
      description: "Get started in minutes, not days"
    },
    {
      metric: "85%",
      label: "Reduction in CI overhead",
      description: "Focus on features, not infrastructure"
    }
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      {/* Stats Section */}
      <div className="text-center">
        <SectionHeading as="h2" variant="title" className="text-slate-950 dark:text-white">
          Trusted by Engineering Leaders
        </SectionHeading>
        <SectionHeading
          as="p"
          variant="subtitle"
          className="mx-auto mt-6 max-w-2xl text-slate-700 dark:text-slate-300"
        >
          See how top teams are using self-healing CI to ship higher quality code faster
        </SectionHeading>
      </div>

      <div className="mt-16 lg:mt-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.metric} className="text-center">
              <div className="text-4xl font-bold text-emerald-500 mb-2">
                {stat.metric}
              </div>
              <div className="text-lg font-semibold text-slate-950 dark:text-white mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-20 lg:mt-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.author} className="group">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                {/* Quote */}
                <div className="mb-6">
                  <svg className="w-8 h-8 text-emerald-500 mb-4" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-950 dark:text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-emerald-600 dark:text-emerald-400">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="mt-20 lg:mt-32">
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-3xl p-8 lg:p-12">
          <h3 className="text-3xl font-bold text-slate-950 dark:text-white text-center mb-12">
            Success Stories
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-slate-950 dark:text-white">
                E-commerce Platform Scales to Black Friday
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                A major e-commerce platform used self-healing CI to maintain 99.9% uptime during their highest traffic period. 
                The system automatically resolved 47 potential issues that would have caused outages.
              </p>
              <div className="flex space-x-8">
                <div>
                  <div className="text-2xl font-bold text-emerald-600">0</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Outages</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">47</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Issues Prevented</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">$2M+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Revenue Protected</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-slate-950 dark:text-white">
                FinTech Startup Achieves SOC 2 Compliance
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                A fast-growing fintech startup leveraged self-healing CI's audit trail and automated compliance checks 
                to achieve SOC 2 certification 6 months ahead of schedule.
              </p>
              <div className="flex space-x-8">
                <div>
                  <div className="text-2xl font-bold text-emerald-600">6mo</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Time Saved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">100%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Audit Success</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">80%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Less Manual Work</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}