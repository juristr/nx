---
title: 'Single vs. Multi-Version Policies in JavaScript Monorepos: Choosing the Right Strategy'
slug: single-vs-multi-version-policies-monorepos
authors: [Juri Strumpflohner]
tags: [monorepo, npm-workspaces, dependency-management, typescript]
cover_image: /blog/images/articles/version-policies-bg.jpg
description: Explore the trade-offs between single and multi-version dependency policies in JavaScript monorepos, and learn when each approach makes sense in modern workspace setups.
---

{% callout type="note" title="Related Reading" expanded=true %}

This article builds upon our recent workspace improvements:

- [A New Nx Experience for TypeScript Monorepos and Beyond](/blog/new-nx-experience-for-typescript-monorepos)
- [Everything You Need to Know About TypeScript Project References](/blog/typescript-project-references)
- [Managing TypeScript Packages in Monorepos](/blog/managing-ts-packages-in-monorepos)

{% /callout %}

One of the most significant changes in Nx's evolution has been the introduction of NPM workspace support, giving teams unprecedented flexibility in how they structure and manage dependencies in their monorepos. This shift has sparked important conversations about dependency management strategies, particularly around **single version vs. multi-version policies**.

In this post, we'll explore both approaches, examine their trade-offs, and help you decide which strategy works best for your team and use case.

{% toc /%}

## The New Landscape: Maximum Flexibility with NPM Workspaces

Historically, Nx's integrated workspace setup enforced certain patterns. There was typically one root-level `package.json` containing all dependencies, which naturally led to a single version policy. While this worked well for many teams, it limited flexibility for those who needed different approaches.

With our [new NPM workspace experience](/blog/new-nx-experience-for-typescript-monorepos), this constraint has been lifted. You now have complete freedom to structure your dependencies however makes sense for your team:

- **NPM/Yarn/PNPM/Bun workspaces** handle dependency management
- **Each project can have its own `package.json`** with its own dependencies
- **Nx plugins work seamlessly** in both integrated and workspace setups
- **You choose** whether to centralize or distribute your dependency versions

This flexibility is powerful, but it also means you need to make conscious decisions about your dependency strategy.

## Understanding Single vs. Multi-Version Policies

### Single Version Policy

In a single version policy, **the entire monorepo uses the same version of each dependency**. For example, all projects use React 18.2.0, TypeScript 5.1.6, and so on.

```json
// Root package.json or consistent across all projects
{
  "dependencies": {
    "react": "18.2.0",
    "typescript": "5.1.6",
    "lodash": "4.17.21"
  }
}
```

### Multi-Version Policy

In a multi-version policy, **different projects can use different versions of the same dependency**. Project A might use React 17, while Project B uses React 18.

```json
// Project A package.json
{
  "dependencies": {
    "react": "17.0.2"
  }
}

// Project B package.json  
{
  "dependencies": {
    "react": "18.2.0"
  }
}
```

## The Case for Single Version Policy

At Nx, we've been advocates of the single version policy since day one—not because our tooling enforced it, but because we've seen it work exceptionally well with large enterprise teams. Here's why:

### 1. **Simplified Code Sharing**

When all projects use the same versions, sharing code becomes frictionless:

```typescript
// This component can be used anywhere in the monorepo
// because everyone uses the same React version
export function SharedButton({ children }: { children: React.ReactNode }) {
  return <button className="shared-btn">{children}</button>;
}
```

### 2. **Reduced Bundle Complexity**

Single versions eliminate the possibility of bundling multiple versions of the same library:

```bash
# Good: One React instance
node_modules/
  react/
    package.json (version: 18.2.0)

# Problematic: Multiple React instances
node_modules/
  react/
    package.json (version: 18.2.0)
  .pnpm/
    react@17.0.2/
    react@18.2.0/
```

### 3. **Consistent Developer Experience**

All developers work with the same APIs, documentation, and debugging tools:

- No confusion about which API version to use
- Consistent TypeScript types across projects
- Unified tooling and configuration

### 4. **Easier Security Updates**

When a security vulnerability is discovered, you only need to update one version:

```bash
# Update once, fix everywhere
npm update react@18.2.1
```

### 5. **Simplified CI/CD**

Your build and test processes are more predictable:

- Consistent behavior across all projects
- Simplified Docker images and deployment artifacts
- Easier caching strategies

## When Multi-Version Policies Make Sense

Despite our strong advocacy for single version policies, there are legitimate scenarios where multi-version approaches are necessary:

### 1. **Migration Scenarios**

When upgrading major versions, some projects might need to lag behind:

```json
// Modern projects
{
  "dependencies": {
    "angular": "17.0.0"
  }
}

// Legacy project still on older version
{
  "dependencies": {
    "angular": "15.2.0" 
  }
}
```

### 2. **Legacy Application Isolation**

Some legacy applications might be too risky or expensive to upgrade:

```typescript
// Legacy app - leave untouched
// packages/legacy-admin/package.json
{
  "dependencies": {
    "react": "16.14.0",
    "react-router": "5.3.4"
  }
}

// New projects - modern versions
// packages/new-dashboard/package.json  
{
  "dependencies": {
    "react": "18.2.0",
    "react-router": "6.8.0"
  }
}
```

### 3. **Gradual Team Migration**

When different teams are ready to adopt changes at different paces:

