// Browser-compatible Sanity Client (using CDN)
// This file works without module bundlers

// Sanity client configuration
const SANITY_CONFIG = {
  projectId: 'w38otuoh', // BSH Technologies Sanity project
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-10-01'
}

// Simple fetch-based client
const sanityClient = {
  fetch: async (query, params = {}) => {
    const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}`
    
    const queryParams = new URLSearchParams({
      query: query,
      ...params
    })

    try {
      const response = await fetch(`${url}?${queryParams}`)
      if (!response.ok) {
        throw new Error(`Sanity API error: ${response.status}`)
      }
      const data = await response.json()
      return data.result
    } catch (error) {
      console.error('Sanity fetch error:', error)
      return null
    }
  }
}

// Job API functions
const jobAPI = {
  // Get all active jobs
  async getAllActiveJobs() {
    const query = `
      *[_type == "jobOpportunity" && isActive == true && (!defined(expiresAt) || expiresAt > now())] | order(featured desc, publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
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
    `
    return await sanityClient.fetch(query)
  },

  // Format job for display
  formatJob(job) {
    return {
      id: job._id,
      title: job.title,
      slug: job.slug,
      description: job.description,
      requirements: job.requirements || [],
      eligibility: job.eligibility,
      skills: job.skills || [],
      location: job.location,
      duration: job.duration,
      jobType: job.jobType,
      applicationUrl: job.applicationUrl || '/internship-application.html',
      isFeatured: job.featured,
      publishedDate: new Date(job.publishedAt).toLocaleDateString()
    }
  },

  // Get location badge
  getLocationBadge(location) {
    if (location && location.toLowerCase().includes('remote')) {
      return 'Remote'
    }
    return location || 'Remote'
  }
}

// Main function to load and render jobs
async function loadJobsFromSanity() {
  console.log('Loading jobs from Sanity...')
  
  try {
    // Check if Sanity is configured
    if (SANITY_CONFIG.projectId === 'YOUR_PROJECT_ID') {
      console.warn('Sanity not configured yet, using fallback jobs')
      return renderFallbackJobs()
    }

    const rawJobs = await jobAPI.getAllActiveJobs()
    
    if (!rawJobs || rawJobs.length === 0) {
      console.warn('No jobs found in Sanity, using fallback')
      return renderFallbackJobs()
    }

    const jobs = rawJobs.map(job => jobAPI.formatJob(job))
    renderJobsToPage(jobs)
    console.log(`Loaded ${jobs.length} jobs from Sanity`)
    
  } catch (error) {
    console.error('Error loading jobs from Sanity:', error)
    renderFallbackJobs()
  }
}

// Render jobs to the page
function renderJobsToPage(jobs) {
  const container = document.querySelector('.positions-grid')
  if (!container) {
    console.error('Positions grid container not found')
    return
  }

  container.innerHTML = jobs.map(job => createJobCard(job)).join('')
  
  // Reinitialize the toggle functionality
  initializeJobCardToggles()
}

// Create HTML for a job card
function createJobCard(job) {
  const requirementsHTML = job.requirements.map(req => `
    <div class="detail-item">
      <strong>Role:</strong> ${req}
    </div>
  `).join('')

  const skillsHTML = job.skills.map(skill => `
    <div class="detail-item">
      <strong>Skills:</strong> ${job.skills.join(', ')}
    </div>
  `).join('')

  return `
    <div class="position-card" data-job-id="${job.id}">
      <div class="position-card-header" onclick="togglePosition(this)">
        <div class="position-card-title">
          <h3 class="global-headline-xs">${job.title}${job.isFeatured ? ' ⭐' : ''}</h3>
          <div class="position-badge">${jobAPI.getLocationBadge(job.location)}</div>
        </div>
        <div class="position-card-toggle">
          <svg class="toggle-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div class="position-card-content">
        <p class="copytext">${job.description}</p>
        <div class="position-details">
          <div class="detail-item">
            <strong>Eligibility:</strong> ${job.eligibility}
          </div>
          <div class="detail-item">
            <strong>Skills:</strong> ${job.skills.join(', ')}
          </div>
          <div class="detail-item">
            <strong>Location:</strong> ${job.location}
          </div>
          <div class="detail-item">
            <strong>Duration:</strong> ${job.duration}
          </div>
        </div>
        <div class="global-btn-div tm-2">
          <a href="${job.applicationUrl}" class="primary-btn is-black w-inline-block">
            <div class="btn-txt-container">
              <div class="btn-txt is-white">Apply Now</div>
              <div class="btn-txt is-white">Apply Now</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  `
}

// Fallback jobs when Sanity is not available
function renderFallbackJobs() {
  console.log('Using fallback jobs (static content)')
  // The existing static jobs will remain if Sanity fails
}

// Initialize job card toggle functionality
function initializeJobCardToggles() {
  // The existing togglePosition function will handle this
  console.log('Job card toggles initialized')
}

// Auto-load jobs when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadJobsFromSanity)
} else {
  loadJobsFromSanity()
} 