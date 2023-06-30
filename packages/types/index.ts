import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export enum AuthSocialEnum {
  Discord = 'DISCORD',
}

export type ConfirmAccountInput = {
  secret: Scalars['String'];
  user: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  AuthSocial: User;
  ConfirmAccount: User;
  SendAccountConfirmationEmail: Success;
  SignIn: User;
  SignUp: User;
};

export type MutationAuthSocialArgs = {
  data: SocialSignInInput;
};

export type MutationConfirmAccountArgs = {
  data: ConfirmAccountInput;
};

export type MutationSendAccountConfirmationEmailArgs = {
  data: SendAccountConfirmationEmailInput;
};

export type MutationSignInArgs = {
  data: SignInInput;
};

export type MutationSignUpArgs = {
  data: SignUpInput;
};

export type Permission = {
  __typename?: 'Permission';
  created_at: Scalars['DateTime'];
  deleted_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: PermissionEnum;
  updated_at: Scalars['DateTime'];
};

export enum PermissionEnum {
  Administrator = 'ADMINISTRATOR',
  CreateNews = 'CREATE_NEWS',
  DeleteNews = 'DELETE_NEWS',
  DeleteUser = 'DELETE_USER',
  EditNews = 'EDIT_NEWS',
}

export type Query = {
  __typename?: 'Query';
  Auth: User;
};

export type Role = {
  __typename?: 'Role';
  created_at: Scalars['DateTime'];
  deleted_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  permissions?: Maybe<Array<Permission>>;
  updated_at: Scalars['DateTime'];
};

export type SendAccountConfirmationEmailInput = {
  user: Scalars['Float'];
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SocialSignInInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  secret: Scalars['String'];
  type: AuthSocialEnum;
  username?: InputMaybe<Scalars['String']>;
};

export type Success = {
  __typename?: 'Success';
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  created_at: Scalars['DateTime'];
  deleted_at?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  roles?: Maybe<Array<Role>>;
  secrets?: Maybe<Array<UserSecret>>;
  social?: Maybe<Array<UserSocial>>;
  status: UserStatusEnum;
  token?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserSecret = {
  __typename?: 'UserSecret';
  created_at: Scalars['DateTime'];
  deleted_at?: Maybe<Scalars['DateTime']>;
  expiresIn: Scalars['DateTime'];
  id: Scalars['ID'];
  secret: Scalars['String'];
  updated_at: Scalars['DateTime'];
  user: User;
};

export type UserSocial = {
  __typename?: 'UserSocial';
  created_at: Scalars['DateTime'];
  deleted_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  secret: Scalars['String'];
  type: AuthSocialEnum;
  updated_at: Scalars['DateTime'];
  user: User;
};

export enum UserStatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  PendingPassword = 'PENDING_PASSWORD',
}

export const AuthDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Auth' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Auth' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'confirmed' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'roles' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'permissions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'social' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'secret' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AuthQuery, AuthQueryVariables>;
export const SignUpDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignUp' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'SignUpInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'SignUp' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'confirmed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'roles' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'permissions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'social' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'secret' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const ConfirmAccountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ConfirmAccount' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ConfirmAccountInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ConfirmAccount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'confirmed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'roles' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'permissions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'social' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'secret' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ConfirmAccountMutation,
  ConfirmAccountMutationVariables
>;
export const SendConfirmEmailDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SendConfirmEmail' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'SendAccountConfirmationEmailInput',
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'SendAccountConfirmationEmail' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SendConfirmEmailMutation,
  SendConfirmEmailMutationVariables
>;
export const AuthSocialDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AuthSocial' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'SocialSignInInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'AuthSocial' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'confirmed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'roles' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'permissions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'social' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'secret' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AuthSocialMutation, AuthSocialMutationVariables>;
export const SignInDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignIn' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'SignInInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'SignIn' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'confirmed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'roles' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'permissions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'social' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'secret' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export type AuthQueryVariables = Exact<{ [key: string]: never }>;

