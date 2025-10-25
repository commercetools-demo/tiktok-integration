/**
 * Interface for access token data stored in CommerceTools
 */
export interface AccessTokenData {
  open_id?: string;
  seller_name?: string;
  seller_base_region?: string;
  user_type?: number;
  access_token: string;
  access_token_expire_at?: number;
  refresh_token: string;
  refresh_token_expire_at?: number;
  created_at: string;
  updated_at: string;
  last_refreshed_at: string;
}
