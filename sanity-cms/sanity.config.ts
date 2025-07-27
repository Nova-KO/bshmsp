import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './bsh-techhnologies/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'BSH Technologies CMS',

  projectId: 'w38otuoh',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  // Enable CORS for development
  cors: {
    credentials: 'include',
    origin: ['http://localhost:3000', 'http://localhost:3333', 'https://bshtechnologies.in']
  },

  // API configuration
  api: {
    projectId: 'w38otuoh',
    dataset: 'production'
  }
}) 