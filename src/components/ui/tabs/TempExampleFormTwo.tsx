// export default function TempExampleFormTwo() {
//   const [selectedOption, setSelectedOption] = useState<string>("Free");
//   const optionsGender = [
//     { value: "male", label: "Male" },
//     { value: "female", label: "Female" },
//     { value: "other", label: "Others" },
//   ];

//   const categoryOptions = [
//     { value: "cate1", label: "Category 1" },
//     { value: "cate2", label: "Category 2" },
//     { value: "cate3", label: "Category 3" },
//   ];

//   const country = [
//     { value: "bd", label: "Bangladesh" },
//     { value: "usa", label: "United States" },
//     { value: "canada", label: "Canada" },
//   ];

//   const handleSelectGender = (value: string) => {
//     console.log("Selected value:", value);
//   };

//   const handleRadioChange = (value: string) => {
//     setSelectedOption(value);
//     console.log("Selected:", value);
//   };
//   return <div>TempExampleFormTwo</div>;
// }

//  <div className="">
//       <Label htmlFor="firstName">First Name</Label>
//       <Input type="text" placeholder="Enter first name" id="firstName" />
//     </div>
//     <div className="">
//       <Label htmlFor="lastName">Last Name</Label>
//       <Input type="text" placeholder="Enter last name" id="firstName" />
//     </div>
//     <div className="col-span-2">
//       <Label htmlFor="email">Gender</Label>
//       <Select
//         options={optionsGender}
//         placeholder="Select an option"
//         onChange={handleSelectGender}
//         defaultValue=""
//         className="bg-gray-50 dark:bg-gray-800"
//       />
//     </div>

//     <div className="col-span-2">
//       <DatePicker
//         id="dob-picker"
//         label="Date of Birth"
//         placeholder="Select an option"
//         onChange={(dates, currentDateString) => {
//           // Handle your logic
//           console.log({ dates, currentDateString });
//         }}
//       />
//     </div>

//     <div className="col-span-2">
//       <Label htmlFor="email">Category</Label>
//       <Select
//         options={categoryOptions}
//         placeholder="Select an option"
//         onChange={handleSelectGender}
//         defaultValue=""
//         className="bg-gray-50 dark:bg-gray-800"
//       />
//     </div>

//==========================================================
//    <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
//   <Label
//     htmlFor="categoryName"
//     className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
//   >
//     Category Type Name<span className="text-red-500">*</span>
//   </Label>
//   <div className="flex flex-col">
//     <CustomizedInput
//       type="text"
//       error={!!errors.categoryName}
//       placeholder="Enter category type name"
//       id="categoryName"
//       className={`px-3 py-2 border rounded-md focus:outline-none ${
//         errors.categoryName
//           ? "border-red-500"
//           : "border-gray-300 focus:ring-blue-500"
//       } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
//       {...register("categoryName", {
//         required: "Category type name is required",
//         maxLength: {
//           value: 50,
//           message: "Category type name must be less than 50 characters",
//         },
//         minLength: {
//           value: 2,
//           message: "Category type name must be at least 2 characters",
//         },
//       })}
//     />
//     {errors.categoryName && (
//       <span className="text-red-500 text-sm mt-1">
//         {errors.categoryName.message}
//       </span>
//     )}
//   </div>
// </div>

//======================================================

{
  /* {!isLoading && roles.map((role) => <div>{role.roleName}</div>)} */
}

{
  /*
        <div className="col-span-2">
          <Label htmlFor="street">Street</Label>
          <Input type="text" id="street" />
        </div>
        <div>
          <Label htmlFor="street">City</Label>
          <Input type="text" id="city" />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input type="text" id="state" />
        </div>
        <div>
          <Label htmlFor="postCode">Post Code</Label>
          <Input type="text" id="postCode" />
        </div>
        <div>
          <Label htmlFor="email">Category</Label>
          <Select
            options={country}
            placeholder="--Select Country--"
            onChange={handleSelectGender}
            defaultValue=""
            className="bg-gray-50 dark:bg-gray-800"
          />
        </div>
        <div className="flex items-center gap-3 col-span-full">
          <Label className="m-0">Membership:</Label>
          <div className="flex flex-wrap items-center gap-4">
            <Radio
              id="Free"
              name="roleSelect"
              value="Free"
              label="Free"
              checked={selectedOption === "Free"}
              onChange={handleRadioChange}
            />
            <Radio
              id="Premium"
              name="roleSelect"
              value="Premium"
              label="Premium"
              checked={selectedOption === "Premium"}
              onChange={handleRadioChange}
            />
          </div>
        </div> */
}

//=======================================================================
{
  /* <div className="flex flex-col col-span-2">
          <div className="bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {!isLoadingRole &&
                roles.map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <Checkbox
                      className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                      checked={checkedRoles.includes(p.id.toString())}
                      onCheckedChange={(isChecked) =>
                        handleCheckChange(p.id.toString(), isChecked as boolean)
                      }
                      id={p.id.toString()}
                    />
                    <Label htmlFor={p.id.toString()} className="mb-0">
                      {p.roleName}
                    </Label>
                  </div>
                ))}
            </div>
          </div>
        </div> */
}

{
  /* <div className="flex flex-col col-span-2">
          <div className="bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {!isLoadingRequestTypes &&
                requestTypes.map((requestType) => (
                  <div key={requestType.id} className="flex items-center gap-3">
                    <Checkbox
                      className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                      checked={checkedRequestTypes.includes(
                        requestType.id.toString()
                      )}
                      onCheckedChange={(isChecked) =>
                        handleRequestTypeCheckChange(
                          requestType.id.toString(),
                          isChecked as boolean
                        )
                      }
                      id={requestType.id.toString()}
                    />
                    <Label htmlFor={requestType.id.toString()} className="mb-0">
                      {requestType.name}
                    </Label>
                  </div>
                ))}
            </div>
          </div>
        </div> */
}
