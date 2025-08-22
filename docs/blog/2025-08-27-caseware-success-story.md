---
title: 'Scaling 700+ Projects: How Nx Enterprise Became a "No-Brainer" for Caseware'
slug: caseware-success-story
authors: [Juri Strumpflohner]
tags: ['customer story']
description: Discover how Caseware's platform engineering team transformed their development workflow by unifying 700+ projects and multiple teams under one efficient monorepo architecture.
youtubeUrl: https://www.youtube.com/watch?v=Scaling700Projects
cover_image: /blog/images/articles/bg-caseware-success-story.avif
metrics:
  - value: '700+'
    label: 'projects in unified monorepo'
  - value: '4 teams'
    label: 'core platform teams with squads'
  - value: '10+ years'
    label: 'of legacy code successfully migrated'
  - value: 'Immediate'
    label: 'adoption after trial period'
---

Caseware is a leading provider of audit and financial reporting software, serving accounting firms and finance departments worldwide. Their platform engineering team manages complex software ecosystems that support critical financial workflows across multiple business units. As the company scaled, their engineering organization needed to balance team autonomy with the efficiency gains that come from shared tooling and coordinated development practices.

With four core platform teams, each containing multiple squads building interconnected applications, Caseware faced the classic enterprise challenge: how to maintain development velocity while ensuring code quality and system integration across a growing number of projects and teams.

## Challenge

Caseware's engineering organization had evolved organically over more than a decade, resulting in a fragmented development landscape that was becoming increasingly difficult to manage.

**Lack of Development Conformity**

Historically, Caseware's architecture consisted of Java and C backends paired with a diverse collection of frontend technologies. Every team had significant autonomy in their technology choices, which led to inconsistent user experiences and duplicated effort across the organization.

> Every team had a lot of autonomy. Our end user product was quite different as you went between one team's product to the next.

This autonomy, while fostering innovation, created several operational challenges:

- **Inconsistent user experiences** across different products and teams
- **Duplicated development effort** as teams built similar functionality independently  
- **No shared code, UX patterns, or styling** across the organization
- **Coordination overhead** when teams needed to integrate their work

**Fragmented Repository Management**

The organization maintained multiple monorepos implemented by individual solution teams, creating coordination challenges when features required changes across repositories. This fragmentation made it difficult to:

- Coordinate changes that spanned multiple teams and repositories
- Maintain consistent development practices and tooling
- Share innovations and improvements across the organization
- Provide unified support and guidance from the platform engineering team

## Solution

Caseware's platform engineering team took a strategic approach to consolidation, starting with frontend unification and gradually expanding to encompass their entire development ecosystem.

**Starting with Frontend Unification**

The team began by building a frontend monorepo leveraging Nx to create a shared Angular library. This allowed all development teams using Angular to share code, UX patterns, and styling standards for the first time.

The shared library approach provided immediate benefits that became apparent to development teams, creating organic demand for broader adoption.

**Expanding to Full-Stack Consolidation**

As teams experienced the efficiency gains from the shared frontend architecture, they began requesting broader consolidation:

> For efficiency we started to say Hey what if a backend app came in here so we moved a small backend app in and loved it so now every app's there.

This organic expansion demonstrated the value of the monorepo approach beyond just frontend development, leading to a unified workspace that supports innovation and efficiencies in both local development and CI/CD processes.

**Nx Enterprise Partnership**

Caseware adopted Nx Enterprise to support their scale and complexity. The implementation was straightforward - simply adding the subscription ID to their nx.json configuration - but the impact was immediate.

{% testimonial
    name="Amir"
    title="Platform Engineering Team, Caseware"
    image="/documentation/blog/images/articles/amir-caseware.avif" %}
The Nx team approached me and said hey do you want a trial of Nx Enterprise and I was like yeah sure why not and it was actually pretty easy I just tossed in the subscription ID into nx.json and then immediately the feedback was like wow this is a huge timesaver.
{% /testimonial %}

**Strategic Migration Support**

Rather than mandating adoption, Caseware invested in proper migration support:

- **Dedicated migration team** to assist teams through the transition process
- **Hands-on guidance** and troubleshooting support during migrations  
- **Trust-building approach** that demonstrated value rather than enforcing compliance

> If we took the time with them, walked them through the process and were there to assist them with anything that came up, that really helped a lot in terms of building that mutual trust and confidence that it was the right path.

**Enterprise-Grade Insights and Support**

The Nx Enterprise partnership provides ongoing value through regular collaboration and advanced insights:

- **Frequent recurring meetings** with the Nx Enterprise team for strategic guidance
- **Surprise metrics and bleeding-edge data** that help identify optimization opportunities
- **Aggregate insights** spanning months of collected data to identify pain points and deficiencies

{% testimonial
    name="Amir"
    title="Platform Engineering Team, Caseware"
    image="/documentation/blog/images/articles/amir-caseware.avif" %}
Sometimes they'll email me with metrics I didn't even know were available to me that are sort of bleeding edge or just an aggregate of data they've collected over the prior months that really help us kind of zero in on where some of the pain points or deficiencies are within the repo.
{% /testimonial %}

## Results

### Unified Development Ecosystem at Enterprise Scale

Caseware successfully transformed their fragmented development landscape into a unified ecosystem supporting 700+ projects. This consolidation eliminated the overhead of managing multiple repositories while maintaining the team autonomy that had historically driven innovation.

The monorepo architecture now supports the full spectrum of Caseware's development needs, from frontend applications to backend services, all while providing the shared tooling and standards that enable consistent user experiences.

### Immediate Value Recognition and Adoption

The trial period demonstrated such clear value that losing access created immediate urgency within the organization. When the trial expired, the reaction was immediate: "oh no what are we going to do?"

This response validated that Nx Enterprise had become integral to the team's daily workflow, not just a nice-to-have tool.

### Data-Driven Optimization and Management Justification  

With applications containing over 10 years of legacy code, having detailed metrics at the project and task level became crucial for understanding and optimizing their development process.

> Being able to aggregate on metrics at the project task level is very valuable... being able to log into the Nx Cloud site and see all the tasks being run seeing how much time we were saving those were all great metrics to provide to the management team to help justify the value add that Nx Cloud provides.

The comprehensive metrics and insights from Nx Cloud enable the platform engineering team to make data-driven decisions and demonstrate concrete value to leadership, making budget justification straightforward.

### Organic Team Migration and Trust Building

By focusing on demonstrating value rather than mandating adoption, Caseware achieved voluntary team migration to the monorepo. The combination of dedicated migration support and proven efficiency gains created the trust necessary for successful enterprise-wide adoption.

The investment in proper migration support and ongoing collaboration with the Nx Enterprise team ensures that teams feel supported throughout their transition, leading to sustainable long-term adoption rather than resistance.

{% call-to-action title="Ready to scale your enterprise development?" url="/enterprise" icon="nxcloud" description="Learn how Nx Enterprise can help your organization achieve similar results with enterprise-grade support and insights." /%}