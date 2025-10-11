import { Skeleton } from "@/components/ui/skeleton";

const HeroSkeleton = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center">
      <div className="absolute inset-0 h-full">
        <Skeleton className="w-full h-full" />
      </div>
      
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Skeleton className="h-16 w-3/4 mx-auto" />
          <Skeleton className="h-8 w-2/3 mx-auto" />
          <Skeleton className="h-6 w-full mx-auto" />
          <Skeleton className="h-40 w-2/3 mx-auto rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
