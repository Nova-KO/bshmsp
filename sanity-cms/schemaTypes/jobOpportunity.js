import {defineType, defineField} from 'sanity'

export const jobOpportunity = defineType({
  name: 'jobOpportunity',
  title: 'Job Opportunities',
  type: 'document',
  icon: () => '💼',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(100),
      description: 'The job title (e.g., "Python Backend Developer")'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      description: 'URL-friendly version of the title'
    }),
    defineField({
      name: 'description',
      title: 'Job Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(50),
      description: 'Brief description of the role and responsibilities'
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(3),
      description: 'List of requirements for the position'
    }),
    defineField({
      name: 'eligibility',
      title: 'Eligibility',
      type: 'string',
      initialValue: 'Third-year students (B.Tech/B.E./MCA/BCA or similar)',
      validation: (rule) => rule.required(),
      description: 'Who is eligible to apply'
    }),
    defineField({
      name: 'skills',
      title: 'Required Skills',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(3),
      description: 'Technical skills required'
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Remote (India)',
      validation: (rule) => rule.required(),
      description: 'Work location'
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      initialValue: '2-6 months',
      validation: (rule) => rule.required(),
      description: 'Duration of the position'
    }),
    defineField({
      name: 'jobType',
      title: 'Job Type',
      type: 'string',
      options: {
        list: [
          {title: 'Internship', value: 'internship'},
          {title: 'Full-time', value: 'fulltime'},
          {title: 'Part-time', value: 'parttime'},
          {title: 'Contract', value: 'contract'}
        ]
      },
      initialValue: 'internship',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'applicationUrl',
      title: 'Application URL',
      type: 'url',
      initialValue: '/internship-application.html',
      validation: (rule) => rule.required(),
      description: 'URL where users can apply'
    }),
    defineField({
      name: 'isActive',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
      description: 'Show this job on the website'
    }),
    defineField({
      name: 'featured',
      title: 'Featured Position',
      type: 'boolean',
      initialValue: false,
      description: 'Highlight this position'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'expiresAt',
      title: 'Expires At',
      type: 'datetime',
      description: 'When this job posting expires (optional)'
    })
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      isActive: 'isActive',
      featured: 'featured'
    },
    prepare({title, subtitle, isActive, featured}) {
      return {
        title: `${title} ${featured ? '⭐' : ''}`,
        subtitle: `${subtitle} ${isActive ? '🟢 Active' : '🔴 Inactive'}`,
        media: () => '💼'
      }
    }
  },

  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    }
  ]
}) 