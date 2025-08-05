import { Field, Label } from "@headlessui/react";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import clsx from "clsx";

export default function MonthYearPickerDropdown() {
  const currentYear = new Date().getFullYear();
  const [month, setMonth] = useState({ value: "1", label: "January" });
  const [year, setYear] = useState(currentYear.toString());

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years = Array.from({ length: currentYear - 1999 }, (_, i) =>
    (currentYear - i).toString()
  );

  return (
    <div className="w-full max-w-md px-4 space-y-6 flex gap-4">
      <div className="mb-0">
        {/* Month Dropdown */}
        <Field>
          <div className="flex items-center gap-3">
            <Label className="text-sm font-medium text-black">Month</Label>
            {/* <Description className="text-sm text-black/50">
            Choose a month to filter your dashboard.
          </Description> */}
            <Listbox value={month} onChange={setMonth}>
              <div className="relative">
                <Listbox.Button className="w-full rounded-lg bg-black/5 px-3 py-1.5 text-sm text-black text-left flex justify-between items-center">
                  {month.label}
                  <ChevronDownIcon className="size-4 fill-black/60" />
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 max-h-40 w-full overflow-y-auto rounded-lg bg-black/5 py-1 shadow-lg z-10 text-sm text-black">
                  {months.map((m) => (
                    <Listbox.Option
                      key={m.value}
                      value={m}
                      className={({ active }) =>
                        clsx(
                          "cursor-pointer px-3 py-1.5",
                          active ? "bg-white/10" : "bg-white/5"
                        )
                      }
                    >
                      {m.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        </Field>
      </div>

      {/* Year Dropdown */}
      <div className="mb-0">
        <Field>
          <div className="flex items-center gap-3">
            <Label className="text-sm font-medium text-black">Year</Label>
            {/* <Description className="text-sm text-black/50">
            Choose a year to filter your dashboard.
          </Description> */}
            <Listbox value={year} onChange={setYear}>
              <div className="relative">
                <Listbox.Button className="w-full rounded-lg bg-black/5 px-3 py-1.5 text-sm text-black text-left flex justify-between items-center">
                  {year}
                  <ChevronDownIcon className="size-4 fill-black/60" />
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 max-h-40 w-full overflow-y-auto rounded-lg bg-black/5 py-1 shadow-lg z-10 text-sm text-black">
                  {years.map((y) => (
                    <Listbox.Option
                      key={y}
                      value={y}
                      className={({ active }) =>
                        clsx(
                          "cursor-pointer px-3 py-1.5",
                          active ? "bg-black/10" : "bg-black/5"
                        )
                      }
                    >
                      {y}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        </Field>
      </div>
    </div>
  );
}
