import { useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";

// react router
import { Link, useNavigate, useParams } from "react-router";

// type
import type { CreateRole, UpdateRole } from "@/types/role";
import type { Permission } from "@/types/permission";
import type { SubmitHandler } from "react-hook-form";

// hook
import { usePermissions } from "./usePermissions";
import { Controller, useForm } from "react-hook-form";

// component
import CustomizedInput from "@/components/form/input/CustomizedInput";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Checkbox } from "@/components/ui/checkbox";
import PageMeta from "@/components/common/PageMeta";
import { Spinner } from "@/components/ui/spinner";
import { useRoleById } from "./useRole";
import { useUpdateRole } from "./useUpdateRole";
import TextArea from "@/components/form/input/TextArea";
import { CircleAlert } from "lucide-react";

type CategorizedPermissions = {
  T: Permission[];
  U: Permission[];
  W: Permission[];
};

export default function UpdateRoleForm() {
  const { id } = useParams();
  const { role } = useRoleById(id?.toString() || "");
  const { isLoading, permissions } = usePermissions();
  const navigate = useNavigate();
  const { updateRole, isUpdating } = useUpdateRole();

  console.log("role", role);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateRole>();

  // Only two main states needed
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  //     {
  //     defaultValues: {
  //       roleName: role?.roleName || "",
  //       description: role?.description || "",
  //       //   requestTypeCode: categoryType?.requestTypeCode || "",
  //       //   categoryName: categoryType?.name || "",
  //       //   categoryDescription: categoryType?.description || "",
  //     },
  //   }

  // Reset form when role data is loaded
  //   useEffect(() => {
  //     if (role) {
  //       reset({
  //         roleName: role.roleName,
  //         description: role.description,
  //       });

  //       // Also set the selected permissions if they exist
  //       if (role.permissionNames) {
  //         setSelectedPermissions(role.permissionNames);
  //       }
  //     }
  //   }, [role, reset]);

  useEffect(() => {
    if (role && permissions) {
      reset({
        roleName: role.roleName,
        description: role.description,
      });

      // Compare role.permissionNames with permissions.permissionCode
      // Find matching permissions and extract their codes
      const matchingPermissionCodes = permissions
        .filter((permission) =>
          role.permissionNames?.includes(permission.permissionName)
        )
        .map((permission) => permission.permissionCode);

      setSelectedPermissions(matchingPermissionCodes);
    }
  }, [role, permissions, reset]);

  console.log("selectedPermissions", selectedPermissions);

  // Categorize permissions
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

  // Derive category "select all" states automatically
  const isAllTicketPermissionsSelected = useMemo(() => {
    const ticketCodes = categorizedPermissions.T.map((p) => p.permissionCode);
    return (
      ticketCodes.length > 0 &&
      ticketCodes.every((code) => selectedPermissions.includes(code))
    );
  }, [categorizedPermissions.T, selectedPermissions]);

  const isAllWorkflowPermissionsSelected = useMemo(() => {
    const workflowCodes = categorizedPermissions.W.map((p) => p.permissionCode);
    return (
      workflowCodes.length > 0 &&
      workflowCodes.every((code) => selectedPermissions.includes(code))
    );
  }, [categorizedPermissions.W, selectedPermissions]);

  const isAllUserPermissionsSelected = useMemo(() => {
    const userCodes = categorizedPermissions.U.map((p) => p.permissionCode);
    return (
      userCodes.length > 0 &&
      userCodes.every((code) => selectedPermissions.includes(code))
    );
  }, [categorizedPermissions.U, selectedPermissions]);

  // Display loading indicator
  if (isLoading) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  // Individual permission change handler
  const handlePermissionChange = (
    permission: Permission,
    isChecked: boolean
  ) => {
    if (isChecked) {
      const newSelected = [...selectedPermissions, permission.permissionCode];
      setSelectedPermissions(newSelected);

      // Check if ALL permissions are now selected
      if (permissions && newSelected.length === permissions.length) {
        setIsAllSelected(true);
      }
    } else {
      const newSelected = selectedPermissions.filter(
        (id) => id !== permission.permissionCode
      );
      setSelectedPermissions(newSelected);
      setIsAllSelected(false);
    }
  };

  // Category handlers
  function handleTicketPermissionChange(isChecked: boolean) {
    const ticketPermissionCodes = categorizedPermissions.T.map(
      (p) => p.permissionCode
    );

    if (isChecked) {
      // Add all ticket permissions (avoid duplicates)
      const newSelected = [
        ...selectedPermissions.filter(
          (code) => !ticketPermissionCodes.includes(code)
        ),
        ...ticketPermissionCodes,
      ];
      setSelectedPermissions(newSelected);

      // Check if ALL permissions are now selected
      if (permissions && newSelected.length === permissions.length) {
        setIsAllSelected(true);
      }
    } else {
      const newSelected = selectedPermissions.filter(
        (code) => !ticketPermissionCodes.includes(code)
      );
      setSelectedPermissions(newSelected);
      setIsAllSelected(false);
    }
  }

  function handleWorkflowPermissionChange(isChecked: boolean) {
    const workflowPermissionCodes = categorizedPermissions.W.map(
      (p) => p.permissionCode
    );

    if (isChecked) {
      const newSelected = [
        ...selectedPermissions.filter(
          (code) => !workflowPermissionCodes.includes(code)
        ),
        ...workflowPermissionCodes,
      ];
      setSelectedPermissions(newSelected);

      if (permissions && newSelected.length === permissions.length) {
        setIsAllSelected(true);
      }
    } else {
      const newSelected = selectedPermissions.filter(
        (code) => !workflowPermissionCodes.includes(code)
      );
      setSelectedPermissions(newSelected);
      setIsAllSelected(false);
    }
  }

  function handleUserPermissionChange(isChecked: boolean) {
    const userPermissionCodes = categorizedPermissions.U.map(
      (p) => p.permissionCode
    );

    if (isChecked) {
      const newSelected = [
        ...selectedPermissions.filter(
          (code) => !userPermissionCodes.includes(code)
        ),
        ...userPermissionCodes,
      ];
      setSelectedPermissions(newSelected);

      if (permissions && newSelected.length === permissions.length) {
        setIsAllSelected(true);
      }
    } else {
      const newSelected = selectedPermissions.filter(
        (code) => !userPermissionCodes.includes(code)
      );
      setSelectedPermissions(newSelected);
      setIsAllSelected(false);
    }
  }

  // Main "Select All" handler
  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      const allPermissionCodes = permissions.map((p) => p.permissionCode);
      setSelectedPermissions(allPermissionCodes);
      setIsAllSelected(true);
    } else {
      setSelectedPermissions([]);
      setIsAllSelected(false);
    }
  };

  // Form submission
  const onSubmit: SubmitHandler<CreateRole> = (data) => {
    const startTime = performance.now();

    if (!id) return;

    const createRole: CreateRole = {
      roleName: data.roleName,
      description: data.description,
      permissionCodes: selectedPermissions,
    };

    const newRoleData: UpdateRole = {
      id: id?.toString(),
      newRoleData: createRole,
    };

    updateRole(newRoleData, {
      onSuccess: () => {
        // Measure performance / request time
        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`✅ createRole completed in ${duration.toFixed(2)} ms`);

        // reset form
        flushSync(() => {
          setSelectedPermissions([]);
          setIsAllSelected(false);
        });
        reset();

        // redirect after succesful creation
        navigate("/user-roles");
      },

      onError: () => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`❌ createRole failed after ${duration.toFixed(2)} ms`);

        // reset form
        flushSync(() => {
          setSelectedPermissions([]);
          setIsAllSelected(false);
        });
        reset();
      },
    });

    // createRole(newRole, {
    //   onSuccess: () => {
    //     // Measure performance / request time
    //     const endTime = performance.now();
    //     const duration = endTime - startTime;
    //     console.log(`✅ createRole completed in ${duration.toFixed(2)} ms`);

    //     // reset form
    //     flushSync(() => {
    //       setSelectedPermissions([]);
    //       setIsAllSelected(false);
    //     });
    //     reset();

    //     // redirect after succesful creation
    //     navigate("/user-roles");
    //   },

    //   onError: () => {
    //     const endTime = performance.now();
    //     const duration = endTime - startTime;
    //     console.log(`❌ createRole failed after ${duration.toFixed(2)} ms`);

    //     // reset form
    //     flushSync(() => {
    //       setSelectedPermissions([]);
    //       setIsAllSelected(false);
    //     });
    //     reset();
    //   },
    // });
  };

  function handleResetCheckBoxes() {
    setSelectedPermissions([]);
    setIsAllSelected(false);
  }

  return (
    <div>
      <PageMeta
        title="Update Role"
        description="This is React.js E-commerce Single Transaction  page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h1 className="text-2xl text-color font-bold">Update Role</h1>
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

      <form onSubmit={handleSubmit(onSubmit)}>
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
              {/* <div className="flex flex-col">
                <CustomizedInput
                  type="text"
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
              </div> */}
              <div className="flex flex-col">
                <Controller
                  name="description"
                  rules={{
                    maxLength: {
                      value: 250,
                      message: "Description must be 250 characters or less",
                    },
                  }}
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      id="description"
                      placeholder="Enter Role Description... (max 250)"
                      rows={6}
                      value={field.value || ""}
                      onChange={field.onChange}
                      error={!!errors.description}
                      className={`bg-gray-50 dark:bg-gray-800 h-30 ${
                        errors.description
                          ? "border-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                  )}
                />

                {errors.description && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-b mt-10 mb-10" />

          {/* Select all permission checkbox */}
          {/* <div className="flex items-center gap-3 mb-4">
            <Checkbox
              className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
              checked={isAllSelected}
              onCheckedChange={(checked) => handleSelectAll(!!checked)}
              id="selectAll"
            />
            <Label htmlFor="selectAll" className="mb-0">
              Select All
            </Label>
          </div> */}

          <div className="flex justify-between items-center mr-10 mb-10">
            <div>
              <div>
                <h3 className="text-color text-xl font-bold">Permissions</h3>
                <p className="text-sm text-gray-500">
                  Select the items you want to display in the sidebar.
                </p>
              </div>
            </div>

            {/* Select all permission checkbox */}
            <div className="flex items-center gap-3 mb-4">
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
          </div>

          {/* Ticket Permissions */}
          <div className="mb-12">
            <div className="mb-4 flex justify-between">
              {/* <div>
                <h3 className="text-color font-semibold">Ticket Permissions</h3>
                <p className="text-sm text-gray-500">
                  Select the items you want to display in the sidebar.
                </p>
              </div> */}
              <div>
                <div className="flex gap-3">
                  <h3 className="text-color font-semibold">
                    Ticket Permissions
                  </h3>
                  <span>
                    <CircleAlert className="w-4 text-gray-500" />
                  </span>
                </div>
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

          {/* Workflow Permissions */}
          <div className="mb-12">
            <div className="mb-4 flex justify-between">
              {/* <div>
                <h3 className="text-color font-semibold">
                  Workflow Permissions
                </h3>
                <p className="text-sm text-gray-500">
                  Select the items you want to display in the sidebar.
                </p>
              </div> */}
              <div>
                <div className="flex gap-3">
                  <h3 className="text-color font-semibold">
                    Workflow Permissions
                  </h3>
                  <span>
                    <CircleAlert className="w-4 text-gray-500" />
                  </span>
                </div>
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

          {/* User Permissions */}
          <div className="mb-12">
            <div className="mb-4 flex justify-between">
              {/* <div>
                <h3 className="text-color font-semibold">User Permissions</h3>
                <p className="text-sm text-gray-500">
                  Select the items you want to display in the sidebar.
                </p>
              </div> */}
              <div>
                <div className="flex gap-3">
                  <h3 className="text-color font-semibold">User Permissions</h3>
                  <span>
                    <CircleAlert className="w-4 text-gray-500" />
                  </span>
                </div>
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

          <div className="flex items-center justify-end w-full gap-3 mt-6">
            <Button
              onClick={() => navigate(-1)}
              size="sm"
              variant="outline"
              type="button"
            >
              Close
            </Button>
            <Button
              disabled={isUpdating}
              className={`${isUpdating ? "cursor-not-allowed" : ""}`}
              size="sm"
              type="submit"
            >
              <span>Save</span>
              {isUpdating && <Spinner />}
            </Button>
            <Button size="sm" type="button" onClick={handleResetCheckBoxes}>
              Reset
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
