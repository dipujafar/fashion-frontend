import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type TPropsDatatype = {
  icon: ReactNode;
  title: string;
  value: string;
};

export default function SaleStatsCard({ data }: { data: TPropsDatatype[] }) {
  return (
    <div className={cn(`grid grid-cols-1 md:grid-cols-${data?.length}  gap-4 mb-4`)}>
      {data?.map((item) => (
        <Card key={item?.title}>
          <CardContent className="flex items-center">
            <div className="flex items-center space-x-4">
              <div className="size-15 bg-black rounded-full flex items-center justify-center">
                {item?.icon}
              </div>
              <div>
                <p className="text-lg text-muted-foreground">{item?.title}</p>
                <p className="text-2xl font-bold">{item?.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
