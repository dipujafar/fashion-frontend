import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { careInstructionsOptions } from "../schema";

export function CareInstructionsField({ field }: { field: any }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between min-h-10 h-fit bg-[#f2f2f2]"
          >
            <div className="flex flex-wrap gap-1">
              {field.value?.length > 0 ? (
             
                field.value.map((value: any) => {
                  const option = careInstructionsOptions.find(
                    (opt) => opt.id === value
                  );
                  return (
                    <Badge key={value} variant="secondary" className="mr-1 bg-black text-white">
                      {option?.label}
                      <button
                        type="button"
                        className="ml-1 hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          field.onChange(
                            field.value?.filter((v: any) => v !== value)
                          );
                        }}
                      >
                        <X className="h-3 w-3 cursor-pointer"  />
                      </button>
                    </Badge>
                  );
                })
              ) : (
                <span className="text-muted-foreground">
                  Select care instructions...
                </span>
              )}
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-full  p-0" align="start">
        <div className="max-h-64 overflow-auto p-4">
          <div className="space-y-2">
            {careInstructionsOptions.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  className="cursor-pointer"
                  checked={field.value?.includes(item.id)}
                  onCheckedChange={(checked) => {
                    return checked
                      ? field.onChange([...field.value, item.id])
                      : field.onChange(
                        // @ts-ignore
                          field.value?.filter((value) => value !== item.id)
                        );
                  }}
                />
                <label className="text-sm font-normal cursor-pointer flex-1">
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
