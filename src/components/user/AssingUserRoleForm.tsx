import React, { useState } from "react";
import Checkbox from "../form/input/Checkbox";

export default function AssingUserRoleForm() {
  const [requesterChecked, setRequesterChecked] = useState(false);
  const [frontdeskChecked, setFrontdeskChecked] = useState(false);
  const [agentLeadChecked, setAgentLeadChecked] = useState(false);
  const [agentChecked, setAgentChecked] = useState(false);
  const [reviewerChecked, setReviewerChecked] = useState(false);
  const [topApproverChecked, setTopApproverChecked] = useState(false);

  // calculated state
  const otherThanRequester =
    frontdeskChecked ||
    agentChecked ||
    agentLeadChecked ||
    reviewerChecked ||
    topApproverChecked;

  return (
    // mix-w-[373px]
    // bg-gray-100
    <div className="grid grid-cols-[10rem_auto] gap-x-8 gap-y-6 items-center max-w-[800px] rounded-lg p-4">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
        Requester
      </span>
      <Checkbox
        className={`${otherThanRequester ? "!cursor-not-allowed" : ""}`}
        checked={requesterChecked}
        onChange={setRequesterChecked}
        disabled={otherThanRequester}
      />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
        Frontdesk Agent
      </span>
      <Checkbox
        className={`${requesterChecked ? "!cursor-not-allowed" : ""}`}
        checked={frontdeskChecked}
        onChange={setFrontdeskChecked}
        disabled={requesterChecked}
      />

      <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
        Agent Lead
      </span>
      <Checkbox
        className={`${requesterChecked ? "!cursor-not-allowed" : ""}`}
        checked={agentLeadChecked}
        onChange={setAgentLeadChecked}
        disabled={requesterChecked}
      />

      <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
        Agent
      </span>
      <Checkbox
        className={`${requesterChecked ? "!cursor-not-allowed" : ""}`}
        checked={agentChecked}
        onChange={setAgentChecked}
        disabled={requesterChecked}
      />

      <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
        Reviewer
      </span>
      <Checkbox
        className={`${requesterChecked ? "!cursor-not-allowed" : ""}`}
        checked={reviewerChecked}
        onChange={setReviewerChecked}
        disabled={requesterChecked}
      />

      <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
        Top Approver
      </span>
      <Checkbox
        className={`${requesterChecked ? "!cursor-not-allowed" : ""}`}
        checked={topApproverChecked}
        onChange={setTopApproverChecked}
        disabled={requesterChecked}
      />
      {/* ... rest of your items */}
    </div>
  );
}
