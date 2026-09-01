import PricingsBackground from "@/app/ui/components/pricings/pricingsBackground";

export default function PricingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <PricingsBackground />
      <div className="relative z-10">{children}</div>
    </div>
  );
}