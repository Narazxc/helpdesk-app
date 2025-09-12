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

interface GenericComboboxProps<T> {
  items: T[];
  value: string;
  onChange: (value: string) => void;
  getDisplayValue: (item: T) => string; // Function to get display text
  getItemValue: (item: T) => string; // Function to get the value
  getItemKey: (item: T) => string | number; // Function to get unique key
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  id?: string;
  className?: string;
}

export function GenericCombobox<T>({
  items,
  value,
  onChange,
  getDisplayValue,
  getItemValue,
  getItemKey,
  placeholder = "Select item...",
  searchPlaceholder = "Search...",
  emptyMessage = "No items found.",
  id,
  className,
}: GenericComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);

  const selectedItem = items.find((item) => getItemValue(item) === value);
  const displayText = selectedItem
    ? getDisplayValue(selectedItem)
    : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("h-11 px-[14px] w-full justify-between", className)}
        >
          {displayText}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 z-[99999]">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList className="max-h-[200px] overflow-y-auto">
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={getItemKey(item)}
                  value={getDisplayValue(item)}
                  onSelect={() => {
                    onChange(getItemValue(item));
                    setOpen(false);
                  }}
                >
                  {getDisplayValue(item)}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === getItemValue(item) ? "opacity-100" : "opacity-0"
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

// Usage examples:

// For Request Types
/*
<GenericCombobox
  items={requestTypes}
  value={selectedRequestType}
  onChange={setSelectedRequestType}
  getDisplayValue={(item) => item.name}
  getItemValue={(item) => item.requestTypeCode}
  getItemKey={(item) => item.id}
  placeholder="Select Request Type..."
  searchPlaceholder="Search request type..."
  emptyMessage="No request type found."
/>
*/

// For Users
/*
interface User {
  id: number;
  name: string;
  email: string;
}

<GenericCombobox
  items={users}
  value={selectedUserId}
  onChange={setSelectedUserId}
  getDisplayValue={(user) => user.name}
  getItemValue={(user) => user.id.toString()}
  getItemKey={(user) => user.id}
  placeholder="Select User..."
  searchPlaceholder="Search users..."
  emptyMessage="No users found."
/>
*/

// For Categories
/*
interface Category {
  categoryId: string;
  categoryName: string;
  description: string;
}

<GenericCombobox
  items={categories}
  value={selectedCategoryId}
  onChange={setSelectedCategoryId}
  getDisplayValue={(category) => category.categoryName}
  getItemValue={(category) => category.categoryId}
  getItemKey={(category) => category.categoryId}
  placeholder="Select Category..."
  searchPlaceholder="Search categories..."
  emptyMessage="No categories found."
/>
*/
