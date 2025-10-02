// // import RecentOrderAnalytics from "../../components/analytics/RecentOrderAnalytics";
// // import DemographicCard from "../../components/ecommerce/DemographicCard";
// // import TopPages from "../../components/analytics/TopPages";
// // import TopChannel from "../../components/analytics/TopChannel";
// // import AnalyticsMetrics from "../../components/analytics/AnalyticsMetrics";
// // import ActiveUsersChart from "../../components/analytics/ActiveUsersChart";
// // import AnalyticsBarChart from "../../components/analytics/AnalyticsBarChart";
// // import AcquisitionChannelChart from "../../components/analytics/AcquisitionChannelChart";
// import SessionChart from "../../components/analytics/SessionChart";
// import PageMeta from "../../components/common/PageMeta";
// import ReactApexChart from "react-apexcharts";
// import { useState } from "react";
// import LineChartOne from "../../components/charts/line/LineChartOne";
// import DatePicker from "../../components/form/DatePicker";
// // import MonthYearPickerDropdown from "../../components/MonthYearPickerDropdown";

// export default function MyDashboard() {
//   const [state] = useState({
//     series: [
//       {
//         // name: "Servings",
//         data: [44, 55, 41, 67, 22, 43, 21],
//         // 33, 45, 31, 87, 65, 35
//       },
//     ],
//     options: {
//       // annotations: {
//       //   points: [
//       //     {
//       //       x: "Bananas",
//       //       seriesIndex: 0,
//       //       label: {
//       //         borderColor: "#775DD0",
//       //         offsetY: 0,
//       //         style: {
//       //           color: "#fff",
//       //           background: "#775DD0",
//       //         },
//       //         text: "Bananas are good",
//       //       },
//       //     },
//       //   ],
//       // },
//       chart: {
//         toolbar: {
//           show: false,
//         },
//         height: 350,
//         type: "bar",
//       },
//       plotOptions: {
//         bar: {
//           horizontal: true,
//           columnWidth: "35%", // width of each bar
//           endingShape: "flat", // <-- this makes the bar edges square
//           borderRadius: 8,
//         },
//       },
//       dataLabels: {
//         enabled: true,
//       },
//       stroke: {
//         width: 0,
//       },
//       grid: {
//         // show: false, // or false if you want to hide the grid entirely
//         row: {
//           // colors: ["#fff", "#f2f2f2"],
//         },
//       },
//       xaxis: {
//         labels: {
//           rotate: -45,
//         },
//         categories: [
//           "PO",
//           "PR",
//           "AP",
//           "AR",
//           "BA",
//           "CM",
//           "GL",
//           // "Pears",
//           // "Watermelons",
//           // "Cherries",
//           // "Pomegranates",
//           // "Tangerines",
//           // "Papayas",
//         ],
//         tickPlacement: "on",
//       },
//       yaxis: {
//         title: {
//           text: undefined,
//         },
//       },
//       //   fill: {
//       //     type: "gradient",
//       //     gradient: {
//       //       shade: "light",
//       //       type: "horizontal",
//       //       shadeIntensity: 0.25,
//       //       gradientToColors: undefined,
//       //       inverseColors: true,
//       //       opacityFrom: 0.85,
//       //       opacityTo: 0.85,
//       //       stops: [50, 0, 100],
//       //     },
//       //   },
//       fill: {
//         type: "solid", // ensures solid fill
//         colors: ["#007bff"], // any color you want
//       },
//     },
//   });

//   const [state3] = useState({
//     series: [
//       {
//         data: [44, 55, 41, 67, 22],
//       },
//     ],
//     options: {
//       chart: {
//         toolbar: {
//           show: false,
//         },
//         height: 350,
//         type: "bar",
//       },
//       plotOptions: {
//         bar: {
//           horizontal: false,
//           columnWidth: "50%", // width of each bar
//           endingShape: "flat", // <-- this makes the bar edges square
//           borderRadius: 8,
//         },
//       },
//       dataLabels: {
//         enabled: true,
//       },
//       stroke: {
//         width: 0,
//       },
//       grid: {
//         borderColor: "#ff0000",
//         strokeDashArray: 5, // ← makes the grid dashed
//         // show: false, // or false if you want to hide the grid entirely
//         row: {
//           //   colors: ["#fff", "#f2f2f2"],
//         },
//       },
//       xaxis: {
//         labels: {
//           rotate: -45,
//         },
//         categories: [
//           "New Ticket",
//           "Assign Ticket",
//           "Processing",
//           "Complete",
//           "Closed",
//         ],
//         tickPlacement: "on",
//       },
//       yaxis: {
//         title: {
//           text: undefined,
//         },
//       },

//       fill: {
//         type: "solid", // ensures solid fill
//         colors: ["#007bff"], // any color you want
//       },
//     },
//   });

