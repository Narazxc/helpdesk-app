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
// import { useRequestTypes } from "@/features/request-type/useRequestTypes";
import type { RequestType } from "@/types/request-type";

// Props for the component
interface ComboboxProps {
  requestTypes: RequestType[];
}

export function TestCombobox({ requestTypes }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  // const { requestTypes } = useRequestTypes();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          // w-[200px]
          className="h-11 px-[14px] w-auto justify-between"
        >
          {value
            ? requestTypes.find(
                (framework) => framework.requestTypeCode === value
              )?.name
            : "Select Request Type..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      {/*   */}
      <PopoverContent className="w-[400px] p-0 z-[99999]">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          {/* Limit height and add scroll */}
          <CommandList className="max-h-[200px] overflow-y-auto">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {requestTypes.map((framework) => (
                <CommandItem
                  key={framework.id}
                  value={framework.requestTypeCode}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.requestTypeCode
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

  //   return (
  //     <Popover open={open} onOpenChange={setOpen}>
  //       <PopoverTrigger asChild>
  //         <Button
  //           variant="outline"
  //           role="combobox"
  //           aria-expanded={open}
  //           className="w-[200px] justify-between"
  //         >
  //           {value
  //             ? frameworks.find((framework) => framework.value === value)?.label
  //             : "Select framework..."}
  //           <ChevronsUpDown className="opacity-50" />
  //         </Button>
  //       </PopoverTrigger>
  //       <PopoverContent className="w-[200px] p-0">
  //         <Command>
  //           <CommandInput placeholder="Search framework..." className="h-9" />
  //           <CommandList>
  //             <CommandEmpty>No framework found.</CommandEmpty>
  //             <CommandGroup>
  //               {requestTypes.map((framework) => (
  //                 <CommandItem
  //                   key={framework.name}
  //                   value={framework.requestTypeCode}
  //                   onSelect={(currentValue) => {
  //                     setValue(currentValue === value ? "" : currentValue);
  //                     setOpen(false);
  //                   }}
  //                 >
  //                   {framework.name}
  //                   <Check
  //                     className={cn(
  //                       "ml-auto",
  //                       value === framework.name ? "opacity-100" : "opacity-0"
  //                     )}
  //                   />
  //                 </CommandItem>
  //               ))}
  //             </CommandGroup>
  //           </CommandList>
  //         </Command>
  //       </PopoverContent>
  //     </Popover>
  //   );
}