export type AuthQuery = {
  __typename?: 'Query';
  Auth: {
    __typename?: 'User';
    id: string;
    token?: string | null;
    deleted_at?: any | null;
    updated_at: any;
    email: string;
    status: UserStatusEnum;
    avatar?: string | null;
    created_at: any;
    confirmed?: boolean | null;
    username: string;
    roles?: Array<{
      __typename?: 'Role';
      id: string;
      name: string;
      permissions?: Array<{
        __typename?: 'Permission';
        name: PermissionEnum;
        id: string;
      }> | null;
    }> | null;
    social?: Array<{
      __typename?: 'UserSocial';
      id: string;
      type: AuthSocialEnum;
      secret: string;
    }> | null;
  };
};

export type SignUpMutationVariables = Exact<{
  data: SignUpInput;
}>;

export type SignUpMutation = {
  __typename?: 'Mutation';
  SignUp: {
    __typename?: 'User';
    id: string;
    token?: string | null;
    deleted_at?: any | null;
    updated_at: any;
    email: string;
    confirmed?: boolean | null;
    avatar?: string | null;
    status: UserStatusEnum;
    created_at: any;
    username: string;
    roles?: Array<{
      __typename?: 'Role';
      id: string;
      name: string;
      permissions?: Array<{
        __typename?: 'Permission';
        name: PermissionEnum;
        id: string;
      }> | null;
    }> | null;
    social?: Array<{
      __typename?: 'UserSocial';
      id: string;
      type: AuthSocialEnum;
      secret: string;
    }> | null;
  };
};

export type ConfirmAccountMutationVariables = Exact<{
  data: ConfirmAccountInput;
}>;

export type ConfirmAccountMutation = {
  __typename?: 'Mutation';
  ConfirmAccount: {
    __typename?: 'User';
    id: string;
    token?: string | null;
    deleted_at?: any | null;
    updated_at: any;
    email: string;
    confirmed?: boolean | null;
    status: UserStatusEnum;
    created_at: any;
    avatar?: string | null;
    username: string;
    roles?: Array<{
      __typename?: 'Role';
      id: string;
      name: string;
      permissions?: Array<{
        __typename?: 'Permission';
        name: PermissionEnum;
        id: string;
      }> | null;
    }> | null;
    social?: Array<{
      __typename?: 'UserSocial';
      id: string;
      type: AuthSocialEnum;
      secret: string;
    }> | null;
  };
};

export type SendConfirmEmailMutationVariables = Exact<{
  data: SendAccountConfirmationEmailInput;
}>;

export type SendConfirmEmailMutation = {
  __typename?: 'Mutation';
  SendAccountConfirmationEmail: { __typename?: 'Success'; success: boolean };
};

export type AuthSocialMutationVariables = Exact<{
  data: SocialSignInInput;
}>;

export type AuthSocialMutation = {
  __typename?: 'Mutation';
  AuthSocial: {
    __typename?: 'User';
    id: string;
    token?: string | null;
    deleted_at?: any | null;
    updated_at: any;
    email: string;
    status: UserStatusEnum;
    confirmed?: boolean | null;
    created_at: any;
    avatar?: string | null;
    username: string;
    roles?: Array<{
      __typename?: 'Role';
      id: string;
      name: string;
      permissions?: Array<{
        __typename?: 'Permission';
        name: PermissionEnum;
        id: string;
      }> | null;
    }> | null;
    social?: Array<{
      __typename?: 'UserSocial';
      id: string;
      type: AuthSocialEnum;
      secret: string;
    }> | null;
  };
};

export type SignInMutationVariables = Exact<{
  data: SignInInput;
}>;

export type SignInMutation = {
  __typename?: 'Mutation';
  SignIn: {
    __typename?: 'User';
    id: string;
    token?: string | null;
    deleted_at?: any | null;
    updated_at: any;
    email: string;
    status: UserStatusEnum;
    created_at: any;
    confirmed?: boolean | null;
    avatar?: string | null;
    username: string;
    roles?: Array<{
      __typename?: 'Role';
      id: string;
      name: string;
      permissions?: Array<{
        __typename?: 'Permission';
        name: PermissionEnum;
        id: string;
      }> | null;
    }> | null;
    social?: Array<{
      __typename?: 'UserSocial';
      id: string;
      type: AuthSocialEnum;
      secret: string;
    }> | null;
  };
};
