import { buildClient, BaseClientOptions, XataRecord } from "@xata.io/client";

export interface NextauthUser {
  email?: string | null;
  emailVerified?: Date | null;
  name?: string | null;
  image?: string | null;
  username?: string | null;
  location?: string | null;
}

export type NextauthUserRecord = NextauthUser & XataRecord;

export interface NextauthAccount {
  user?: NextauthUserRecord | null;
  type?: string | null;
  provider?: string | null;
  providerAccountId?: string | null;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
}

export type NextauthAccountRecord = NextauthAccount & XataRecord;

export interface NextauthVerificationToken {
  identifier?: string | null;
  token?: string | null;
  expires?: Date | null;
}

export type NextauthVerificationTokenRecord = NextauthVerificationToken &
  XataRecord;

export interface NextauthUsersAccount {
  user?: NextauthUserRecord | null;
  account?: NextauthAccountRecord | null;
}

export type NextauthUsersAccountRecord = NextauthUsersAccount & XataRecord;

export interface NextauthUsersSession {
  user?: NextauthUserRecord | null;
  session?: NextauthSessionRecord | null;
}

export type NextauthUsersSessionRecord = NextauthUsersSession & XataRecord;

export interface NextauthSession {
  sessionToken?: string | null;
  expires?: Date | null;
  user?: NextauthUserRecord | null;
}

export type NextauthSessionRecord = NextauthSession & XataRecord;

export interface Ticket {
  user?: NextauthUserRecord | null;
}

export type TicketRecord = Ticket & XataRecord;

export type DatabaseSchema = {
  nextauth_users: NextauthUser;
  nextauth_accounts: NextauthAccount;
  nextauth_verificationTokens: NextauthVerificationToken;
  nextauth_users_accounts: NextauthUsersAccount;
  nextauth_users_sessions: NextauthUsersSession;
  nextauth_sessions: NextauthSession;
  tickets: Ticket;
};

const tables = [
  "nextauth_users",
  "nextauth_accounts",
  "nextauth_verificationTokens",
  "nextauth_users_accounts",
  "nextauth_users_sessions",
  "nextauth_sessions",
  "tickets",
];

const DatabaseClient = buildClient();

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super(
      { databaseURL: "https://xata-uq2d57.xata.sh/db/conf", ...options },
      tables
    );
  }
}
