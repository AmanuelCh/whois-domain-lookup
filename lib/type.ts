export interface WhoisResult {
  address: string | null;
  city: string | null;
  country: string | null;
  creation_date: string; // ISO date string
  dnssec: string;
  domain_name: string;
  emails: string;
  expiration_date: string; // ISO date string
  name: string | null;
  name_servers: string[];
  org: string | null;
  referral_url: string | null;
  registrar: string;
  state: string | null;
  status: string[];
  updated_date: string; // ISO date string
  whois_server: string;
  zipcode: string | null;
}

export interface WhoisResponse {
  result: WhoisResult;
}
