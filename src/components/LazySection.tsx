import React, { Suspense, memo } from "react";
import { useInView } from "react-intersection-observer";

interface LazySectionProps<T> {
  /** The React component to be lazily loaded */
  component: React.ComponentType<T>;
  /** Fallback UI (skeleton or loader) shown until component loads */
  fallback: React.ReactNode;
  /** Props passed to the lazily loaded component */
  props: T;
}

/**
 * LazySection
 * - Loads a section component only when it enters the viewport
 * - Uses Intersection Observer for performance
 */
const LazySection = <T extends object>({
  component: Component,
  fallback,
  props,
}: LazySectionProps<T>) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px", // preload slightly before entering view
  });

  return (
    <div ref={ref}>
      <Suspense fallback={fallback}>
        {inView ? <Component {...props} /> : fallback}
      </Suspense>
    </div>
  );
};

export default memo(LazySection);
