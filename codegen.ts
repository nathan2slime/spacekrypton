import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './apps/api/schema.gql',
  documents: ['./packages/types/graphql/**/*.graphql'],
  generates: {
    './packages/types/index.ts': {
      hooks: {},
      config: {},
      plugins: ['typescript', 'typed-document-node', 'typescript-operations'],
    },
  },
};

export default config;
