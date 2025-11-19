import { CircleAlert } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/tooltip";

interface InfoTooltipProps {
  toolTipText: string;
}

export default function InfoTooltip({ toolTipText }: InfoTooltipProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <div className="text-gray-500 h-[25px] hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
            <CircleAlert className="w-4 text-gray-500" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{toolTipText}</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}
