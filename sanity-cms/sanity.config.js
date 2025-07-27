import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'bsh-technologies-cms',
  title: 'BSH Technologies CMS',

  projectId: 'YOUR_PROJECT_ID', // Replace with your Sanity project ID
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  // Customize the studio
  studio: {
    components: {
      // Add custom branding if needed
    }
  }
}) 