import { cn } from "@/lib/utils";
import Image from "next/image";

const flagUrl = (code: string) => `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

function Flag({ code, name, className }: { code: string; name: string; className?: string }) {
  return (
    <Image
      src={flagUrl(code)}
      width={20}
      height={15}
      alt={name}
      className={cn("rounded-[2px] object-cover", className)}
    />
  );
}

export default Flag;