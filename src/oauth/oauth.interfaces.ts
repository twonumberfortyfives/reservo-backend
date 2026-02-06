export interface IOAuthLoginUrl {
    loginUrl: string
}

export interface IOAuthTokens {
    scope: string,
    token_type: string,
    access_token: string,
    expires_in: number,
    refresh_token?: string,
    refresh_token_expires_in?: number
}

export interface IAccessTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}