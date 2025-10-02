import Button from "@/components/ui/button/Button";
import { GenericCombobox } from "@/components/GenericCombobox";
import { useAllUsers } from "../auth/useAllUsers";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Label from "@/components/form/Label";
import type { CreateAgentGroup, CreateAgentGroup2 } from "@/types/agent-group";
import { useGroupLevels } from "./useGroupLevels";
import { useOfficeGroups } from "../office-group/useOfficeGroups";

import { useCreateAgentGroup } from "./useCreateAgentGroup";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// testing shadcn command component
import { CommandItem } from "@/components/ui/command";
import { useState } from "react";
// import SelectMultipleUserInput from "./SelectMultipleUserInput";
import CustomizedInput from "@/components/form/input/CustomizedInput";
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

interface CreateAgentGroupFormProps {
  closeModal: () => void;
}

// const multiOptions = [
//   { value: "1", text: "Option 1", selected: false },
//   { value: "2", text: "Option 2", selected: false },
//   { value: "3", text: "Option 3", selected: false },
//   { value: "4", text: "Option 4", selected: false },
//   { value: "5", text: "Option 5", selected: false },
// ];

// // Sample user data
// const users1 = [
//   { id: 1, username: "sitha_s", email: "sitha@example.com", icon: User },
//   { id: 2, username: "anna_w", email: "anna@example.com", icon: User },
//   { id: 3, username: "john_doe", email: "john@example.com", icon: Mail },
//   { id: 4, username: "maria_k", email: "maria@example.com", icon: Mail },
// ];

// const users1 = [
//   { id: 1, username: "sitha_s", email: "sitha@example.com", icon: User },
//   { id: 2, username: "anna_w", email: "anna@example.com", icon: User },
//   { id: 3, username: "john_doe", email: "john@example.com", icon: Mail },
//   { id: 4, username: "maria_k", email: "maria@example.com", icon: Mail },
//   { id: 5, username: "kevin_r", email: "kevin@example.com", icon: Phone },
//   { id: 6, username: "linda_p", email: "linda@example.com", icon: Shield },
//   { id: 7, username: "george_t", email: "george@example.com", icon: Laptop },
//   { id: 8, username: "emily_j", email: "emily@example.com", icon: Globe },
//   { id: 9, username: "david_b", email: "david@example.com", icon: Briefcase },
//   { id: 10, username: "susan_m", email: "susan@example.com", icon: Mail },
//   { id: 11, username: "patrick_o", email: "patrick@example.com", icon: Shield },
//   { id: 12, username: "natalie_k", email: "natalie@example.com", icon: Phone },
//   { id: 13, username: "bruce_w", email: "bruce@example.com", icon: Laptop },
//   { id: 14, username: "samantha_c", email: "samantha@example.com", icon: User },
//   { id: 15, username: "victor_h", email: "victor@example.com", icon: Mail },
//   { id: 16, username: "grace_t", email: "grace@example.com", icon: Globe },
//   { id: 17, username: "james_l", email: "james@example.com", icon: Phone },
//   { id: 18, username: "clara_d", email: "clara@example.com", icon: Shield },
//   { id: 19, username: "mark_p", email: "mark@example.com", icon: Briefcase },
//   { id: 20, username: "olivia_r", email: "olivia@example.com", icon: Laptop },
// ];

// const defaultTags = [
//   { id: "react", label: "React" },
//   { id: "typescript", label: "TypeScript" },
//   { id: "javascript", label: "JavaScript" },
//   { id: "nextjs", label: "Next.js" },
//   { id: "vuejs", label: "Vue.js" },
//   { id: "angular", label: "Angular" },
//   { id: "svelte", label: "Svelte" },
//   { id: "nodejs", label: "Node.js" },
//   { id: "python", label: "Python" },
//   { id: "ruby", label: "Ruby" },
//   { id: "java", label: "Java" },
//   { id: "csharp", label: "C#" },
//   { id: "php", label: "PHP" },
//   { id: "go", label: "Go" },
// ];

