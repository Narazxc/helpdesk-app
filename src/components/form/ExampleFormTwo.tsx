import { useState } from "react";
import Label from "./Label";
import CustomizedInput from "./input/CustomizedInput";
import Radio from "./input/Radio";
import Form from "./Form";
import Button from "./../ui/button/Button";
import DatePicker from "./DatePicker";
import Select from "./Select";
import ComponentCard from "../common/ComponentCard";

export default function ExampleFormTwo() {
  const [selectedOption, setSelectedOption] = useState<string>("Free");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:");
  };

  const optionsGender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Others" },
  ];

  const categoryOptions = [
    { value: "cate1", label: "Category 1" },
    { value: "cate2", label: "Category 2" },
    { value: "cate3", label: "Category 3" },
  ];

  const country = [
    { value: "bd", label: "Bangladesh" },
    { value: "usa", label: "United States" },
    { value: "canada", label: "Canada" },
  ];

  const handleSelectGender = (value: string) => {
    console.log("Selected value:", value);
  };

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
    console.log("Selected:", value);
  };

  return (
    // <ComponentCard title="Example Form">
    <Form onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2"></div>

      <div>
        <div className="border-b border-gray-200 mb-8">
          {/* <h4 className="pb-4 text-base font-medium text-gray-800  dark:border-gray-800 dark:text-white/90">
            Personal Info
          </h4> */}
        </div>

        <div className="flex flex-col gap-7 lg:gap-3.5 max-w-[40rem]">
          <div className="grid  lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
            <Label htmlFor="firstName" className="mb-0.5">
              Username
            </Label>
            <CustomizedInput
              type="text"
              placeholder="Enter first name"
              id="firstName"
            />
          </div>

          {/* Row 1 */}
          <div className="grid lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
            <Label htmlFor="userId" className="text-sm font-medium mb-0.5">
              User ID
            </Label>
            <CustomizedInput
              id="userId"
              type="text"
              placeholder="Enter user ID"
            />
          </div>

          {/* Row 2 */}
          <div className="grid  lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
            <Label htmlFor="password" className="text-sm font-medium mb-0.5">
              Password
            </Label>
            <CustomizedInput
              id="password"
              type="text"
              placeholder="Enter password"
            />
          </div>

          {/* Row 3 */}
          <div className="grid  lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
            <Label htmlFor="phone" className="text-sm font-medium mb-0.5">
              Phone Number
            </Label>
            <CustomizedInput
              id="phone"
              type="text"
              placeholder="Enter phone number"
            />
          </div>

          {/* Row 4 */}
          <div className="grid  lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
            <Label htmlFor="email" className="text-sm font-medium mb-0.5">
              Email
            </Label>
            <CustomizedInput
              id="email"
              type="text"
              placeholder="example@gmail.com"
            />
          </div>

          {/* Row 5 */}
          <div className="grid  lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
            <Label htmlFor="entity" className="text-sm font-medium mb-0.5">
              Entity
            </Label>
            <Select
              id="entity"
              options={optionsGender}
              placeholder="Select an option"
              onChange={handleSelectGender}
              defaultValue=""
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>

          {/* Row 6 */}
          <div className="grid  lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
            <Label htmlFor="status" className="text-sm font-medium mb-0.5">
              Status
            </Label>
            <Select
              id="status"
              options={optionsGender}
              placeholder="Select an option"
              onChange={handleSelectGender}
              defaultValue=""
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>
        </div>

        <div className="mt-10">
          <Button size="sm" className="w-20 bg-green-600">
            Save
          </Button>
        </div>
      </div>
    </Form>

    // </ComponentCard>
  );
}

// grid-cols-[7rem_1fr]
// grid-cols-[7rem_1fr]
// grid-cols-[7rem_1fr]
// grid-cols-[7rem_1fr]
// grid-cols-[7rem_1fr]
// grid-cols-[7rem_1fr]
// grid-cols-[7rem_1fr]
