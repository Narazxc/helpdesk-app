import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export function SelectDemo() {
  const [status, setStatus] = React.useState("apple");

  return (
    <Select value={status} onValueChange={setStatus}>
      {/* Change trigger background and text color */}
      {/* pl-3 pr-3 */}
      <SelectTrigger className="w-[7rem] py-5 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg h-9 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      {/* Change dropdown background */}
      <SelectContent className="border-gray-300 dark:border-gray-700 dark:bg-gray-900">
        <SelectGroup>
          <SelectLabel className="text-gray-800 dark:text-white/90">
            Sort
          </SelectLabel>
          {/* Change item colors and hover states */}
          <SelectItem
            value="apple"
            className="text-gray-500 dark:text-gray-400 focus:bg-brand-50 dark:focus:bg-gray-800"
          >
            Active
          </SelectItem>
          <SelectItem
            value="banana"
            className="text-gray-500 dark:text-gray-400 focus:bg-brand-50 dark:focus:bg-gray-800"
          >
            Inactive
          </SelectItem>
          {/* <SelectItem
            value="blueberry"
            className="text-gray-500 dark:text-gray-400 focus:bg-brand-50 dark:focus:bg-gray-800"
          >
            Blueberry
          </SelectItem>
          <SelectItem
            value="grapes"
            className="text-gray-500 dark:text-gray-400 focus:bg-brand-50 dark:focus:bg-gray-800"
          >
            Grapes
          </SelectItem>
          <SelectItem
            value="pineapple"
            className="text-gray-500 dark:text-gray-400 focus:bg-brand-50 dark:focus:bg-gray-800"
          >
            Pineapple
          </SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
