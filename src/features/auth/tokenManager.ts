//  "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJGTUlTIEhlbHBkZXNrIFN5c3RlbSIsImF1ZCI6IkhlbHBkZXNrIFVzZXJzIiwic3ViIjoidmFubnkucGhvdW5nIiwidG9rZW5fdmVyc2lvbiI6MCwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTc2MjUwMDAyMSwiZXhwIjoxNzYyNTAwOTIxfQ.PI7ZEIqp__F7nfBvDKUXlwMGWZ8ENcNGRLcxkovzp1s3wfzyiDjh7ZS11SEnlKwJEc2ktJvsmn1uzLJRcNyvNQ",
//  "refreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJGTUlTIEhlbHBkZXNrIFN5c3RlbSIsImF1ZCI6IkhlbHBkZXNrIFVzZXJzIiwic3ViIjoidmFubnkucGhvdW5nIiwidG9rZW5fdmVyc2lvbiI6MCwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTc2MjUwMDAyMSwiZXhwIjoxNzYzMTA0ODIxfQ.aaYG9MxrEPUe6AMP75x7jTeWhRECm_ED3POtCrl5AUSu_u_cr6TXAqBPgD7XtACc-nL2m7X6zEAYvT7uo9drHw",
let accessToken: string | null = null;

export const tokenManager = {
  getAccessToken() {
    return accessToken;
  },

  setAccessToken(token: string) {
    accessToken = token;
  },

  clearAccessToken() {
    accessToken = null;
  },

  hasAccessToken() {
    return !!accessToken;
  },
};
