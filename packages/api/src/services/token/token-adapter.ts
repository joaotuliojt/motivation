export interface ICreateToken {
  _id: string;
  roles: string[];
}

export interface TokenAdapter {
  createAuthorization: (data: ICreateToken) => Promise<string | null>;
}