//   const [state2] = useState({
//     series: [44, 55, 67, 83],
//     options: {
//       chart: {
//         height: 350,
//         type: "radialBar",
//       },
//       plotOptions: {
//         radialBar: {
//           dataLabels: {
//             name: {
//               fontSize: "22px",
//             },
//             value: {
//               fontSize: "16px",
//             },
//             total: {
//               show: true,
//               label: "Total",
//               formatter: function () {
//                 // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
//                 return 249;
//               },
//             },
//           },
//         },
//       },
//       labels: ["Apples", "Oranges", "Bananas", "Berries"],
//     },
//     responsive: [
//       {
//         breakpoint: 640,
//         options: {
//           chart: {
//             width: 370,
//             height: 290,
//           },
//         },
//       },
//     ],
//   });

//   return (
//     <>
//       <PageMeta
//         title="React.js Analytics Dashboard | TailAdmin - React.js Admin Dashboard Template"
//         description="This is React.js Analytics Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
//       />
//       <div className="grid grid-cols-12 gap-4 md:gap-6">
//         <div className="col-span-12">
//           {/* p-4 border border-gray-200 bg-white */}
//           <div className="rounded-2xl">
//             <div className="w-full flex items-center justify-between">
//               <h1 className="text-2xl font-bold page-title-text">Dashboard</h1>
//               <DatePicker
//                 id="date-picker"
//                 // label="Date Picker Input"
//                 placeholder="01 Jan 2025 - 30 Dec 2025"
//                 mode="range"
//                 wrapperWidth="16rem"
//                 onChange={(dates, currentDateString) => {
//                   // Handle your logic
//                   console.log({ dates, currentDateString });
//                 }}
//               />

//               {/* <MonthYearPickerDropdown /> */}
//               {/* <DatePicker /> */}
//             </div>
//           </div>
//         </div>
//         <div className="col-span-12 xl:col-span-6">
//           {/* <AnalyticsMetrics /> */}
//           <div className="rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
//             <div className="flex flex-wrap items-start justify-between gap-5">
//               <div>
//                 <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90">
//                   Ticket Status
//                 </h3>
//                 <span className="block text-gray-500 text-theme-sm dark:text-gray-400">
//                   Visitor analytics of last 30 days
//                 </span>
//               </div>
//             </div>
//             <div className="max-w-full overflow-x-auto custom-scrollbar">
//               <div className="-ml-5 min-w-[1300px] xl:min-w-full pl-2">
//                 <div>
//                   <div id="chart">
//                     <ReactApexChart
//                       options={state3.options}
//                       series={state3.series}
//                       type="bar"
//                       height={350}
//                     />
//                   </div>
//                   <div id="html-dist"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-span-12 xl:col-span-6">
//           <div className="rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
//             <div className="flex flex-wrap items-start justify-between gap-5">
//               <div>
//                 <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90">
//                   Asset Types
//                 </h3>
//                 <span className="block text-gray-500 text-theme-sm dark:text-gray-400">
//                   Visitor analytics of last 30 days
//                 </span>
//               </div>
//             </div>
//             <div className="max-w-full overflow-x-auto custom-scrollbar">
//               <div className="-ml-5 min-w-[1300px] xl:min-w-full pl-2">
//                 <div>
//                   <div id="chart">
//                     <ReactApexChart
//                       options={state.options}
//                       series={state.series}
//                       type="bar"
//                       height={350}
//                     />
//                   </div>
//                   <div id="html-dist"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* <div className="col-span-3"> */}
//         <div className="col-span-12 xl:col-span-7">
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//             <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
//               <div className="flex items-center justify-between mb-9">
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//                   Sessions By Device
//                 </h3>
//                 <div className="relative inline-block">
//                   {/* <button className="dropdown-toggle" onClick={toggleDropdown}>
//                   <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
//                 </button>
//                 <Dropdown
//                   isOpen={isOpen}
//                   onClose={closeDropdown}
//                   className="w-40 p-2"
//                 >
//                   <DropdownItem
//                     onItemClick={closeDropdown}
//                     className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
//                   >
//                     View More
//                   </DropdownItem>
//                   <DropdownItem
//                     onItemClick={closeDropdown}
//                     className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
//                   >
//                     Delete
//                   </DropdownItem>
//                 </Dropdown> */}
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-center mx-auto">
//                   <div id="chart">
//                     <ReactApexChart
//                       options={state2.options}
//                       series={state2.series}
//                       type="radialBar"
//                       height={350}
//                     />
//                   </div>
//                   <div id="html-dist"></div>
//                 </div>
//               </div>
//             </div>
//             {/* </div> */}

//             {/* <div className="col-span-3"> */}
//             <SessionChart />
//             {/* </div> */}
//           </div>
//         </div>

//         <div className="col-span-12 xl:col-span-5">
//           {/* <AnalyticsBarChart /> */}
//           <LineChartOne />
//         </div>