```bash
# Team A is ready for the latest
packages/team-a-app/

# Team B needs more time
packages/team-b-app/
```

## The Hidden Costs of Multi-Version as Default

While multi-version policies can be useful in specific scenarios, using them as your **default strategy** often leads to significant problems:

### 1. **Dependency Drift**

Teams gradually fall behind without realizing it:

```json
// After 6 months...
// Project A
{ "dependencies": { "lodash": "4.17.21" } }

// Project B  
{ "dependencies": { "lodash": "4.17.15" } }

// Project C
{ "dependencies": { "lodash": "4.16.4" } }
```

### 2. **Package Hoisting Issues**

Package managers hoist dependencies unpredictably, leading to runtime errors:

```bash
# NPM might hoist the wrong version
node_modules/
  lodash/ (4.17.15 - not what Project A expected!)
  .../
    lodash@4.17.21/
```

### 3. **Sharing Friction**

Code sharing requires constant version alignment work:

```typescript
// This shared utility breaks because projects
// use different versions of the underlying library
export function formatDate(date: Date) {
  return moment(date).format('YYYY-MM-DD'); // Which moment version?
}
```

### 4. **Security Vulnerability Sprawl**

Security updates become complex archaeological expeditions:

```bash
# How many places do we need to update?
grep -r "vulnerable-package" packages/*/package.json
# packages/app-1/package.json: "vulnerable-package": "1.2.3"
# packages/app-2/package.json: "vulnerable-package": "1.2.1" 
# packages/lib-3/package.json: "vulnerable-package": "1.1.9"
```

## Best Practices and Recommendations

Based on our experience with enterprise teams, here are our recommendations:

### 1. **Default to Single Version**

Start with a single version policy and only deviate when you have a compelling reason:

```json
// Root package.json - define versions once
{
  "devDependencies": {
    "typescript": "5.1.6",
    "eslint": "8.44.0",
    "jest": "29.6.1"
  }
}
```

### 2. **Use Module Boundary Rules for Isolation**

When you do need multi-version setups, enforce boundaries to prevent contamination:

```json
// .eslintrc.json
{
  "rules": {
    "@nx/enforce-module-boundaries": [
      "error",
      {
        "depConstraints": [
          {
            "sourceTag": "scope:legacy",
            "onlyDependOnLibsWithTags": ["scope:legacy", "scope:shared-legacy"]
          }
        ]
      }
    ]
  }
}
```

### 3. **Automate Version Management**

Use tools to keep versions in sync:

```bash
# Use Nx to sync versions across projects
npx nx run-many --target=update --all

# Or use tools like syncpack
npx syncpack list-mismatches
```

### 4. **Plan Migration Paths**

When using multi-version temporarily, have a clear plan to converge:

```typescript
// Document your migration strategy
/**
 * Migration Plan for React 16 → 18
 * 
 * Phase 1: Update shared libraries (Q1 2024)
 * Phase 2: Update main applications (Q2 2024)  
 * Phase 3: Update legacy admin (Q3 2024)
 * Phase 4: Remove React 16 entirely (Q4 2024)
 */
```

### 5. **Monitor Version Drift**

Set up automated checks to catch drift early:

```json
// package.json script
{
  "scripts": {
    "check-versions": "syncpack list-mismatches",
    "fix-versions": "syncpack fix-mismatches"
  }
}
```

## Tooling Support in the New Nx Experience

The new NPM workspace setup gives you tools to support both approaches:

### Single Version Support

```bash
# Nx can help manage consistent versions
npx nx run-many --target=upgrade --all

# Use root-level dependencies
npm install react@18.2.0 --workspace-root
```

### Multi-Version Support

```bash
# Install different versions per project
npm install react@17.0.2 --workspace=packages/legacy-app
npm install react@18.2.0 --workspace=packages/new-app
```

### Version Monitoring

```typescript
// Custom Nx plugin to enforce version policies
export default function versionPolicyPlugin() {
  return {
    name: 'version-policy',
    targets: {
      'check-versions': {
        command: 'node scripts/check-version-policy.js'
      }
    }
  };
}
```

## Conclusion

The flexibility offered by Nx's NPM workspace support is powerful, but with great power comes great responsibility. While you now have the freedom to implement any dependency strategy you want, we strongly recommend defaulting to a single version policy based on our extensive experience with enterprise teams.

Use multi-version policies sparingly and strategically:
- ✅ **Temporary migration periods**
- ✅ **Legacy application isolation** 
- ✅ **Gradual team adoption**
- ❌ **Default strategy**
- ❌ **Team convenience**
- ❌ **Avoiding upgrade work**

Remember: the primary goal of a monorepo is to **improve collaboration and code sharing**. A single version policy supports this goal, while a multi-version default often undermines it.

The new Nx experience gives you the tools to implement either approach successfully. Choose wisely, and your future self (and your teammates) will thank you.

---

**What's your experience with dependency management in monorepos?** Have you encountered challenges with multi-version setups? We'd love to hear your stories and learn from your experiences.

---

- 🧠 [Nx Docs](/getting-started/intro)
- 👩‍💻 [Nx GitHub](https://github.com/nrwl/nx)
- 💬 [Nx Official Discord Server](https://go.nx.dev/community)
- 📹 [Nx Youtube Channel](https://www.youtube.com/@nxdevtools)