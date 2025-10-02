export interface AgentGroup {
  id: number;
  agentName: string;
  leaderName: string;
  levelName: string;
  officeName: string;
  memberNames: string[];
  createdAt: string;
  updatedAt: string;
  status: boolean;
  createdBy: string;
  updatedBy: string;
}

export interface CreateAgentGroup {
  agentGroupName: string;
  leaderName: string;
  groupLevel: string;
  officeGroupCode: string;
  memberRole: string[];
}

export interface CreateAgentGroup2 {
  agentName: string;
  leaderCode: string;
  groupLevel: string;
  officeGroupCode: string;
  memberCodes: string[];
}

export interface UpdateAgentGroup {
  agentName: string;
  groupLevel: string | null;
  officeGroupCode: string | null;
  leaderCode: string | null;
  memberCodes: string[];
}

// {
//   "agentName": "AR",
//   "groupLevel": "GLC_20250828_771bfe78",
//   "officeGroupCode": "OFF_20250917_316a3ffb",
//   "leaderCode": "USR_20250917_70672cb1",
//   "memberCodes":
//         [
//             "USR_20250917_0360cd94",
//             // "USR_20250917_70672cb1",
//             "USR_20250916_6b74a25b"
//         ]
// }

// export interface UpdateAgentGroupInitialData {
//   moduleName: string;
//   leaderName: string;
//   groupLevel: GroupLevel;
//   officeGroupCode: string;
//   memberRole: string[];
// }

// {
//     "moduleName": "CM1",
//     "leaderName": "USR_20250901_b4821092", // Module's Leader
//     "groupLevel": "GLC_20250828_771bfe78",
//     "officeGroupCode": "OFF_20250901_790cd573",
//     "memberRole":
//         [
//             "USR_20250901_6a6b9a96",
//             "USR_20250901_5f25afc4",
//             "USR_20250901_dac72362"
//         ]
// }

///////////////////////////////
// {
// "id": 1,
// "agentName": "CM",
// "leaderName": "Choub Chanrasmey",
// "levelName": "Level 2",
// "officeName": "OFA",
// "memberNames": [
// "Say Somreaksmey",
// "Yeang Ratheana"
// ],
// "createdAt": "2025-09-05T11:18:29.425815",
// "updatedAt": "2025-09-05T11:18:29.425815",
// "status": true,
// "createdBy": "Sreymom created",
// "updatedBy": null
// },

// {
//     "agentGroupName": "test2",
//     "leaderName": "USR_20250905_0958ba2c11", // Module's Leader
//     "groupLevel": "GLC_20250828_771bfe78",
//     "officeGroupCode": "OFF_20250905_5a383f5b",
//     "memberRole":
//         [
//             "USR_20250905_1e6648fa",
//             "USR_20250905_6018eb75"
//         ]
// }
