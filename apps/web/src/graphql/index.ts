import { envs } from '@kry/envs';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GraphQLErrors } from '@apollo/client/errors';
import { AppI18nLang } from '@kry/i18n';
import { DocumentNode, TypedQueryDocumentNode } from 'graphql';
import { toast } from 'react-hot-toast';

export const client = new ApolloClient({
  uri: envs.API_URL,
  cache: new InMemoryCache(),
  ssrMode: true,
});

export type Cronos<T> = {
  query: DocumentNode | TypedQueryDocumentNode;
  variables: T;
  type: 'query' | 'mutation';
  lang?: AppI18nLang;
  token?: string;
  notify?: boolean;
};

const graphql = async <F, T extends object>({
  query,
  type = 'query',
  variables,
  lang,
  notify = true,
  token,
}: Cronos<T>) => {
  const context = {
    headers: {
      Authorization: token,
      'Accept-Language': lang,
    },
  };

  try {
    const { data } = await (type === 'mutation'
      ? client.mutate<F, T>({
          mutation: query,
          variables,
          context,
        })
      : client.query<F, T>({
          query,
          variables,
          context,
        }));

    if (data) return data;
  } catch (error) {
    if (notify) toast.error((error as GraphQLErrors[0]).message);
  }
};

export default graphql;
