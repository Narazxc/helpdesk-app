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
import type { CategoryType } from "@/types/category-type";

interface CategoryTypeComboboxProps {
  categoryTypes: CategoryType[];
  value: string;
  onChange: (value: string) => void;
  id?: string; // Add id prop for accessibility
}

export function CategoryTypeCombobox({
  categoryTypes,
  value,
  id,
  onChange,
}: CategoryTypeComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const isParentDeleted = categoryTypes.find(
    (item) => item.categoryTypeCode === value
  )?.name;

  // && isParentDeleted

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id} // Add the id to the trigger button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-11 px-[14px] w-full justify-between"
        >
          {value && isParentDeleted
            ? categoryTypes.find((item) => item.categoryTypeCode === value)
                ?.name
            : // Select Request Type...
              "Select Type..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      {/* w-full */}
      <PopoverContent className="w-[400px] p-0 z-[99999]">
        <Command>
          {/* Search request type... */}
          <CommandInput placeholder="Search type..." className="h-9" />
          <CommandList className="max-h-[200px] overflow-y-auto">
            <CommandEmpty>No category type found.</CommandEmpty>
            <CommandGroup>
              {categoryTypes.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => {
                    onChange(item.categoryTypeCode);
                    setOpen(false);
                  }}
                >
                  {item.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.categoryTypeCode
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
