// Sanity Configuration for BSH Technologies
// Replace YOUR_SANITY_TOKEN_HERE with your actual Sanity API token

const SANITY_CONFIG = {
    projectId: 'w38otuoh',
    dataset: 'production',
    apiVersion: '2023-10-01',
    token: 'YOUR_SANITY_TOKEN_HERE' // Replace this with your actual token
};

// Helper function to get headers with token
function getSanityHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SANITY_CONFIG.token}`
    };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SANITY_CONFIG, getSanityHeaders };
} 