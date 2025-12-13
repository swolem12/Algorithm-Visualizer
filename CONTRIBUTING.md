# Contributing to Algorithm Atlas

Thank you for your interest in contributing! This document provides guidelines for adding new visualizations and improving the project.

## Adding a New Algorithm Topic

### 1. Create the Topic Component

Create a new file in `src/topics/YourTopic.tsx`:

```tsx
import React from "react";

const YourTopicAlgorithms: React.FC = () => {
  return (
    <div className="w-full space-y-6">
      <header className="space-y-3 border-b border-slate-800 pb-4">
        <h1 className="text-slate-50 text-2xl font-semibold tracking-tight">
          Your Topic Title
        </h1>
        <p className="text-slate-300 text-[13px] leading-relaxed">
          Brief description of the topic...
        </p>
      </header>

      <section className="space-y-4">
        {/* Your visualizations here */}
      </section>
    </div>
  );
};

export default YourTopicAlgorithms;
```

### 2. Register the Topic

In `src/App.tsx`, add your topic to the `topics` array:

```tsx
const topics = [
  // ... existing topics
  { 
    id: "yourtopic", 
    label: "Your Topic Name", 
    short: "Short Name",
    description: "Brief description for tooltip"
  },
];
```

Then add the import and case to `TopicContent`:

```tsx
import YourTopicAlgorithms from "./topics/YourTopicAlgorithms";

// In TopicContent component:
case "yourtopic":
  return <YourTopicAlgorithms />;
```

## Creating Visualizations

### SVG Pattern

Most visualizers follow this pattern:

```tsx
const YourVisualizer: React.FC<{ param: number }> = ({ param }) => {
  const width = 360;
  const height = 220;
  const margin = 30;

  const data = useMemo(() => {
    // Compute visualization data
    return computedData;
  }, [param]);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between text-[11px] text-slate-200">
        <span className="font-semibold">Visualizer Title</span>
        <span className="text-slate-500">Brief description</span>
      </div>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto rounded-xl bg-slate-950/70 border border-slate-800"
      >
        {/* SVG content */}
      </svg>
      <p className="text-[11px] text-slate-400 leading-snug">
        Detailed explanation of what the visualization shows...
      </p>
    </div>
  );
};
```

### Animation Pattern

For animated visualizations:

```tsx
const [frame, setFrame] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setFrame(prev => (prev + 1) % maxFrames);
  }, 100); // Update every 100ms
  
  return () => clearInterval(interval);
}, [dependencies]);
```

## Styling Guidelines

### Color Palette

- Background: `bg-slate-950`, `bg-slate-900`
- Borders: `border-slate-800`, `border-slate-700`
- Text: `text-slate-50` (headings), `text-slate-300` (body), `text-slate-400` (muted)
- Accents: `text-sky-300`, `text-emerald-300`, `text-purple-300`
- Charts: `#22c55e` (green), `#38bdf8` (blue), `#f97316` (orange)

### Spacing

- Section gaps: `space-y-4` or `space-y-6`
- Card padding: `p-4`
- Text sizes: `text-[11px]` (small), `text-[12px]` (body), `text-[13px]` (large)

## Math Utilities

Add complex math functions to `src/utils/` directory:

```tsx
// src/utils/yourMath.ts
export function yourAlgorithm(param: number): number[] {
  // Implementation
  return results;
}
```

## Testing Locally

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

## Code Quality

### TypeScript

- Use explicit types for props interfaces
- Avoid `any` type
- Prefix unused parameters with `_`

### React

- Use `React.FC` for functional components
- Use `useMemo` for expensive computations
- Use `useEffect` for animations and side effects
- Cleanup intervals and timeouts in `useEffect` returns

### Performance

- Memoize expensive calculations
- Use `useMemo` and `useCallback` appropriately
- Keep SVG element counts reasonable (<10,000 elements)
- Consider virtualization for large datasets

## Documentation

Every visualizer should include:
1. **Title and subtitle**: What it shows
2. **Code example**: Working implementation
3. **Description**: What's happening and why it matters
4. **Real-world connection**: Where this applies

## Examples to Follow

Good examples in the codebase:
- `ChaosAlgorithms.tsx`: Bifurcation diagram, cobweb diagram
- `StochasticAlgorithms.tsx`: Random walk, Monte Carlo π
- `MachineLearningAlgorithms.tsx`: Linear regression, training curves

## Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-viz`
3. Make your changes
4. Test locally: `npm run build`
5. Commit: `git commit -m "Add amazing visualization"`
6. Push: `git push origin feature/amazing-viz`
7. Open a Pull Request with:
   - Clear description of what you added
   - Screenshots or GIFs of the visualization
   - Any new dependencies explained

## Ideas for Contributions

- **New Topics**: Evolutionary algorithms, graph theory, cryptography
- **Enhanced Visualizations**: 3D renderings, WebGL for performance
- **Interactivity**: More user controls, parameter exploration
- **Educational Content**: More detailed explanations, references
- **Performance**: Optimize rendering, reduce bundle size
- **Mobile**: Improve touch interactions
- **Accessibility**: ARIA labels, keyboard navigation
- **Tests**: Unit tests for math utilities

## Questions?

Open an issue on GitHub or start a discussion. We're here to help!

---

**Happy coding! 🎨**
