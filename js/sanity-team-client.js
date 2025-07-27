// Sanity Team Management Client
// This client handles all team member operations with Sanity CMS

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'w38otuoh',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-10-01'
});

// Team member queries
const teamQueries = {
  // Get all active team members
  getAllActiveMembers: `*[_type == "teamMember" && active == true] | order(order asc) {
    _id,
    name,
    position,
    bio,
    "imageUrl": image.asset->url,
    email,
    linkedin,
    order,
    active,
    featured,
    slug,
    expertise,
    yearsOfExperience,
    certifications
  }`,

  // Get featured team members
  getFeaturedMembers: `*[_type == "teamMember" && active == true && featured == true] | order(order asc) {
    _id,
    name,
    position,
    bio,
    "imageUrl": image.asset->url,
    email,
    linkedin,
    order,
    active,
    featured,
    slug,
    expertise,
    yearsOfExperience,
    certifications
  }`,

  // Get team member by slug
  getMemberBySlug: (slug) => `*[_type == "teamMember" && slug.current == $slug][0] {
    _id,
    name,
    position,
    bio,
    "imageUrl": image.asset->url,
    email,
    linkedin,
    order,
    active,
    featured,
    slug,
    expertise,
    yearsOfExperience,
    certifications
  }`,

  // Get all team members (including inactive)
  getAllMembers: `*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    position,
    bio,
    "imageUrl": image.asset->url,
    email,
    linkedin,
    order,
    active,
    featured,
    slug,
    expertise,
    yearsOfExperience,
    certifications
  }`
};

// Team member mutations
const teamMutations = {
  // Create new team member
  createMember: (memberData) => ({
    _type: 'teamMember',
    name: memberData.name,
    position: memberData.position,
    bio: memberData.bio,
    image: memberData.image ? {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: memberData.image
      }
    } : undefined,
    email: memberData.email,
    linkedin: memberData.linkedin,
    order: memberData.order || 1,
    active: memberData.active !== false,
    featured: memberData.featured || false,
    slug: {
      _type: 'slug',
      current: memberData.slug || memberData.name.toLowerCase().replace(/\s+/g, '-')
    },
    expertise: memberData.expertise || [],
    yearsOfExperience: memberData.yearsOfExperience,
    certifications: memberData.certifications || []
  }),

  // Update team member
  updateMember: (id, memberData) => ({
    _id: id,
    _type: 'teamMember',
    name: memberData.name,
    position: memberData.position,
    bio: memberData.bio,
    image: memberData.image ? {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: memberData.image
      }
    } : undefined,
    email: memberData.email,
    linkedin: memberData.linkedin,
    order: memberData.order || 1,
    active: memberData.active !== false,
    featured: memberData.featured || false,
    slug: {
      _type: 'slug',
      current: memberData.slug || memberData.name.toLowerCase().replace(/\s+/g, '-')
    },
    expertise: memberData.expertise || [],
    yearsOfExperience: memberData.yearsOfExperience,
    certifications: memberData.certifications || []
  })
};

// Team management functions
export const teamAPI = {
  // Get all active team members
  async getAllActiveMembers() {
    try {
      const members = await client.fetch(teamQueries.getAllActiveMembers);
      return members.map(formatTeamMember);
    } catch (error) {
      console.error('Error fetching active team members:', error);
      throw error;
    }
  },

  // Get featured team members
  async getFeaturedMembers() {
    try {
      const members = await client.fetch(teamQueries.getFeaturedMembers);
      return members.map(formatTeamMember);
    } catch (error) {
      console.error('Error fetching featured team members:', error);
      throw error;
    }
  },

  // Get team member by slug
  async getMemberBySlug(slug) {
    try {
      const member = await client.fetch(teamQueries.getMemberBySlug(slug), { slug });
      return member ? formatTeamMember(member) : null;
    } catch (error) {
      console.error('Error fetching team member by slug:', error);
      throw error;
    }
  },

  // Get all team members (admin use)
  async getAllMembers() {
    try {
      const members = await client.fetch(teamQueries.getAllMembers);
      return members.map(formatTeamMember);
    } catch (error) {
      console.error('Error fetching all team members:', error);
      throw error;
    }
  },

  // Create new team member
  async createMember(memberData) {
    try {
      const mutation = teamMutations.createMember(memberData);
      const result = await client.create(mutation);
      return formatTeamMember(result);
    } catch (error) {
      console.error('Error creating team member:', error);
      throw error;
    }
  },

  // Update team member
  async updateMember(id, memberData) {
    try {
      const mutation = teamMutations.updateMember(id, memberData);
      const result = await client.createOrReplace(mutation);
      return formatTeamMember(result);
    } catch (error) {
      console.error('Error updating team member:', error);
      throw error;
    }
  },

  // Delete team member
  async deleteMember(id) {
    try {
      await client.delete(id);
      return true;
    } catch (error) {
      console.error('Error deleting team member:', error);
      throw error;
    }
  },

  // Toggle team member status
  async toggleMemberStatus(id, active) {
    try {
      await client.patch(id).set({ active }).commit();
      return true;
    } catch (error) {
      console.error('Error toggling team member status:', error);
      throw error;
    }
  },

  // Upload image and return asset reference
  async uploadImage(file) {
    try {
      const asset = await client.assets.upload('image', file);
      return asset._id;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
};

// Helper function to format team member data
function formatTeamMember(member) {
  return {
    _id: member._id,
    name: member.name,
    position: member.position,
    bio: member.bio,
    imageUrl: member.imageUrl,
    email: member.email,
    linkedin: member.linkedin,
    order: member.order || 1,
    active: member.active !== false,
    featured: member.featured || false,
    slug: member.slug?.current,
    expertise: member.expertise || [],
    yearsOfExperience: member.yearsOfExperience,
    certifications: member.certifications || []
  };
}

// Export for use in other files
export default teamAPI; 