export interface Entity {
  id: number;
  businessId: string;
  operatingId: string;
  shortName: string;
  longName: string;
  effectiveDate: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface Entity2 {
  id: number;
  businessCode: string;
  setId: string;
  businessUnit: string;
  operatingUnit: string;
  enShortName: string;
  enDescription: string;
  enLongName: string;
  khShortName: string;
  khDescription: string;
  khLongName: string;
  effectiveDate: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

// {
//   "id": 16,
//   "businessCode": "BUI20251002_55ff86c8",
//   "": "CAMBD",
//   "businessUnit": "01000",
//   "operatingUnit": "01",
//   "enShortName": "MRP",
//   "enDescription": "M-Royal Palace",
//   "enLongName": "Ministry of Royal Palace",
//   "khShortName": "ក្រសួងព្រះបរមរាជវាំង",
//   "khDescription": "ក្រសួងព្រះ",
//   "khLongName": "ក្រសួងព្រះបរមរាជវាំង",
//   "effectiveDate": "2000-01-01",
//   "status": true,
//   "createdAt": "2025-10-02T10:24:42",
//   "updatedAt": "2025-10-02T10:24:42"
// }
