import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function DealsBanner() {
  return (
    <section className="py-12 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_5s_linear_infinite]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-primary-foreground">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Summer Performance Sale</h2>
            <p className="text-primary-foreground/80 font-medium">Get up to 30% off selected exhaust systems and tuning kits.</p>
          </div>
          <Button variant="secondary" size="lg" className="whitespace-nowrap rounded-full font-bold">
            Shop the Sale <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
