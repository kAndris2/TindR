export const authEndpoint = "https://accounts.spotify.com/api/token";

export const clientId = "e322f72592284ba78343d1969a595ab0";
export const clientSecret = "a951085bf8604543b4270e812b283c41";
export const encoded = btoa(clientId+":"+clientSecret);
export const redirectUri = "http://172.31.1.57:3000/test";
export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
];