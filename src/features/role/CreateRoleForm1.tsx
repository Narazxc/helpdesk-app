import { useEffect, useMemo, useState } from "react";
import { usePermissions } from "./usePermissions";
import type { Permission } from "@/types/permission";

import PageMeta from "@/components/common/PageMeta";
import { Link } from "react-router";
import CustomizedInput from "@/components/form/input/CustomizedInput";
import Label from "@/components/form/Label";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import type { CreateRole } from "@/types/role";
import { useCreateRole } from "./useCreateRole";
import Button from "@/components/ui/button/Button";
import { flushSync } from "react-dom";
import { Spinner } from "@/components/ui/spinner";

type CategorizedPermissions = {
  T: Permission[];
  U: Permission[];
  W: Permission[];
};

export default function CreateRoleForm1() {
  const {
    // control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateRole>();
  const { isLoading, permissions } = usePermissions();
  const { createRole, isCreating } = useCreateRole();

  //   {
  //   onSuccess: () => {
  //     flushSync(() => {
  //       setSelectedPermissions([]);
  //       setIsAllSelected(false);
  //     });
  //     reset();
  //   },
  // }

  // Permission checkbox states
  // Add state to track "select all" checkbox
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [isAllTicketPermissionsSelected, setIsAllTicketPermissionsSelected] =
    useState(false);
  const [
    isAllWorkflowPermissionsSelected,
    setIsAllWorkflowPermissionsSelected,
  ] = useState(false);
  const [isAllUserPermissionsSelected, setIsAllUserPermissionsSelected] =
    useState(false);

  // Just derive it directly with useMemo
  const categorizedPermissions = useMemo(() => {
    if (!permissions) return { T: [], U: [], W: [] };

    const categorized: CategorizedPermissions = {
      T: [],
      U: [],
      W: [],
    };

    permissions.forEach((permission) => {
      if (categorized[permission.permissionType]) {
        categorized[permission.permissionType].push(permission);
      }
    });

    return categorized;
  }, [permissions]);

  if (isLoading) {
    <div>
      <p>loading...</p>
    </div>;
  }

  // old logic when no selectAll option
  // const handlePermissionChange = (
  //   permission: Permission,
  //   isChecked: boolean
  // ) => {
  //   if (isChecked) {
  //     // Add to array
  //     setSelectedPermissions([
  //       ...selectedPermissions,
  //       permission.permissionCode,
  //     ]);
  //   } else {
  //     // Remove from array
  //     setSelectedPermissions(
  //       selectedPermissions.filter((id) => id !== permission.permissionCode)
  //     );
  //   }
  // };

  useEffect(() => {
    if (
      isAllTicketPermissionsSelected &&
      isAllWorkflowPermissionsSelected &&
      isAllUserPermissionsSelected
    ) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [
    isAllTicketPermissionsSelected,
    isAllWorkflowPermissionsSelected,
    isAllUserPermissionsSelected,
    permissions,
    selectedPermissions,
  ]);

  // send to backend with an array of permissionName
  const handlePermissionChange = (
    permission: Permission,
    isChecked: boolean
  ) => {
    if (isChecked) {
      // Add to array
      const newSelected = [...selectedPermissions, permission.permissionCode];
      setSelectedPermissions(newSelected);
    } else {
      // Remove from array
      const newSelected = selectedPermissions.filter(
        (id) => id !== permission.permissionCode
      );
      setSelectedPermissions(newSelected);

      // Uncheck "select all" since not all are selected anymore
      setIsAllSelected(false);
    }
  };

  // const onSubmit: SubmitHandler<CreateRole> = (data) => {
  //   // console.log("Form data:", data);
  //   // console.log("Errors:", errors);

  //   const newRole: CreateRole = {
  //     roleName: data.roleName,
  //     description: data.description,
  //     permissionCodes: selectedPermissions,
  //   };

  //   createRole(newRole);
  // };

  function handleTicketPermissionChange(isChecked: boolean) {
    console.log(`isCheck in handle ticket permission change: ${isChecked}`);

    setIsAllTicketPermissionsSelected(isChecked); // ✅ keep checkbox state in sync

    const ticketPermissionCodes = categorizedPermissions.T.map(
      (p) => p.permissionCode
    );

    if (isChecked) {
      setSelectedPermissions([
        ...selectedPermissions,
        ...ticketPermissionCodes,
      ]);

      // setSelectedPermissions(ticketPermissions);
    } else {
      const newSelected = selectedPermissions.filter(
        (code) => !ticketPermissionCodes.includes(code)
      );
      setSelectedPermissions(newSelected);
      // Deselect all permissions
      // setSelectedPermissions([]);
      setIsAllSelected(false);
    }
  }

  function handleWorkflowPermissionChange(isChecked: boolean) {
    setIsAllWorkflowPermissionsSelected(isChecked); // ✅ keep checkbox state in sync

    const workflowPermissionCodes = categorizedPermissions.W.map(
      (p) => p.permissionCode
    );

    if (isChecked) {
      // setSelectedPermissions(workflowPermissions);
      setSelectedPermissions([
        ...selectedPermissions,
        ...workflowPermissionCodes,
      ]);
    } else {
      // Remove only workflow permissions, keep ticket and user permissions
      const newSelected = selectedPermissions.filter(
        (code) => !workflowPermissionCodes.includes(code)
      );
      setSelectedPermissions(newSelected);
      // Deselect all permissions
      // setSelectedPermissions([]);
      setIsAllSelected(false);
    }
  }

  function handleUserPermissionChange(isChecked: boolean) {
    setIsAllUserPermissionsSelected(isChecked); // ✅ keep checkbox state in sync

    const userPermissionCodes = categorizedPermissions.U.map(
      (p) => p.permissionCode
    );

    if (isChecked) {
      // Select all permissions

      // setSelectedPermissions(userPermissions);
      setSelectedPermissions([...selectedPermissions, ...userPermissionCodes]);
    } else {
      // Remove only workflow permissions, keep ticket and user permissions
      const newSelected = selectedPermissions.filter(
        (code) => !userPermissionCodes.includes(code)
      );
      setSelectedPermissions(newSelected);
      // Deselect all permissions
      // setSelectedPermissions([]);
      setIsAllSelected(false);
    }
  }

  const onSubmit: SubmitHandler<CreateRole> = (data) => {
    const startTime = performance.now();

    const newRole: CreateRole = {
      roleName: data.roleName,
      description: data.description,
      permissionCodes: selectedPermissions,
    };

    // createRole(newRole, {
    //   onSuccess: () => {
    //     flushSync(() => {
    //       setSelectedPermissions([]);
    //       setIsAllSelected(false);
    //     });
    //     reset();
    //   },
    // });

    console.log("newRole", newRole);

    createRole(newRole, {
      onSuccess: () => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`✅ createRole completed in ${duration.toFixed(2)} ms`);

        flushSync(() => {
          setSelectedPermissions([]);
          setIsAllSelected(false);
        });
        reset();
      },
      onError: () => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`❌ createRole failed after ${duration.toFixed(2)} ms`);
      },
    });
  };

  // Handler for "Select All" checkbox
  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      // Select all permissions
      const allPermissionCodes = permissions.map((p) => p.permissionCode);
      setSelectedPermissions(allPermissionCodes);
      setIsAllSelected(true);

      setIsAllTicketPermissionsSelected(true);
      setIsAllWorkflowPermissionsSelected(true);
      setIsAllUserPermissionsSelected(true);
    } else {
      // Deselect all permissions
      setSelectedPermissions([]);
      setIsAllSelected(false);

      setIsAllTicketPermissionsSelected(false);
      setIsAllWorkflowPermissionsSelected(false);
      setIsAllUserPermissionsSelected(false);
    }
  };

  function handleResetCheckBoxes() {
    setSelectedPermissions([]);
    setIsAllSelected(false);
  }

  console.log("is creating", isCreating);

  return (
    <div>
      <PageMeta
        title="React.js E-commerce Single Transaction  | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js E-commerce Single Transaction  page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h1 className="text-2xl text-color font-bold">Create Role</h1>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
                to="/"
              >
                Home
              </Link>
            </li>
            <span className="text-gray-500">/</span>
            <li className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400">
              <Link to="/user-roles">User Roles</Link>
            </li>
            <li className="flex items-center gap-1.5 text-sm text-gray-800 dark:text-white/90">
              <span className="text-gray-500 dark:text-gray-400">/</span>

              <span className="page-title-text">Create Role</span>
            </li>
          </ol>
        </nav>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        // className="border-1 dark:bg-gray-900 dark:border-gray-800 p-6 rounded-md bg-white shadow-md"
      >
        <div className="border-1 dark:bg-gray-900 dark:border-gray-800 p-6 rounded-md bg-white shadow-md">
          <div className="max-w-[40rem] flex flex-col gap-4">
            <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
              <Label
                htmlFor="roleName"
                className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
              >
                Name <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-col">
                <CustomizedInput
                  type="text"
                  autoFocus={true}
                  error={!!errors.roleName}
                  placeholder="Enter Role Name"
                  id="roleName"
                  className={`px-3 py-2 border rounded-md focus:outline-none ${
                    errors.roleName
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                  {...register("roleName", {
                    required: "Role name is required",
                    maxLength: {
                      value: 50,
                      message: "Role name name must be less than 50 characters",
                    },
                    minLength: {
                      value: 2,
                      message: "Role name name must be at least 2 characters",
                    },
                  })}
                />
                {errors.roleName && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.roleName.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
              <Label
                htmlFor="description"
                className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
              >
                Description
              </Label>
              <div className="flex flex-col">
                <CustomizedInput
                  type="text"
                  autoFocus={true}
                  error={!!errors.description}
                  placeholder="Description"
                  id="description"
                  className={`px-3 py-2 border rounded-md focus:outline-none ${
                    errors.description
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                  {...register("description", { required: false })}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="border-b mt-10 mb-10" />
          <div className="flex items-center gap-3">
            <Checkbox
              className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
              checked={isAllSelected}
              onCheckedChange={(checked) => handleSelectAll(!!checked)}
              id="selectAll"
            />
            <Label htmlFor="selectAll" className="mb-0">
              Select All
            </Label>
          </div>
          <div className="mb-12">
            {/* <h3 className="text-red-400">Type: Ticket Permissions</h3> */}
            <div className="mb-4 flex justify-between">
              <div>
                <h3 className="text-[#000] font-semibold">
                  Ticket Permissions
                </h3>
                <p className="text-sm text-gray-500">
                  Select the items you want to display in the sidebar.
                </p>
              </div>

              <div className="flex items-center gap-3 mr-10">
                <Checkbox
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                  checked={isAllTicketPermissionsSelected}
                  onCheckedChange={(checked) =>
                    handleTicketPermissionChange(!!checked)
                  }
                  id="selectAllTicketPermissions"
                />
                <Label htmlFor="selectAllTicketPermissions" className="mb-0">
                  Select All Ticket Permissions
                </Label>
              </div>
            </div>

            {/* <div className="grid grid-cols-3 gap-y-2">
            {categorizedPermissions.T.map((p) => (
              <div className="flex items-center gap-3">
                <Checkbox
                  onChange={(checked) => handlePermissionChange(p, checked)}
                  id={p.id.toString()}
                />
                <Label htmlFor={p.id.toString()} className="mb-0">
                  {p.permissionName}
                </Label>
              </div>
            ))}
          </div> */}
            <div className="grid grid-cols-3 gap-y-2">
              {categorizedPermissions.T.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <Checkbox
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                    checked={selectedPermissions.includes(p.permissionCode)}
                    onCheckedChange={(checked) =>
                      handlePermissionChange(p, !!checked)
                    }
                    id={p.id.toString()}
                  />
                  <Label htmlFor={p.id.toString()} className="mb-0">
                    {p.permissionName}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-12">
            {/* <h3 className="text-red-400">Type: Workflow Permissions</h3> */}
            <div className="mb-4 flex justify-between">
              <div>
                <h3 className="text-[#000] font-semibold">
                  Workflow Permissions
                </h3>
                <p className="text-sm text-gray-500">
                  Select the items you want to display in the sidebar.
                </p>
              </div>

              <div className="flex items-center gap-3 mr-10">
                <Checkbox
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                  checked={isAllWorkflowPermissionsSelected}
                  onCheckedChange={(checked) =>
                    handleWorkflowPermissionChange(!!checked)
                  }
                  id="selectAllWorkflowPermissions"
                />
                <Label htmlFor="selectAllWorkflowPermissions" className="mb-0">
                  Select All Workflow Permissions
                </Label>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-y-2">
              {categorizedPermissions.W.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <Checkbox
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                    checked={selectedPermissions.includes(p.permissionCode)}
                    onCheckedChange={(checked) =>
                      handlePermissionChange(p, !!checked)
                    }
                    id={p.id.toString()}
                  />
                  <Label htmlFor={p.id.toString()} className="mb-0">
                    {p.permissionName}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-12">
            {/* <h3 className="text-red-400">Type: User Permissions</h3> */}
            <div className="mb-4 flex justify-between">
              <div>
                <h3 className="text-[#000] font-semibold">User Permissions</h3>
                <p className="text-sm text-gray-500">
                  Select the items you want to display in the sidebar.
                </p>
              </div>

              <div className="flex items-center gap-3 mr-10">
                <Checkbox
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                  checked={isAllUserPermissionsSelected}
                  onCheckedChange={(checked) =>
                    handleUserPermissionChange(!!checked)
                  }
                  id="selectAllUserPermissions"
                />
                <Label htmlFor="selectAllUserPermissions" className="mb-0">
                  Select All User Permissions
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-y-2">
              {categorizedPermissions.U.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <Checkbox
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                    checked={selectedPermissions.includes(p.permissionCode)}
                    onCheckedChange={(checked) =>
                      handlePermissionChange(p, !!checked)
                    }
                    id={p.id.toString()}
                  />
                  <Label htmlFor={p.id.toString()} className="mb-0">
                    {p.permissionName}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          {/* Display selected permissions */}
          <div className="mt-4">
            <strong>Selected:</strong>{" "}
            {selectedPermissions.join(", ") || "None"}
          </div>
          <strong>Selected count: {selectedPermissions.length}</strong>{" "}
          <div className="flex items-center justify-end w-full gap-3 mt-6">
            <Button size="sm" variant="outline" type="button">
              Close
            </Button>
            <Button
              disabled={isCreating}
              className={`${isCreating ? "cursor-not-allowed" : ""}`}
              size="sm"
              type="submit"
            >
              <span>Save</span>
              {isCreating && <Spinner />}
            </Button>
            <Button size="sm" type="button" onClick={handleResetCheckBoxes}>
              reset check boxes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

// First iteration

{
  /* <ul>
          {permissions.map((p) => (
            <li key={p.id}>{p.permissionName}</li>
          ))}
        </ul> */
}

{
  /* // Render Ticket permissions */
}
{
  /* <div>
        <h3 className="text-red-400">Type: Ticket Permissions</h3>
        {categorizedPermissions.T.map((permission) => (
          <div key={permission.id}>{permission.permissionName}</div>
        ))}
      </div> */
}

{
  /* // Render User permissions */
}
{
  /* <div>
        <h3 className="text-red-400">Type: User Permissions</h3>
        {categorizedPermissions.U.map((permission) => (
          <div key={permission.id}>{permission.permissionName}</div>
        ))}
      </div> */
}

{
  /* // Render Workflow permissions */
}
{
  /* <div>
        <h3 className="text-red-400">Type: Workflow Permissions</h3>
        {categorizedPermissions.W.map((permission) => (
          <div key={permission.id}>{permission.permissionName}</div>
        ))}
      </div> */
}

// // Second iteration
// <div className="mb-12 pt-4">
//   <div className="mb-4">
//     <h3 className="text-[#000] font-semibold">Ticket Permissions</h3>
//     <p className="text-sm text-gray-500">
//       Select the items you want to display in the sidebar.
//     </p>
//   </div>
//   <div className="grid grid-cols-3 gap-y-2">
//     {categorizedPermissions.T.map((p) => (
//       <label key={p.id} className="flex items-center gap-2 cursor-pointer">
//         <Checkbox
//           checked={selectedPermissions.includes(p.permissionCode)}
//           onChange={(checked) => handlePermissionChange(p, checked)}
//           className="group block size-4 rounded border bg-white data-checked:bg-blue-500"
//         >
//           <svg
//             className="stroke-white opacity-0 group-data-checked:opacity-100"
//             viewBox="0 0 14 14"
//             fill="none"
//           >
//             <path
//               d="M3 8L6 11L11 3.5"
//               strokeWidth={2}
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </Checkbox>
//         <span>{p.permissionName}</span>
//       </label>
//     ))}
//   </div>
// </div>;
{
  /* </div> */
}
