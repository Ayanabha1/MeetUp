import AgoraRTC, {
  createClient as RTCCREATECLIENT,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";

import AgoraRTM, { createClient as CREATERTMCLIENT } from "agora-rtm-react";

const APP_ID = import.meta.env.VITE_AGORA_APP_ID || window.AGORA_APP_ID;
const roomId = "main";
const token = null;

export const config = {
  mode: "rtc",
  codec: "vp8",
  APP_ID: APP_ID,
  token: token,
};

export const useRTCClient = RTCCREATECLIENT(config);
export const useRTMClient = CREATERTMCLIENT(config.APP_ID);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
