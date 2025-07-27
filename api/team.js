// Team Management API Endpoints
// This provides REST API endpoints for team member management with Sanity

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'w38otuoh',
  dataset: 'production',
  useCdn: false, // Use false for mutations
  apiVersion: '2023-10-01',
  token: process.env.SANITY_TOKEN // Use environment variable for token
});

// Get all team members
async function getAllMembers(req, res) {
  try {
    const query = `*[_type == "teamMember"] | order(order asc) {
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
    }`;

    const members = await client.fetch(query);
    res.json(members);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
}

// Get active team members
async function getActiveMembers(req, res) {
  try {
    const query = `*[_type == "teamMember" && active == true] | order(order asc) {
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
    }`;

    const members = await client.fetch(query);
    res.json(members);
  } catch (error) {
    console.error('Error fetching active team members:', error);
    res.status(500).json({ error: 'Failed to fetch active team members' });
  }
}

// Get team member by ID
async function getMemberById(req, res) {
  try {
    const { id } = req.params;
    const member = await client.getDocument(id);
    
    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    // Format the response
    const formattedMember = {
      _id: member._id,
      name: member.name,
      position: member.position,
      bio: member.bio,
      imageUrl: member.image?.asset?.url,
      email: member.email,
      linkedin: member.linkedin,
      order: member.order,
      active: member.active,
      featured: member.featured,
      slug: member.slug?.current,
      expertise: member.expertise || [],
      yearsOfExperience: member.yearsOfExperience,
      certifications: member.certifications || []
    };

    res.json(formattedMember);
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({ error: 'Failed to fetch team member' });
  }
}

// Create new team member
async function createMember(req, res) {
  try {
    const memberData = req.body;

    // Validate required fields
    if (!memberData.name || !memberData.position || !memberData.bio) {
      return res.status(400).json({ error: 'Name, position, and bio are required' });
    }

    // Create the document
    const doc = {
      _type: 'teamMember',
      name: memberData.name,
      position: memberData.position,
      bio: memberData.bio,
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
    };

    // Add image if provided
    if (memberData.image) {
      doc.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: memberData.image
        }
      };
    }

    const result = await client.create(doc);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({ error: 'Failed to create team member' });
  }
}

// Update team member
async function updateMember(req, res) {
  try {
    const { id } = req.params;
    const memberData = req.body;

    // Validate required fields
    if (!memberData.name || !memberData.position || !memberData.bio) {
      return res.status(400).json({ error: 'Name, position, and bio are required' });
    }

    // Get existing document
    const existingDoc = await client.getDocument(id);
    if (!existingDoc) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    // Update the document
    const updateDoc = {
      ...existingDoc,
      name: memberData.name,
      position: memberData.position,
      bio: memberData.bio,
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
    };

    // Update image if provided
    if (memberData.image) {
      updateDoc.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: memberData.image
        }
      };
    }

    const result = await client.createOrReplace(updateDoc);
    res.json(result);
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({ error: 'Failed to update team member' });
  }
}

// Delete team member
async function deleteMember(req, res) {
  try {
    const { id } = req.params;
    
    // Check if document exists
    const existingDoc = await client.getDocument(id);
    if (!existingDoc) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    await client.delete(id);
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
}

// Toggle team member status
async function toggleMemberStatus(req, res) {
  try {
    const { id } = req.params;
    const { active } = req.body;

    // Check if document exists
    const existingDoc = await client.getDocument(id);
    if (!existingDoc) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    await client.patch(id).set({ active }).commit();
    res.json({ message: 'Team member status updated successfully' });
  } catch (error) {
    console.error('Error toggling team member status:', error);
    res.status(500).json({ error: 'Failed to update team member status' });
  }
}

// Upload image
async function uploadImage(req, res) {
  try {
    // This would need to be implemented with file upload handling
    // For now, we'll return a placeholder
    res.status(501).json({ error: 'Image upload not implemented yet' });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
}

module.exports = {
  getAllMembers,
  getActiveMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  toggleMemberStatus,
  uploadImage
}; 