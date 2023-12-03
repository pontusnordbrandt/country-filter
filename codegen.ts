import { CodegenConfig } from '@graphql-codegen/cli';
import { apiUrl } from './src/graphql';

const config: CodegenConfig = {
  schema: apiUrl,
  documents: ['src/graphql/*.{ts,tsx}'],
  generates: {
    './src/graphql/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;