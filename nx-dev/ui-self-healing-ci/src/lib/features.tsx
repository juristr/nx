import { SectionHeading } from '@nx/nx-dev/ui-common';
import { 
  CodeBracketIcon,
  CpuChipIcon,
  CloudIcon,
  BoltIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export function Features(): JSX.Element {
  const features = [
    {
      icon: CodeBracketIcon,
      title: "Smart Code Analysis",
      description: "Advanced static analysis identifies potential issues before they cause build failures",
      items: [
        "Dependency conflict detection",
        "Configuration drift monitoring",
        "Resource usage optimization",
        "Performance regression alerts"
      ]
    },
    {
      icon: CpuChipIcon,
      title: "AI-Powered Diagnosis",
      description: "Machine learning models trained on millions of build failures provide accurate root cause analysis",
      items: [
        "Pattern recognition in error logs",
        "Historical failure correlation",
        "Multi-language support",
        "Context-aware suggestions"
      ]
    },
    {
      icon: CloudIcon,
      title: "Infrastructure Healing",
      description: "Automatically resolve environment and infrastructure-related issues",
      items: [
        "Resource scaling optimization",
        "Network connectivity fixes",
        "Service dependency resolution",
        "Environment synchronization"
      ]
    },
    {
      icon: BoltIcon,
      title: "Instant Remediation",
      description: "Apply proven fixes automatically without human intervention",
      items: [
        "Automated patch application",
        "Configuration corrections",
        "Cache invalidation",
        "Rollback capabilities"
      ]
    },
    {
      icon: ShieldCheckIcon,
      title: "Safety First",
      description: "All healing actions are validated and can be safely reverted if needed",
      items: [
        "Pre-flight safety checks",
        "Incremental fix application",
        "Automatic rollback on failure",
        "Audit trail for all changes"
      ]
    },
    {
      icon: ChartBarIcon,
      title: "Continuous Learning",
      description: "System improves over time by learning from successful and failed healing attempts",
      items: [
        "Success rate optimization",
        "New failure pattern detection",
        "Team-specific adaptations",
        "Industry best practices integration"
      ]
    }
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeading as="h2" variant="title" className="text-slate-950 dark:text-white">
          Built for Reliability
        </SectionHeading>
        <SectionHeading
          as="p"
          variant="subtitle"
          className="mx-auto mt-6 max-w-2xl text-slate-700 dark:text-slate-300"
        >
          Our self-healing CI leverages cutting-edge technology to provide 
          intelligent, reliable, and safe automatic remediation.
        </SectionHeading>
      </div>

      <div className="mt-16 lg:mt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {features.map((feature, index) => (
            <div key={feature.title} className="group">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-10 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    
                    <ul className="space-y-3">
                      {feature.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                          <span className="text-slate-700 dark:text-slate-300 text-sm">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Highlights */}
      <div className="mt-20 lg:mt-32">
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 lg:p-12">
          <h3 className="text-3xl font-bold text-slate-950 dark:text-white text-center mb-12">
            Enterprise-Grade Technology
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-500 mb-2">99.9%</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-500 mb-2">&lt;30s</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">Detection Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-500 mb-2">95%</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">Auto-Fix Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-500 mb-2">24/7</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">Monitoring</div>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center">
              <h4 className="font-semibold text-slate-950 dark:text-white mb-2">SOC 2 Compliant</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Enterprise security standards</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center">
              <h4 className="font-semibold text-slate-950 dark:text-white mb-2">Multi-Cloud Support</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">AWS, GCP, Azure, and more</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center">
              <h4 className="font-semibold text-slate-950 dark:text-white mb-2">Zero Downtime Updates</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Continuous improvement without interruption</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}