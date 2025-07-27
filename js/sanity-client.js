// Sanity Client Configuration for BSH Technologies
import {createClient} from '@sanity/client'

// Create the Sanity client
const client = createClient({
  projectId: 'YOUR_PROJECT_ID', // Replace with your actual Sanity project ID
  dataset: 'production',
  useCdn: true, // Use CDN for faster reads
  apiVersion: '2023-10-01', // Use current date in YYYY-MM-DD format
})

// Query functions for job opportunities
export const jobQueries = {
  // Get all active job opportunities
  getAllActiveJobs: () => {
    return client.fetch(`
      *[_type == "jobOpportunity" && isActive == true && (!defined(expiresAt) || expiresAt > now())] | order(featured desc, publishedAt desc) {
        _id,
        title,
        slug,
        description,
        requirements,
        eligibility,
        skills,
        location,
        duration,
        jobType,
        applicationUrl,
        featured,
        publishedAt
      }
    `)
  },

  // Get featured jobs
  getFeaturedJobs: () => {
    return client.fetch(`
      *[_type == "jobOpportunity" && isActive == true && featured == true && (!defined(expiresAt) || expiresAt > now())] | order(publishedAt desc) {
        _id,
        title,
        slug,
        description,
        requirements,
        eligibility,
        skills,
        location,
        duration,
        jobType,
        applicationUrl,
        publishedAt
      }
    `)
  },

  // Get job by slug
  getJobBySlug: (slug) => {
    return client.fetch(`
      *[_type == "jobOpportunity" && slug.current == $slug && isActive == true][0] {
        _id,
        title,
        slug,
        description,
        requirements,
        eligibility,
        skills,
        location,
        duration,
        jobType,
        applicationUrl,
        featured,
        publishedAt
      }
    `, { slug })
  }
}

// Helper functions
export const sanityHelpers = {
  // Format job data for the frontend
  formatJobForDisplay: (job) => {
    return {
      id: job._id,
      title: job.title,
      description: job.description,
      requirements: job.requirements || [],
      eligibility: job.eligibility,
      skills: job.skills || [],
      location: job.location,
      duration: job.duration,
      jobType: job.jobType,
      applicationUrl: job.applicationUrl,
      isFeatured: job.featured,
      publishedDate: new Date(job.publishedAt).toLocaleDateString()
    }
  },

  // Check if location is remote
  isRemotePosition: (location) => {
    return location && location.toLowerCase().includes('remote')
  },

  // Get location badge text
  getLocationBadge: (location) => {
    if (sanityHelpers.isRemotePosition(location)) {
      return 'Remote'
    }
    return location
  }
}

// Main API object
export const sanityAPI = {
  // Load all jobs and format them
  async loadJobs() {
    try {
      const jobs = await jobQueries.getAllActiveJobs()
      return jobs.map(sanityHelpers.formatJobForDisplay)
    } catch (error) {
      console.error('Error loading jobs from Sanity:', error)
      return []
    }
  },

  // Load featured jobs
  async loadFeaturedJobs() {
    try {
      const jobs = await jobQueries.getFeaturedJobs()
      return jobs.map(sanityHelpers.formatJobForDisplay)
    } catch (error) {
      console.error('Error loading featured jobs from Sanity:', error)
      return []
    }
  },

  // Load specific job
  async loadJob(slug) {
    try {
      const job = await jobQueries.getJobBySlug(slug)
      return job ? sanityHelpers.formatJobForDisplay(job) : null
    } catch (error) {
      console.error('Error loading job from Sanity:', error)
      return null
    }
  }
}

// Export client for custom queries if needed
export { client as sanityClient } 