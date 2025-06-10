import { useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import type { Hook, DateOption } from "flatpickr/dist/types/options";

type PropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: Hook | Hook[];
  defaultDate?: DateOption;
  label?: string;
  placeholder?: string;
};

export default function RangeDatePicker({
  id,
  mode = "single",
  onChange,
  defaultDate,
  label,
  placeholder = "Select date",
}: PropsType) {
  useEffect(() => {
    const instance = flatpickr(`#${id}`, {
      mode,
      static: true,
      monthSelectorType: "static",
      dateFormat: "Y-m-d",
      defaultDate,
      onChange,
    });

    return () => {
      instance.destroy();
    };
  }, [id, mode, onChange, defaultDate]);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-black">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm text-black placeholder-gray-400"
        />
        <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
          📅 {/* You can replace this with <CalendarIcon /> or similar */}
        </span>
      </div>
    </div>
  );
}