export default function CreateAgentGroupForm({
  closeModal,
}: CreateAgentGroupFormProps) {
  const { users } = useAllUsers();
  const { groupLevels } = useGroupLevels();
  const { officeGroups } = useOfficeGroups();
  const { createAgentGroup } = useCreateAgentGroup();

  // const [usersa, setUsersa] = useState(users1); // remaining users
  // const [selectedUsers, setSelectedUsers] = useState<typeof users1>([]); // selected users

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateAgentGroup>();

  //========================================================================//

  const [selected, setSelected] = useState<string[]>([]);
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

  const onSubmit: SubmitHandler<CreateAgentGroup> = (data) => {
    const toSend: CreateAgentGroup2 = {
      agentName: data.agentGroupName,
      leaderCode: data.leaderName,
      groupLevel: data.groupLevel,
      officeGroupCode: data.officeGroupCode,
      memberCodes: selected,
    };

    // createAgentGroup(toSend);
    // console.log("toSend", toSend);
    createAgentGroup(toSend);

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
        Add Agent Group
      </h4>

      <div className="flex flex-col gap-4">
        {/* Agent Group Name */}
        <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="agentGroupName"
            className="mb-0.5 text-gray-700 w-fit dark:text-gray-100 pt-2 font-normal"
          >
            Group Name<span className="text-red-500"> *</span>
          </Label>
          <div className="flex flex-col">
            <CustomizedInput
              type="text"
              autoFocus={true}
              error={!!errors.agentGroupName}
              placeholder="Enter Agent Group Name"
              id="agentGroupName"
              className={`px-3 py-2 border rounded-md focus:outline-none ${
                errors.agentGroupName
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
              {...register("agentGroupName", {
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
            {errors.agentGroupName && (
              <span className="text-red-500 text-sm mt-1">
                {errors.agentGroupName.message}
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
              rules={{ required: "Please select a group level" }} // Optional validation
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
            {errors.groupLevel && (
              <span className="text-red-500 text-sm mt-1">
                {errors.groupLevel.message}
              </span>
            )}
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
              rules={{ required: "Please select an office" }} // Optional validation
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
            {errors.officeGroupCode && (
              <span className="text-red-500 text-sm mt-1">
                {errors.officeGroupCode.message}
              </span>
            )}
          </div>
        </div>

        {/* Leader Name */}
        <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="leaderName"
            className="mb-0.5 text-gray-700 w-fit dark:text-gray-100 pt-2 font-normal"
          >
            Leader<span className="text-red-500"> *</span>
          </Label>
          <div className="flex flex-col">
            <Controller
              name="leaderName" // This is the field name in your form data
              control={control}
              rules={{ required: "Please select a leader" }} // Optional validation
              render={({ field }) => (
                <GenericCombobox
                  id="leaderName"
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
            {errors.leaderName && (
              <span className="text-red-500 text-sm mt-1">
                {errors.leaderName.message}
              </span>
            )}
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
          {/* <Controller
              name="officeGroupCode"
              control={control}
              rules={{ required: "Please select a leader" }} // Optional validation
              render={({ field }) => (
                <GenericCombobox
                  items={officeGroups}
                  value={field.value}
                  onChange={field.onChange}
                  getDisplayValue={(officeGroup) => officeGroup.officeName}
                  getItemValue={(officeGroup) => officeGroup.officeGroupCode}
                  getItemKey={(officeGroup) => officeGroup.officeGroupCode}
                  placeholder="Office Group"
                  searchPlaceholder="Search users..."
                  emptyMessage="No users found."
                  // error={fieldState.error?.message} // Pass validation errors if your component supports it
                />
              )}
            /> */}
        </div>
      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-8">
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

// {/* <div className="flex flex-col">
//   <div className="h-[40px] flex gap-2 rounded-md bg-pink-100">
//     {selectedUsers.map((a) => (
//       <div className="bg-blue-200 h-[20px] w-[20px]">{a.username}</div>
//     ))}
//   </div>

//   <Popover onOpenChange={(open) => console.log("Popover open:", open)}>
//     <PopoverTrigger>
//       <SelectMultipleUserInput
//         type="text"
//         autoFocus={true}
//         error={!!errors.memberRole}
//         placeholder="Enter Request Type Name"
//         id="memberRole"
//         className={`px-3 py-2 border rounded-md focus:outline-none ${
//           errors.memberRole
//             ? "border-red-500"
//             : "border-gray-300 focus:ring-blue-500"
//         } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
//         {...register(
//           "memberRole"
//           // {
//           //   required: "Agent Group name is required",
//           //   maxLength: {
//           //     value: 50,
//           //     message: "must be less than 50 characters",
//           //   },
//           //   minLength: {
//           //     value: 2,
//           //     message: "must be at least 2 characters",
//           //   },
//           // }
//         )}
//       />
//     </PopoverTrigger>
//     <PopoverContent className="w-[400px] p-0 z-[99999]">
//       {/* <p>Popover works!</p> */}
//       {/* className="rounded-lg border shadow-md md:min-w-[450px]" */}

//       {/* <Command>
//                   <CommandInput placeholder="Type a command or search..." />
//                   <CommandList className="max-h-[200px] overflow-y-auto">
//                     <CommandEmpty>No results found.</CommandEmpty>
//                     <CommandGroup heading="Suggestions">
//                       <CommandItem>
//                         <Calendar />
//                         <span>Calendar</span>
//                       </CommandItem>
//                       <CommandItem>
//                         <Smile />
//                         <span>Search Emoji</span>
//                       </CommandItem>
//                       <CommandItem disabled>
//                         <Calculator />
//                         <span>Calculator</span>
//                       </CommandItem>
//                     </CommandGroup>
//                     <CommandSeparator />
//                     <CommandGroup heading="Settings">
//                       <CommandItem>
//                         <User />
//                         <span>Profile</span>
//                         <CommandShortcut>⌘P</CommandShortcut>
//                       </CommandItem>
//                       <CommandItem>
//                         <CreditCard />
//                         <span>Billing</span>
//                         <CommandShortcut>⌘B</CommandShortcut>
//                       </CommandItem>
//                       <CommandItem>
//                         <Settings />
//                         <span>Settings</span>
//                         <CommandShortcut>⌘S</CommandShortcut>
//                       </CommandItem>
//                     </CommandGroup>
//                   </CommandList>
//                 </Command> */}

//       <Command>
//         <CommandInput placeholder="Type a command or search..." />
//         <CommandList className="max-h-[200px] overflow-y-auto">
//           <CommandEmpty>No results found.</CommandEmpty>

//           {usersa.length > 0 && (
//             <CommandGroup heading="Users">
//               {usersa.map((user) => {
//                 const Icon = user.icon;
//                 return (
//                   <CommandItem
//                     key={user.id}
//                     onSelect={() => selectUser(user.id)}
//                   >
//                     <Icon className="mr-2 h-4 w-4" />
//                     <div className="flex flex-col">
//                       <span className="font-medium">{user.username}</span>
//                       <span className="text-xs text-muted-foreground">
//                         {user.email}
//                       </span>
//                     </div>
//                   </CommandItem>
//                 );
//               })}
//             </CommandGroup>
//           )}

//           {/* <CommandSeparator /> */}
//           {/* <CommandGroup heading="Settings">
//                       <CommandItem>
//                         <User />
//                         <span>Profile</span>
//                         <CommandShortcut>⌘P</CommandShortcut>
//                       </CommandItem>
//                       <CommandItem>
//                         <CreditCard />
//                         <span>Billing</span>
//                         <CommandShortcut>⌘B</CommandShortcut>
//                       </CommandItem>
//                       <CommandItem>
//                         <Settings />
//                         <span>Settings</span>
//                         <CommandShortcut>⌘S</CommandShortcut>
//                       </CommandItem>
//                     </CommandGroup> */}
//         </CommandList>
//       </Command>
//     </PopoverContent>
//   </Popover>

//   {errors.memberRole && (
//     <span className="text-red-500 text-sm mt-1">
//       {errors.memberRole.message}
//     </span>
//   )}
// </div>; */}

//===================================== Tags

// <Tags className="max-w-[400px]">
//   <TagsTrigger>
//     {/* {selected.map((tag) => (
//                 <TagsValue key={tag} onRemove={() => handleRemove(tag)}>
//                   {tags.find((t) => t.id === tag)?.label}
//                 </TagsValue>
//               ))} */}
//     {selected.map((id) => {
//       const user = usersa.find((u) => String(u.id) === id);
//       if (!user) return null;

//       return (
//         <TagsValue key={id} onRemove={() => handleRemove(id)}>
//           <span>{user.username}</span>
//         </TagsValue>
//       );
//     })}
//   </TagsTrigger>
//   <TagsContent className="w-[400px] p-0 z-[99999]">
//     <TagsInput onValueChange={setNewTag} placeholder="Search users..." />
//     <TagsList>
//       <TagsEmpty />
//       <TagsGroup>
//         {/* {tags
//                     .filter((tag) => !selected.includes(tag.id))
//                     .map((tag) => (
//                       <TagsItem
//                         key={tag.id}
//                         onSelect={handleSelect}
//                         value={tag.id}
//                       >
//                         {tag.label}
//                       </TagsItem>
//                     ))} */}
//         {usersa
//           .filter((user) => !selected.includes(String(user.id))) // Ensure `id` matches string type
//           .map((user) => {
//             const Icon = user.icon;
//             return (
//               <CommandItem
//                 key={user.id}
//                 onSelect={handleSelect}
//                 value={String(user.id)}
//               >
//                 <Icon className="mr-2 h-4 w-4" />
//                 <div className="flex flex-col">
//                   <span className="font-medium">{user.username}</span>
//                   <span className="text-xs text-muted-foreground">
//                     {user.email}
//                   </span>
//                 </div>
//               </CommandItem>
//             );
//           })}
//       </TagsGroup>
//     </TagsList>
//   </TagsContent>
// </Tags>;

//================================================================= Latest
// {/* <Tags className="max-w-[400px]">
//   <TagsTrigger>
//     {selected.map((tag) => (
//       <TagsValue key={tag} onRemove={() => handleRemove(tag)}>
//         {/* {usersa.find((t) => t.id.toString() === tag)?.username} */}
//         {users.find((t) => t.id.toString() === tag)?.userName}
//       </TagsValue>
//     ))}
//   </TagsTrigger>
//   <TagsContent className="w-[400px] p-0 z-[99999]">
//     <TagsInput onValueChange={setNewTag} placeholder="Search tag..." />
//     <TagsList>
//       <TagsEmpty />
//       <TagsGroup>
//         {users
//           .filter((tag) => !selected.includes(tag.id.toString()))
//           .map((tag) => {
//             // const Icon = tag.icon; // ✅ Declare inside map callback but before JSX
//             return (
//               <CommandItem
//                 key={tag.id}
//                 onSelect={handleSelect}
//                 // value={`${tag.username} ${tag.email}`} // for search
//                 value={tag.id.toString()} // ✅ Still use ID for internal tracking
//                 keywords={[tag.userName, tag.email]} // ✅ Used for search filtering

//                 // value={tag.id.toString()}
//                 // value={`${tag.username} ${tag.email}`} // This enables search
//               >
//                 {/* // ✅ Works now
//                           <Icon className="mr-2 h-4 w-4" /> */}
//                 <div className="flex flex-col">
//                   <span className="font-medium">{tag.userName}</span>
//                   <span className="text-xs text-muted-foreground">
//                     {tag.email}
//                   </span>
//                 </div>
//               </CommandItem>
//             );
//           })}
//       </TagsGroup>
//     </TagsList>
//   </TagsContent>
// </Tags>; */}
