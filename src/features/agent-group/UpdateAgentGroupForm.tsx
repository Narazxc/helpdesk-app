import Button from "@/components/ui/button/Button";
import { GenericCombobox } from "@/components/GenericCombobox";
import { useAllUsers } from "../auth/useAllUsers";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Label from "@/components/form/Label";
import type { UpdateAgentGroup } from "@/types/agent-group";
import { useGroupLevels } from "./useGroupLevels";
import { useOfficeGroups } from "../office-group/useOfficeGroups";

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// testing shadcn command component
// import { CommandItem } from "@/components/ui/command";
// import SelectMultipleUserInput from "./SelectMultipleUserInput";
import CustomizedInput from "@/components/form/input/CustomizedInput";
// import {
//   Tags,
//   TagsContent,
//   TagsEmpty,
//   TagsGroup,
//   TagsInput,
//   TagsList,
//   TagsTrigger,
//   TagsValue,
// } from "@/components/ui/shadcn-io/tags";
import { useUpdateAgentGroup } from "./useUpdateAgentGroup";

// For add member input
import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsList,
  TagsTrigger,
  TagsValue,
} from "@/components/ui/shadcn-io/tags";
import { useState } from "react";
import { CommandItem } from "@/components/ui/command";

interface UpdateAgentGroupFormProps {
  initialData: { id: string; newAgentGroupData: UpdateAgentGroup };
  closeModal: () => void;
}

