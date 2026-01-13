import { useEffect, useState } from "react";
import RequestTypeMenu from "./RequestTypeMenu";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
// import Input from "@/components/form/input/InputField";
import Select, { type Option } from "@/components/form/Select";

import { Link } from "react-router";
import { useCreateTicket } from "@/features/ticket/useCreateTicket";
import type { CreateTicket } from "@/types/ticket";
import Button from "@/components/ui/button/Button";

import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// @ts-ignore
import ImageResize from "quill-image-resize-module-react";
import "quill-better-table/dist/quill-better-table.css";
import {
  // Controller,
  useForm,
} from "react-hook-form";
import CustomizedInput from "@/components/form/input/CustomizedInput";
import toast from "react-hot-toast";

import FileUpload from "@/components/experimental/FileUpload";
import { api } from "@/services/axios";
import { API_URL } from "@/config";
import type { ApiResponse } from "@/types/api";
import type { CategoryType } from "@/types/category-type";
import type { AssetType } from "@/types/asset-type";

// Register table module
Quill.register("modules/imageResize", ImageResize);

export default function CreateTicketPage() {
  const [selectedMenu, setSeletedMenu] = useState("");

  //   return <div>ABC</div>;

  console.log("setSelectedMenu", selectedMenu);

  return (
    // <div className="p-4 rounde-md bg-gray-100">
    <>
      {selectedMenu ? (
        <CreateTicketForm requestTypeCode={selectedMenu} />
      ) : (
        <RequestTypeMenu
          selectedMenu={selectedMenu}
          setSelectedMenu={setSeletedMenu}
        />
      )}
    </>

    // </div>
  );
}

interface CreateTicketFormProps {
  requestTypeCode: string;
}

