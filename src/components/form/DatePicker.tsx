// import { useEffect } from "react";
// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.css";
// import Label from "./Label";
// import { CalenderIcon } from "../../icons";
// // import Hook = flatpickr.Options.Hook;
// // import DateOption = flatpickr.Options.DateOption;

// import type { Hook, DateOption } from "flatpickr/dist/types/options";
// import clsx from "clsx";

// type PropsType = {
//   id: string;
//   mode?: "single" | "multiple" | "range" | "time";
//   onChange?: Hook | Hook[];
//   defaultDate?: DateOption;
//   label?: string;
//   placeholder?: string;
//   className?: string;
//   wrapperWidth?: string;
// };

// export default function DatePicker({
//   id,
//   mode,
//   onChange,
//   label,
//   defaultDate,
//   placeholder,
//   className = "",
//   wrapperWidth,
// }: PropsType) {
//   useEffect(() => {
//     const flatPickr = flatpickr(`#${id}`, {
//       mode: mode || "single",
//       static: true,
//       monthSelectorType: "static",
//       dateFormat: "d M Y",
//       defaultDate,
//       closeOnSelect: false,
//       altFormat: "d-M-Y",
//       onChange,
//       locale: {
//         rangeSeparator: " - ", // Change "to" to "-"
//       },
//     });

//     return () => {
//       if (!Array.isArray(flatPickr)) {
//         flatPickr.destroy();
//       }
//     };
//   }, [mode, onChange, id, defaultDate]);

//   return (
//     <div
//       className="datepicker-container"
//       style={{ "--datepicker-width": wrapperWidth } as React.CSSProperties}
//     >
//       {label && <Label htmlFor={id}>{label}</Label>}

//       <div className="relative">
//         <input
//           id={id}
//           placeholder={placeholder}
//           // className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800 ${className}`}
//           className={clsx(
//             "h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800",
//             className
//           )}
//         />

//         <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
//           <CalenderIcon className="size-6" />
//         </span>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import Label from "./Label";
import { CalenderIcon } from "../../icons";
import type { Hook, DateOption } from "flatpickr/dist/types/options";
import clsx from "clsx";

type PropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: Hook | Hook[];
  defaultDate?: DateOption;
  label?: string;
  placeholder?: string;
  className?: string;
  wrapperWidth?: string;
};

export default function DatePicker({
  id,
  mode = "single",
  onChange,
  label,
  defaultDate,
  placeholder,
  className = "",
  wrapperWidth,
}: PropsType) {
  const fpRef = useRef<flatpickr.Instance | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    fpRef.current?.destroy();

    fpRef.current = flatpickr(inputRef.current, {
      mode,
      static: true,
      // monthSelectorType: "static",
      dateFormat: "d M Y",
      defaultDate,
      closeOnSelect: false,
      onChange,
      locale: {
        rangeSeparator: " - ",
      },
    });

    return () => {
      fpRef.current?.destroy();
      fpRef.current = null;
    };
  }, [mode, onChange, defaultDate]);

  return (
    <div
      className="datepicker-container"
      style={{ "--datepicker-width": wrapperWidth } as React.CSSProperties}
    >
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        <input
          ref={inputRef} // ✅ important
          id={id}
          placeholder={placeholder}
          className={clsx(
            "h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800",
            className
          )}
        />

        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <CalenderIcon className="size-6" />
        </span>
      </div>
    </div>
  );
}
