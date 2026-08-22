import Pricings from "@/app/ui/components/pricings";
import Divider4 from "../ui/components/themes/divider-medival";
import ResumeShooting from "../ui/components/pricings/resumeShooting";

export default function PricingsPage() {
  return (
    <main className="flex flex-col p-10 my-5">
      <Pricings />
      <Divider4/>
      <ResumeShooting />
    </main>
  );
}