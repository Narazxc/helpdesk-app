export interface User {
  id: number;
  userCode: string;
  userName: string;
  userId: string;
  telegramId: string;
  password: string;
  phoneNumber: string;
  email: string;
  businessId: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

////////////////////
// {
// "id": 1,
// "userCode": "USR_20250905_966e9560",
// "userName": "Chief OFA",
// "userId": "USR001",
// "telegramId": "113377700",
// "password": "123456",
// "phoneNumber": "010202032",
// "email": "chief.ofa@fmish.gov.kh",
// "businessId": 1034,
// "status": true,
// "createdAt": "2025-09-05T10:16:00.981017",
// "updatedAt": "2025-09-05T10:16:00.981017",
// "createdBy": "Sreymom created",
// "updatedBy": null
// },

// new user type (need to use this after the next deployement 20251009)
// export interface User2 {
//   id: number;
//   userCode: string;
//   username: string;
//   userId: string;
//   telegramId: string;
//   phoneNumber: string;
//   email: string;
//   businessId: number;
//   status: boolean;
//   createdAt: string;
//   updatedAt: string;
//   createdBy: string;
//   updatedBy: string;
// }

// new user type (need to use this after the next deployement 20251009)
export interface User3 {
  id: number;
  userCode: string;
  userName: string;
  userId: string;
  telegramId: string;
  phoneNumber: string;
  email: string;
  // operatingId: number;
  operatingId: string;
  roleName: string[];
  requestTypeName: string[];
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

// new user type (20251114)
export interface User4 {
  id: number;
  userCode: string;
  username: string;
  userId: string;
  telegramId: string;
  phoneNumber: string;
  email: string;
  // operatingId: number;
  operatingId: string;
  roleName: string[];
  requestTypeName: string[];
  status: boolean;
  accountLocked: boolean; // added on 20251119
  createdAt: string;
  updatedAt: string;
  // forcePasswordChange: boolean; // added on 20251203
}

// new user type (20251217)
export interface User4 {
  id: number;
  userCode: string;
  username: string;
  userId: string;
  telegramId: string;
  phoneNumber: string;
  email: string;
  // operatingId: number;
  operatingId: string;
  roleName: string[];
  requestTypeName: string[];
  status: boolean;
  accountLocked: boolean; // added on 20251119
  createdAt: string;
  updatedAt: string;
  inactiveDate: string;
  // forcePasswordChange: boolean; // added on 20251203
  base64Data: string;
}

// {
// "id": 1,
// "userCode": "USR_20251006_11645b3a",
// "userName": "Khen Sreymom",
// "userId": "sreymom.khen",
// "telegramId": "1234567",
// "phoneNumber": "010999888",
// "email": "khen.sreymom@fmis.gov.kh",
// "operatingId": "1032-GDPFMIT",
// "roleName": [
// "Frontdesk"
// ],
// "requestTypeName": [
// "New Development",
// "Issue Request",
// "Network Problem",
// "Letter Request"
// ],
// "status": true,
// "createdAt": "2025-10-06T16:17:37.168567",
// "updatedAt": "2025-10-08T11:33:22.87195"
// },

export interface CreateUser {
  userName: string;
  // username: string;
  userId: string;
  telegramId: string;
  password: string;
  phoneNumber: string;
  email: string;
  businessCode: string;
  roleCode: string[];
  requestTypeCode: string[];
}

// 20251114
export interface CreateUser2 {
  username: string;
  userId: string;
  telegramId: string;
  password: string;
  phoneNumber: string;
  email: string;
  businessCode: string;
  // roleCode: string[];
  roleIds: string[];
  requestTypeCode: string[];
}

export interface UpdateUser {
  id: string;
  newUserData: CreateUser2;
}

// Old
//   "userId": "john.son",
//   "telegramId": "1234067",
//   "password": "Admin@789",
//   "phoneNumber": "010999888",
//   "email": "john.son@fmis.gov.kh",
//   "businessCode": "BUI20251002_56322774",  // assign business or operating unit
//   "roleCode": [
//     "ROL_20251008_e72b17cb" // assign Role
//   ],
//   "requestTypeCode": [
//     "REQ_20250826_36fcb14c", /* assign request type */
//     "REQ_20250826_23d2f632",
//     "REQ_20250910_49f57178",
//     "REQ_20250827_b481233e"
//   ]

// New
// {
//   "username": "John Son",
//   "userId": "john.son",
//   "telegramId": "1234067",
//   "password": "Admin@789",
//   "phoneNumber": "010999888",
//   "email": "john.son@fmis.gov.kh",
//   "businessCode": "BUI20251002_56322774",  // assign business or operating unit
//   "roleCode": [
//     "ROL_20251008_e72b17cb" // assign Role
//   ],
//   "requestTypeCode": [
//     "REQ_20250826_36fcb14c", /* assign request type */
//     "REQ_20250826_23d2f632",
//     "REQ_20250910_49f57178",
//     "REQ_20250827_b481233e"
//   ]
// }

export interface UserProfile {
  id: number;
  userId: string;
  username: string;
  telegramId: string | null; // Can be null
  phoneNumber: string | null; // Can be null
  email: string;
  operatingId: string;
  roles: string[];
  base64Data: string;
}

export interface UpdateCurrentUserProfile {
  phoneNumber: string;
}