export function CreateTicketForm({ requestTypeCode }: CreateTicketFormProps) {
  // return (
  //   <div className="bg-white shadow-sm rounded-md">
  //     <div className="gap-4 p-4 pb-0 grid grid-cols-2">
  //       <CustomizedInput className="bg-white" />
  //       <CustomizedInput className="bg-white" />
  //     </div>

  //     <div className="gap-2 p-4 grid">
  //       <CustomizedInput className="bg-white" />
  //     </div>
  //   </div>
  // );

  console.log("requestTypeCode", requestTypeCode);

  // const [selectedOption, setSelectedOption] = useState<string>("Free");
  const { isCreating } = useCreateTicket();
  const { createTicket } = useCreateTicket();
  const [description, setDescription] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateTicket>({
    defaultValues: {
      title: "",
      description: "",
      requestTypeCode: "",
      categoryTypeCode: "",
      assetTypeCode: "",
      priority: "",
      attachments: [],
    },
  });

  const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]); // ✅ Add type and initial value
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);
  const [, setLoading] = useState({
    categories: false,
    assets: false,
  });
  const [selectedCateogoryType, setSelectedCategoryType] = useState("");
  const [selectedAssetType, setSelectedAssetType] = useState("");

  console.log("requestTypeCode in CreateTicketForm", requestTypeCode);

  // const { categoryTypes } = useCategoryByRequestTypeCode(
  //   "REQ_20251217_8dae4884"
  // );

  // const { assetTypes } = useAssetsByCategoryTypeCode("CAT_20251217_78bc431d");

  // console.log("categoryTypes", categoryTypes);
  console.log("assetTypes", assetTypes);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
    imageResize: {
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "color",
    "background",
    "link",
    "image",
  ];

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Form submitted:");
  // };

  // const optionsGender = [
  //   { value: "male", label: "Male" },
  //   { value: "female", label: "Female" },
  //   { value: "other", label: "Others" },
  // ];

  // const categoryOptions = [
  //   { value: "cate1", label: "Category 1" },
  //   { value: "cate2", label: "Category 2" },
  //   { value: "cate3", label: "Category 3" },
  // ];

  // const country = [
  //   { value: "bd", label: "Bangladesh" },
  //   { value: "usa", label: "United States" },
  //   { value: "canada", label: "Canada" },
  // ];

  const priority = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const handleSelectGender = (value: string) => {
    console.log("Selected value:", value);
  };

  const handleAssetChange = (value: string) => {
    console.log("Selected asset:", value);
    setSelectedAssetType(value);
  };

  // const handleRadioChange = (value: string) => {
  //   setSelectedOption(value);
  //   console.log("Selected:", value);
  // };

  // return (
  //   <div className="flex flex-col gap-4">
  //     <ComponentCard title="Example Form">
  //       <Form onSubmit={handleSubmit}>
  //         <div className="grid gap-6 sm:grid-cols-2">
  //           {/* <div className="col-span-full">
  //           <h4 className="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90">
  //             Personal Info
  //           </h4>
  //         </div>
  //         <div className="">
  //           <Label htmlFor="firstName">First Name</Label>
  //           <Input type="text" placeholder="Enter first name" id="firstName" />
  //         </div>
  //         <div className="">
  //           <Label htmlFor="lastName">Last Name</Label>
  //           <Input type="text" placeholder="Enter last name" id="firstName" />
  //         </div>
  //         <div className="col-span-2">
  //           <Label htmlFor="email">Gender</Label>
  //           <Select
  //             options={optionsGender}
  //             placeholder="Select an option"
  //             onChange={handleSelectGender}
  //             defaultValue=""
  //             className="bg-gray-50 dark:bg-gray-800"
  //           />
  //         </div>

  //         <div className="col-span-2">
  //           <DatePicker
  //             id="dob-picker"
  //             label="Date of Birth"
  //             placeholder="Select an option"
  //             onChange={(dates, currentDateString) => {
  //               // Handle your logic
  //               console.log({ dates, currentDateString });
  //             }}
  //           />
  //         </div>

  //         <div className="col-span-2">
  //           <Label htmlFor="email">Category</Label>
  //           <Select
  //             options={categoryOptions}
  //             placeholder="Select an option"
  //             onChange={handleSelectGender}
  //             defaultValue=""
  //             className="bg-gray-50 dark:bg-gray-800"
  //           />
  //         </div> */}
  //           {/* <div className="col-span-2">
  //           <h4 className="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90">
  //             Address
  //           </h4>
  //         </div> */}
  //           {/* <div className="col-span-2">
  //           <Label htmlFor="street">Street</Label>
  //           <Input type="text" id="street" />
  //         </div> */}
  //           <div>
  //             <Label htmlFor="street">Title</Label>
  //             <Input className="!h-10" type="text" id="city" />
  //           </div>
  //           {/* <div>
  //           <Label htmlFor="state">State</Label>
  //           <Input type="text" id="state" />
  //         </div> */}
  //           <div>
  //             <Label htmlFor="email">Asset Type</Label>
  //             <Select
  //               options={country}
  //               placeholder="--Select Country--"
  //               onChange={handleSelectGender}
  //               defaultValue=""
  //               className="!h-10 bg-gray-50 dark:bg-gray-800"
  //             />
  //           </div>
  //           {/* <div>
  //           <Label htmlFor="postCode">Post Code</Label>
  //           <Input type="text" id="postCode" />
  //         </div> */}
  //           <div>
  //             <Label htmlFor="email">Category Type</Label>
  //             <Select
  //               options={country}
  //               placeholder="--Select Country--"
  //               onChange={handleSelectGender}
  //               defaultValue=""
  //               className="!h-10 bg-gray-50 dark:bg-gray-800"
  //             />
  //           </div>
  //           <div>
  //             <Label htmlFor="email">Priority</Label>
  //             <Select
  //               options={country}
  //               placeholder="--Select Country--"
  //               onChange={handleSelectGender}
  //               defaultValue=""
  //               className="!h-10 bg-gray-50 dark:bg-gray-800"
  //             />
  //           </div>
  //           {/* <div className="flex items-center gap-3 col-span-full">
  //           <Label className="m-0">Membership:</Label>
  //           <div className="flex flex-wrap items-center gap-4">
  //             <Radio
  //               id="Free"
  //               name="roleSelect"
  //               value="Free"
  //               label="Free"
  //               checked={selectedOption === "Free"}
  //               onChange={handleRadioChange}
  //             />
  //             <Radio
  //               id="Premium"
  //               name="roleSelect"
  //               value="Premium"
  //               label="Premium"
  //               checked={selectedOption === "Premium"}
  //               onChange={handleRadioChange}
  //             />
  //           </div>
  //         </div> */}
  //           {/* <div className="flex gap-3">
  //           <Button size="sm">Save Changes</Button>
  //           <Button size="sm" variant="outline">
  //             Cancel
  //           </Button>
  //         </div> */}
  //         </div>
  //       </Form>
  //     </ComponentCard>

  //     <div
  //       className={`rounded-2xl border h-100 border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]`}
  //     >
  //       acb
  //     </div>
  //   </div>
  // );

  const onSubmit = (data: CreateTicket) => {
    try {
      const formData = new FormData();

      console.log("Form data received:", data); // Add this line

      formData.append("title", data.title);
      formData.append("description", description);
      formData.append("requestTypeCode", "REQ_20251217_8dae4884");
      formData.append("categoryTypeCode", "CAT_20251217_78bc431d");
      formData.append("assetTypeCode", "AST_20260109_c6c6568f");
      formData.append("priority", "HIGH");
      // Don't append attachments if there are none, or append individual files like:
      // formData.append("attachments", file);

      // ✅ Attach files
      if (data.attachments && data.attachments.length > 0) {
        for (let i = 0; i < data.attachments.length; i++) {
          formData.append("attachments", data.attachments[i]);
          // field name must match backend: "attachments"
        }
      }

      // // To see what's actually in the FormData:
      // for (const pair of formData.entries()) {
      //   console.log(pair[0] + ": " + pair[1]);
      // }

      // Call your useTicket hook mutation here
      createTicket(formData);
      // reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Fail to create ticket");
    }
  };

  // At the top of your component
  const categoryTypeOptions: Option[] = categoryTypes.map((category) => ({
    value: category.categoryTypeCode.toString(), // Convert to string if needed
    label: category.name,
  }));

  // At the top of your component
  const assetTypeOptions: Option[] = assetTypes.map((asset) => ({
    value: asset.id.toString(), // Convert to string if needed
    label: asset.name,
  }));

  // Fetch categories on mount using the requestTypeCode prop
  useEffect(() => {
    if (requestTypeCode) {
      fetchCategories(requestTypeCode);
    }
  }, [requestTypeCode]);

  useEffect(() => {
    if (selectedCateogoryType) {
      fetchAssets(selectedCateogoryType);
    }
  }, [selectedCateogoryType]);

  ///////////////////////////////////////////////////////////////////////////////

  const fetchCategories = async (requestTypeCode: string) => {
    setLoading((prev) => ({ ...prev, categories: true }));
    try {
      const response = await api.get<ApiResponse<CategoryType[]>>(
        `${API_URL}/category-types/active?requestTypeCode=${requestTypeCode}`
      );

      // console.log("fetched and got data...", response.data);
      console.log("fetched category", response.data.data);
      setCategoryTypes(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategoryTypes([]);
    } finally {
      setLoading((prev) => ({ ...prev, categories: false }));
    }
  };

  const fetchAssets = async (categoryTypeCode: string) => {
    setLoading((prev) => ({ ...prev, assets: true }));
    try {
      const response = await api.get<ApiResponse<AssetType[]>>(
        `${API_URL}/asset-types/active?categoryTypeCode=${categoryTypeCode}`
      );

      setAssetTypes(response.data.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
      setAssetTypes([]);
    } finally {
      setLoading((prev) => ({ ...prev, assets: false }));
    }
  };

  // Handlers
  const handleCategoryChange = (value: string) => {
    console.log("Selected category:", value);
    setSelectedCategoryType(value);
    setSelectedAssetType(""); // Reset asset dropdown
    setAssetTypes([]); // Clear asset options
  };

  console.log("Selected Category Type", selectedCateogoryType);

  /////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="flex flex-col gap-4">
      {/* Page header */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Ticket</h1>
        </div>

        {/* Navigation */}
        <nav className="self-start">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1.5 text-sm text-gray-800 dark:text-white/90">
              /<span className="page-title-text">Create Ticket</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Create ticket form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <ComponentCard title="Create Ticket Form">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="title">Title</Label>
                {/* <Input className="!h-10" type="text" id="city" /> */}
                {/* <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <Input className="!h-10" type="text" id="title" {...field} />
                )}
              /> */}

                <div className="flex flex-col">
                  <CustomizedInput
                    type="text"
                    error={!!errors.title}
                    placeholder="Enter ticket title"
                    id="title"
                    className={`px-3 py-2 border !h-10 rounded-md focus:outline-none ${
                      errors.title
                        ? "border-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                    {...register("title", {
                      required: "Ticket title is required",
                      maxLength: {
                        value: 50,
                        message:
                          "Category type name must be less than 50 characters",
                      },
                      minLength: {
                        value: 2,
                        message:
                          "Category type name must be at least 2 characters",
                      },
                    })}
                  />
                  {errors.title && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                {/* <Label htmlFor="assetTypeCode">Asset Type</Label>
                 <Select
                  options={assetTypeOptions}
                  placeholder="--Select Asset Type--"
                  onChange={() => {}}
                  defaultValue=""
                  className="!h-10 bg-gray-50 dark:bg-gray-800"
                /> */}

                {/* Asset Type */}
                <div>
                  <Label htmlFor="assetTypeCode">Asset Type</Label>
                  <Select
                    options={assetTypeOptions}
                    placeholder="--Select Asset Type--"
                    onChange={handleAssetChange}
                    defaultValue={selectedAssetType}
                    // disabled={!selectedCategoryType || loading.assets}
                    className="!h-10 bg-gray-50 dark:bg-gray-800"
                  />
                  {/* {loading.assets && (
                    <span className="text-sm text-gray-500">
                      Loading assets...
                    </span>
                  )} */}
                </div>

                {/* <Controller
                name="assetTypeCode"
                control={control}
                rules={{ required: "Asset type is required" }}
                render={({ field }) => (
                  <Select
                    options={country}
                    placeholder="--Select Asset Type--"
                    onChange={(value) => field.onChange(value)}
                    value={field.value}
                    className="!h-10 bg-gray-50 dark:bg-gray-800"
                  />
                )}
              /> */}
              </div>
              <div>
                {/*
                 <Label htmlFor="categoryTypeCode">Category Type</Label>
                 <Select
                  options={categoryTypeOptions}
                  placeholder="--Select Category Type--"
                  onChange={handleSelectGender}
                  defaultValue=""
                  className="!h-10 bg-gray-50 dark:bg-gray-800"
                /> */}

                {/* Category Type */}
                <div>
                  <Label htmlFor="categoryTypeCode">Category Type</Label>
                  <Select
                    options={categoryTypeOptions}
                    placeholder="--Select Category Type--"
                    onChange={handleCategoryChange}
                    defaultValue={selectedCateogoryType}
                    className="!h-10 bg-gray-50 dark:bg-gray-800"
                  />
                  {/* {loading.categories && (
                    <span className="text-sm text-gray-500">
                      Loading categories...
                    </span>
                  )} */}
                </div>

                {/* <Controller
                name="categoryTypeCode"
                control={control}
                rules={{ required: "Category type is required" }}
                render={({ field }) => (
                  <Select
                    options={country}
                    placeholder="--Select Category Type--"
                    onChange={(value) => field.onChange(value)}
                    value={field.value}
                    className="!h-10 bg-gray-50 dark:bg-gray-800"
                  />
                )}
              /> */}
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  options={priority}
                  placeholder="--Select Priority--"
                  onChange={handleSelectGender}
                  defaultValue=""
                  className="!h-10 bg-gray-50 dark:bg-gray-800"
                />

                {/* <Controller
                name="priority"
                control={control}
                rules={{ required: "Priority is required" }}
                render={({ field }) => (
                  <Select
                    options={priority}
                    placeholder="--Select Priority--"
                    onChange={(value) => field.onChange(value)}
                    value={field.value}
                    className="!h-10 bg-gray-50 dark:bg-gray-800"
                  />
                )}
              /> */}
              </div>
            </div>
          </ComponentCard>

          {/* <div
        className={`rounded-2xl p-4 sm:p-6 border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]`}
      >
   
        <div className="grid grid-cols-3 h-40 gap-6">
          <div className="col-span-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="w-full h-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 resize-none"
              placeholder="Enter description..."
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="attachment">Attachment</Label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-4 h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800">
              <input
                type="file"
                id="attachment"
                className="hidden"
                onChange={(e) => console.log(e.target.files)}
              />
              <label
                htmlFor="attachment"
                className="cursor-pointer text-center"
              >
                <div className="text-gray-400 mb-2">
                  <svg
                    className="w-12 h-12 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click to upload
                </p>
              </label>
            </div>
          </div>
        </div>
      </div> */}

          <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            {/* Description + Attachment */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {/* Description */}
              <div className="sm:col-span-2 flex flex-col">
                {/* <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="mt-1 w-full flex-1 resize-none rounded-md border border-gray-300 bg-gray-50 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   dark:border-gray-700 dark:bg-gray-800"
              placeholder="Enter description..."
            /> */}
                <Label htmlFor="description">Description</Label>
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  modules={modules}
                  formats={formats}
                  // className="mt-1 bg-white dark:bg-gray-800 rounded-md [&_.ql-editor]:p-4 [&_.ql-editor]:min-h-0"
                  className="mt-1 bg-white dark:bg-gray-800 rounded-md [&_.ql-editor]:!p-4 [&_.ql-editor]:!min-h-[100px] [&_.ql-container]:!h-auto"
                  placeholder="Enter description..."
                />
              </div>

              {/* Attachment */}
              {/* <div className="flex flex-col"> */}
              <div>
                <Label htmlFor="attachment">Attachment</Label>

                <FileUpload />
                {/* <div
                  className="mt-1 flex flex-1 flex-col items-center justify-center rounded-md
                   border-2 border-dashed border-gray-300 bg-gray-50 p-4
                   dark:border-gray-700 dark:bg-gray-800 h-40"
                >
                  <input
                    type="file"
                    id="attachment"
                    className="hidden"
                    onChange={(e) => console.log(e.target.files)}
                  />

                  <label
                    htmlFor="attachment"
                    className="cursor-pointer text-center"
                  >
                    <svg
                      className="mx-auto mb-2 h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Click to upload
                    </p>
                  </label>
                </div> */}
              </div>

              {/* </div> */}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            {/* <div
          dangerouslySetInnerHTML={{ __html: description }}
          className="prose prose-sm max-w-none prose-headings:font-bold prose-a:text-blue-600"
        /> */}

            <div className="flex justify-end gap-2">
              {/* <Button size="sm">Save Changes</Button> */}
              <Button
                onClick={() => {
                  console.log("clicked...");
                }}
                type="submit"
                size="sm"
                disabled={isCreating}
              >
                {isCreating ? "Saving..." : "Save Changes"}
              </Button>
              <Button size="sm" variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