export default function UpdateAgentGroupForm({
  initialData,
  closeModal,
}: UpdateAgentGroupFormProps) {
  const { users } = useAllUsers();
  const { groupLevels } = useGroupLevels();
  const { officeGroups } = useOfficeGroups();
  const { updateAgentGroup } = useUpdateAgentGroup();

  // For add members input
  const [selected, setSelected] = useState<string[]>(
    initialData.newAgentGroupData?.memberCodes ?? [] // Use userCodes from your API
  );

  // const [usersa, setUsersa] = useState(users1); // remaining users
  // const [selectedUsers, setSelectedUsers] = useState<typeof users1>([]); // selected users

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateAgentGroup>({
    defaultValues: {
      agentName: initialData.newAgentGroupData.agentName || "",
      leaderCode: initialData.newAgentGroupData.leaderCode || "",
      groupLevel: initialData.newAgentGroupData.groupLevel || "",
      officeGroupCode: initialData.newAgentGroupData.officeGroupCode || "",
    },
  });

  console.log("Initial data", initialData);

  //========================================================================//

  // const [selected, setSelected] = useState<string[]>([]);
  // const [newTag, setNewTag] = useState<string>("");
  // const [tags, setTags] =
  //   useState<{ id: string; label: string }[]>(defaultTags);

  const handleRemove = (value: string) => {
    if (!selected.includes(value)) {
      return;
    }
    setSelected((prev) => prev.filter((v) => v !== value));
  };
  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      handleRemove(value);
      return;
    }
    setSelected((prev) => [...prev, value]);
  };
  //========================================================================//

  const onSubmit: SubmitHandler<UpdateAgentGroup> = (data) => {
    const toSend: UpdateAgentGroup = {
      agentName: data.agentName,
      leaderCode: data.leaderCode,
      groupLevel: data.groupLevel,
      officeGroupCode: data.officeGroupCode,
      memberCodes: selected,
    };

    // createAgentGroup(toSend);
    // console.log("toSend", toSend);
    updateAgentGroup(
      { id: initialData.id, newAgentGroupData: toSend },
      {
        onSuccess: () => {
          reset();
          closeModal();
        },
      }
    );

    reset(); // Reset the form
    closeModal();
  };

  // const selectUser = (id: number) => {
  //   const user = users.find((u) => u.id === id);
  //   if (!user) return;

  //   // Remove from users list
  //   setUsersa((prev) => prev.filter((u) => u.id !== id));

  //   // Add to selectedUsers
  //   setSelectedUsers((prev) => [...prev, user]);

  //   console.log("Selected Users:", [...selectedUsers, user]);
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="mb-7 text-md font-medium text-gray-800 dark:text-white/90">
        Update Agent Group
      </h4>

      <div className="flex flex-col gap-4">
        {/* Module Name */}
        <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="agentName"
            className="mb-0.5 text-gray-700 w-fit dark:text-gray-100 pt-2 font-normal"
          >
            Group Name<span className="text-red-500"> *</span>
          </Label>
          <div className="flex flex-col">
            <CustomizedInput
              type="text"
              autoFocus={true}
              error={!!errors.agentName}
              placeholder="Enter Agent Group Name"
              id="agentName"
              className={`px-3 py-2 border rounded-md focus:outline-none ${
                errors.agentName
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
              {...register("agentName", {
                required: "Agent Group name is required",
                maxLength: {
                  value: 50,
                  message: "must be less than 50 characters",
                },
                minLength: {
                  value: 2,
                  message: "must be at least 2 characters",
                },
              })}
            />
            {errors.agentName && (
              <span className="text-red-500 text-sm mt-1">
                {errors.agentName.message}
              </span>
            )}
          </div>
        </div>

        {/* Group Level */}
        <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="groupLevel"
            className="mb-0.5 text-gray-700 w-fit dark:text-gray-100 pt-2 font-normal"
          >
            Group Level<span className="text-red-500"> *</span>
          </Label>
          <div className="flex flex-col">
            <Controller
              name="groupLevel"
              control={control}
              rules={{ required: "Please select a leader" }} // Optional validation
              render={({ field }) => (
                <GenericCombobox
                  id="groupLevel"
                  items={groupLevels}
                  value={field.value}
                  onChange={field.onChange}
                  getDisplayValue={(groupLevel) => groupLevel.groupLevelName}
                  getItemValue={(groupLevel) => groupLevel.groupLevelCode}
                  getItemKey={(groupLevel) => groupLevel.groupLevelCode}
                  placeholder="Group Level"
                  searchPlaceholder="Search group levels..."
                  emptyMessage="No users found."
                  // error={fieldState.error?.message} // Pass validation errors if your component supports it
                />
              )}
            />
          </div>
        </div>

        {/* Office Group */}
        <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="officeGroupCode"
            className="mb-0.5 text-gray-700 w-fit dark:text-gray-100 pt-2 font-normal"
          >
            Office Name<span className="text-red-500"> *</span>
          </Label>
          <div className="flex flex-col">
            <Controller
              name="officeGroupCode"
              control={control}
              rules={{ required: "Please select a leader" }} // Optional validation
              render={({ field }) => (
                <GenericCombobox
                  id="officeGroupCode"
                  items={officeGroups}
                  value={field.value}
                  onChange={field.onChange}
                  getDisplayValue={(officeGroup) => officeGroup.officeName}
                  getItemValue={(officeGroup) => officeGroup.officeGroupCode}
                  getItemKey={(officeGroup) => officeGroup.officeGroupCode}
                  placeholder="Office Group"
                  searchPlaceholder="Search offices..."
                  emptyMessage="No users found."
                  // error={fieldState.error?.message} // Pass validation errors if your component supports it
                />
              )}
            />
          </div>
        </div>

        {/* Leader Name */}
        <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="leaderCode"
            className="mb-0.5 text-gray-700 w-fit dark:text-gray-100 pt-2 font-normal"
          >
            Leader<span className="text-red-500"> *</span>
          </Label>
          <div className="flex flex-col">
            <Controller
              name="leaderCode" // This is the field name in your form data
              control={control}
              rules={{ required: "Please select a leader" }} // Optional validation
              render={({ field }) => (
                <GenericCombobox
                  id="leaderCode"
                  items={users}
                  value={field.value} // Use field.value instead of selectedUserId
                  onChange={field.onChange} // Use field.onChange instead of zsetSelectedUserId
                  getDisplayValue={(user) => user.userName}
                  getItemValue={(user) => user.userCode}
                  getItemKey={(user) => user.userCode}
                  placeholder="Select User..."
                  searchPlaceholder="Search users..."
                  emptyMessage="No users found."
                  // error={fieldState.error?.message} // Pass validation errors if your component supports it
                />
              )}
            />
          </div>
        </div>

        {/* Add member */}
        <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="memberRole"
            className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
          >
            Add member
          </Label>

          <Tags>
            <TagsTrigger>
              {selected.map((tag) => (
                <TagsValue key={tag} onRemove={() => handleRemove(tag)}>
                  {/* {usersa.find((t) => t.id.toString() === tag)?.username} */}
                  {users.find((t) => t.userCode === tag)?.userName}
                </TagsValue>
              ))}
            </TagsTrigger>
            <TagsContent className="w-[400px] p-0 z-[99999]">
              <TagsInput
                // onValueChange={setNewTag}
                placeholder="Search tag..."
              />
              <TagsList>
                <TagsEmpty />
                <TagsGroup>
                  {users
                    .filter((tag) => !selected.includes(tag.userCode))
                    .map((tag) => {
                      // const Icon = tag.icon; // ✅ Declare inside map callback but before JSX
                      return (
                        <CommandItem
                          key={tag.id}
                          onSelect={() => handleSelect(tag.userCode)}
                          // value={`${tag.username} ${tag.email}`} // for search
                          value={tag.userCode} // ✅ Still use ID for internal tracking
                          keywords={[tag.userName, tag.email]} // ✅ Used for search filtering

                          // value={tag.id.toString()}
                          // value={`${tag.username} ${tag.email}`} // This enables search
                        >
                          {/* // ✅ Works now
                          <Icon className="mr-2 h-4 w-4" /> */}
                          <div className="flex flex-col">
                            <span className="font-medium">{tag.userName}</span>
                            <span className="text-xs text-muted-foreground">
                              {tag.email}
                            </span>
                          </div>
                        </CommandItem>
                      );
                    })}
                </TagsGroup>
              </TagsList>
            </TagsContent>
          </Tags>
        </div>
      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-6">
        <Button size="sm" variant="outline" type="button" onClick={closeModal}>
          Close
        </Button>
        <Button size="sm" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}

// {
//   /* Add member */
// }
// <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
//   <Label
//     htmlFor="memberRole"
//     className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
//   >
//     Add member<span className="text-red-500">*</span>
//   </Label>

//   <Tags className="max-w-[400px]">
//     <TagsTrigger>
//       {selected.map((tag) => (
//         <TagsValue key={tag} onRemove={() => handleRemove(tag)}>
//           {/* {usersa.find((t) => t.id.toString() === tag)?.username} */}
//           {users.find((t) => t.userCode === tag)?.userName}
//         </TagsValue>
//       ))}
//     </TagsTrigger>
//     <TagsContent className="w-[400px] p-0 z-[99999]">
//       <TagsInput
//         // onValueChange={setNewTag}
//         placeholder="Search tag..."
//       />
//       <TagsList>
//         <TagsEmpty />
//         <TagsGroup>
//           {users
//             .filter((tag) => !selected.includes(tag.userCode))
//             .map((tag) => {
//               // const Icon = tag.icon; // ✅ Declare inside map callback but before JSX
//               return (
//                 <CommandItem
//                   key={tag.id}
//                   onSelect={() => handleSelect(tag.userCode)}
//                   // value={`${tag.username} ${tag.email}`} // for search
//                   value={tag.userCode} // ✅ Still use ID for internal tracking
//                   keywords={[tag.userName, tag.email]} // ✅ Used for search filtering

//                   // value={tag.id.toString()}
//                   // value={`${tag.username} ${tag.email}`} // This enables search
//                 >
//                   {/* // ✅ Works now
//                           <Icon className="mr-2 h-4 w-4" /> */}
//                   <div className="flex flex-col">
//                     <span className="font-medium">{tag.userName}</span>
//                     <span className="text-xs text-muted-foreground">
//                       {tag.email}
//                     </span>
//                   </div>
//                 </CommandItem>
//               );
//             })}
//         </TagsGroup>
//       </TagsList>
//     </TagsContent>
//   </Tags>
// </div>;
