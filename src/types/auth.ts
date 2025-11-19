export interface LoginCredential {
  userId: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  username: string;
  email: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
  tokenType: string;

  //   userId: "super.admin";
  //   username: "Super Admin";
  //   email: "super.admin@fmis.gov.kh";
  //   roles: ["Super Administrator"];
  //   accessToken: "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJGTUlTIEhlbHBkZXNrIFN5c3RlbSIsImF1ZCI6IkhlbHBkZXNrIFVzZXJzIiwic3ViIjoic3VwZXIuYWRtaW4iLCJ0b2tlbl92ZXJzaW9uIjowLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzYxOTA1MTg3LCJleHAiOjE3NjE5MDYwODd9.3YAS2l5-sIj0seS2k-ugg97bk2TC9vcghtWJnxeDtr-FIucXtr0_Melk63hQcv-qvPTGNu36y4GeTgZXcQCqYQ";
  //   refreshToken: "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJGTUlTIEhlbHBkZXNrIFN5c3RlbSIsImF1ZCI6IkhlbHBkZXNrIFVzZXJzIiwic3ViIjoic3VwZXIuYWRtaW4iLCJ0b2tlbl92ZXJzaW9uIjowLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzYxOTA1MTg3LCJleHAiOjE3NjI1MDk5ODd9.RhCmSTbWEwPtMfko7iXl2glOdUBD3t00nJKwIvV_yzDilgUHWUu7XQTXG46sU_xM1jiemFWtQiq5pvHD8rGSiQ";
  //   tokenType: "Bearer ";
}

export interface CurrentUser {
  id: number;
  userId: string;
  username: string;
  email: string;
  roles: string[];
}

export interface AdminResetPassword {
  newPassword: string;
  confirmPassword: string;
}

//       "id": 3,
//       "userId": "vanny.phoung",
//       "username": "Phoung Vanny",
//       "email": "vanny.phoung@fmis.gov.kh",
//       "roles": [
//           "Test"
//       ]