//         {/* <div className="col-span-12 xl:col-span-7">
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//             <TopChannel />
//             <TopPages />
//           </div>
//         </div>
//         <div className="col-span-12 xl:col-span-5">
//           <ActiveUsersChart />
//         </div>

//         <div className="col-span-12 xl:col-span-7">
//           <AcquisitionChannelChart />
//         </div>

//         <div className="col-span-12 xl:col-span-5">
//           <SessionChart />
//         </div>

//         <div className="col-span-12 xl:col-span-5">
//           <DemographicCard />
//         </div>

//         <div className="col-span-12 xl:col-span-7">
//           <RecentOrderAnalytics />
//         </div> */}
//       </div>
//     </>
//   );
// }

import SessionChart from "../analytics/SessionChart";
import PageMeta from "../common/PageMeta";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";
import LineChartOne from "../charts/line/LineChartOne";
import DatePicker from "../form/DatePicker";

export default function MyDashboard() {
  const [state] = useState({
    series: [
      {
        data: [44, 55, 41, 67, 22, 43, 21],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        height: 350,
        type: "bar" as const, // Add 'as const' here
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "35%",
          endingShape: "flat" as const,
          borderRadius: 8,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        width: 0,
      },
      grid: {
        row: {},
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: ["PO", "PR", "AP", "AR", "BA", "CM", "GL"],
        tickPlacement: "on" as const,
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      fill: {
        type: "solid" as const,
        colors: ["#007bff"],
      },
    },
  });

  const [state3] = useState({
    series: [
      {
        data: [44, 55, 41, 67, 22],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        height: 350,
        type: "bar" as const, // Add 'as const' here
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
          endingShape: "flat" as const,
          borderRadius: 8,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        width: 0,
      },
      grid: {
        borderColor: "#ff0000",
        strokeDashArray: 5,
        row: {},
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: [
          "New Ticket",
          "Assign Ticket",
          "Processing",
          "Complete",
          "Closed",
        ],
        tickPlacement: "on" as const,
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      fill: {
        type: "solid" as const,
        colors: ["#007bff"],
      },
    },
  });

  const [state2] = useState({
    series: [44, 55, 67, 83],
    options: {
      chart: {
        height: 350,
        type: "radialBar" as const, // Add 'as const' here
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total",
              formatter: function () {
                return "249";
              },
            },
          },
        },
      },
      labels: ["Apples", "Oranges", "Bananas", "Berries"],
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 370,
            height: 290,
          },
        },
      },
    ],
  });

  return (
    <>
      <PageMeta
        title="React.js Analytics Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Analytics Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <div className="rounded-2xl">
            <div className="w-full flex items-center justify-between">
              <h1 className="text-2xl font-bold page-title-text">Dashboard</h1>
              <DatePicker
                id="date-picker"
                placeholder="01 Jan 2025 - 30 Dec 2025"
                mode="range"
                wrapperWidth="16rem"
                onChange={(dates, currentDateString) => {
                  console.log({ dates, currentDateString });
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 xl:col-span-6">
          <div className="rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90">
                  Ticket Status
                </h3>
                <span className="block text-gray-500 text-theme-sm dark:text-gray-400">
                  Visitor analytics of last 30 days
                </span>
              </div>
            </div>
            <div className="max-w-full overflow-x-auto custom-scrollbar">
              <div className="-ml-5 min-w-[1300px] xl:min-w-full pl-2">
                <div>
                  <div id="chart">
                    <ReactApexChart
                      options={state3.options}
                      series={state3.series}
                      type="bar"
                      height={350}
                    />
                  </div>
                  <div id="html-dist"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90">
                  Asset Types
                </h3>
                <span className="block text-gray-500 text-theme-sm dark:text-gray-400">
                  Visitor analytics of last 30 days
                </span>
              </div>
            </div>
            <div className="max-w-full overflow-x-auto custom-scrollbar">
              <div className="-ml-5 min-w-[1300px] xl:min-w-full pl-2">
                <div>
                  <div id="chart">
                    <ReactApexChart
                      options={state.options}
                      series={state.series}
                      type="bar"
                      height={350}
                    />
                  </div>
                  <div id="html-dist"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-7">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
              <div className="flex items-center justify-between mb-9">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                  Sessions By Device
                </h3>
                <div className="relative inline-block"></div>
              </div>
              <div>
                <div className="flex justify-center mx-auto">
                  <div id="chart">
                    <ReactApexChart
                      options={state2.options}
                      series={state2.series}
                      type="radialBar"
                      height={350}
                    />
                  </div>
                  <div id="html-dist"></div>
                </div>
              </div>
            </div>

            <SessionChart />
          </div>
        </div>

        <div className="col-span-12 xl:col-span-5">
          <LineChartOne />
        </div>
      </div>
    </>
  );
}
