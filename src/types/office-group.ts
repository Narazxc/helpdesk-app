export interface OfficeGroup {
  id: number;
  officeName: string;
  chiefOfficeName: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  createdBy: string;
  updatedBy: string;
}

export interface CreateOfficeGroup {
  officeName: string;
  userCode: string;
}

//  {
//       "id": 1,
//       "officeName": "OFA",
//       "chiefOfficeName": "Chief OFA",
//       "createdAt": "2025-09-05T10:35:31.738968",
//       "updatedAt": "2025-09-05T10:35:31.738968",
//       "status": true,
//       "createdBy": null,
//       "updatedBy": "Sreymom created"
//     },
