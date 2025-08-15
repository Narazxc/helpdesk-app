import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { RequestType } from "@/types/request-type";

interface ComboboxProps {
  requestTypes: RequestType[];
  value: string;
  onChange: (value: string) => void;
}

export function Combobox({ requestTypes, value, onChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-11 px-[14px] w-full justify-between"
        >
          {value
            ? requestTypes.find((item) => item.requestTypeCode === value)?.name
            : "Select Request Type..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      {/* w-full */}
      <PopoverContent className="w-[400px] p-0 z-[99999]">
        <Command>
          <CommandInput placeholder="Search request type..." className="h-9" />
          <CommandList className="max-h-[200px] overflow-y-auto">
            <CommandEmpty>No request type found.</CommandEmpty>
            <CommandGroup>
              {requestTypes.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => {
                    onChange(item.requestTypeCode);
                    setOpen(false);
                  }}
                >
                  {item.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.requestTypeCode
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
