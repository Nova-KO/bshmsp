export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(100)
    },
    {
      name: 'position',
      title: 'Position/Title',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(100)
    },
    {
      name: 'bio',
      title: 'Bio/Description',
      type: 'text',
      validation: Rule => Rule.required().min(10).max(500)
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility'
        }
      ]
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'email',
      validation: Rule => Rule.email()
    },
    {
      name: 'linkedin',
      title: 'LinkedIn Profile',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which team members appear (1 = first, 2 = second, etc.)',
      validation: Rule => Rule.required().min(1).integer()
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Show this team member on the website',
      initialValue: true
    },
    {
      name: 'featured',
      title: 'Featured Member',
      type: 'boolean',
      description: 'Highlight this team member on the team page',
      initialValue: false
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'expertise',
      title: 'Areas of Expertise',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of technical skills or areas of expertise'
    },
    {
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'number',
      validation: Rule => Rule.min(0).max(50)
    },
    {
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Professional certifications'
    }
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: subtitle,
        media: media
      };
    }
  }
}; 