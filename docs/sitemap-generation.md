# Sitemap Generation for Carmen Cárdenas Pacheco Artist Portal

This document explains how sitemap generation works for the artist portal website.

## Overview

The sitemap generation system provides both static and dynamic sitemap generation for optimal SEO performance.

## Files Created

### 1. Static Sitemap Generator (`scripts/generate-sitemap.mjs`)

- **Purpose**: Generates a static `sitemap.xml` file in the `static/` directory
- **Usage**: `npm run generate-sitemap`
- **Output**: `static/sitemap.xml`

### 2. Dynamic Sitemap Route (`src/routes/sitemap.xml/+page.server.ts`)

- **Purpose**: Provides real-time sitemap generation at `/sitemap.xml`
- **Features**:
  - Automatically updates when artwork data changes
  - Cached for 1 hour for performance
  - Returns proper XML content type

### 3. Updated `robots.txt`

- **Location**: `static/robots.txt`
- **Addition**: Sitemap reference pointing to the dynamic route

## Generated URLs

The sitemap includes:

### Static Pages

- **Homepage** (`/`) - Priority: 1.0, Change frequency: weekly
- **Contact** (`/contact`) - Priority: 0.8, Change frequency: monthly
- **Online Classes** (`/clases-online`) - Priority: 0.7, Change frequency: monthly

### Dynamic Artwork Pages

- **Individual Artwork Pages** (`/artwork/[id]`) - Priority: 0.6, Change frequency: monthly
- **Total**: 44 artwork pages automatically generated from `artworkData.ts`

## Usage Instructions

### Generate Static Sitemap

```bash
npm run generate-sitemap
```

This will:

1. Read all artwork IDs from `src/lib/data/artworkData.ts`
2. Generate XML sitemap with all static and dynamic routes
3. Save to `static/sitemap.xml`
4. Display summary of generated URLs

### Access Dynamic Sitemap

Visit `https://your-domain.com/sitemap.xml` to see the real-time generated sitemap.

## Configuration

### Update Base URL

To change the base URL, update it in both files:

1. **Static generator**: `scripts/generate-sitemap.mjs` (line 20)
2. **Dynamic route**: `src/routes/sitemap.xml/+page.server.ts` (line 5)

```javascript
const baseUrl = 'https://your-actual-domain.com';
```

### Priority and Change Frequency

You can adjust the priority and change frequency for different page types:

- **Homepage**: Priority 1.0, Weekly updates
- **Contact/Classes**: Priority 0.7-0.8, Monthly updates
- **Artwork Pages**: Priority 0.6, Monthly updates

## SEO Benefits

1. **Search Engine Discovery**: Helps search engines find all pages
2. **Priority Indication**: Tells search engines which pages are most important
3. **Update Frequency**: Guides search engines on how often to crawl pages
4. **Last Modified**: Shows when content was last updated

## Integration with Build Process

The sitemap generation can be integrated into your build process:

```json
{
	"scripts": {
		"build": "npm run generate-sitemap && vite build",
		"preview": "vite preview"
	}
}
```

## Monitoring

- **Static sitemap**: Check `static/sitemap.xml` after running the generator
- **Dynamic sitemap**: Visit `/sitemap.xml` in your browser
- **Search Console**: Submit your sitemap URL to Google Search Console

## Troubleshooting

### Common Issues

1. **Missing artwork pages**: Ensure `artworkData.ts` is properly formatted
2. **Wrong base URL**: Update the `baseUrl` constant in both files
3. **XML validation errors**: Check that all artwork IDs are valid URL slugs

### Validation

You can validate your sitemap using:

- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- Google Search Console
- Online XML validators

## Maintenance

- **Regular updates**: Run `npm run generate-sitemap` when adding new artwork
- **Automatic updates**: The dynamic route updates automatically when artwork data changes
- **Monitoring**: Check search console for crawl errors related to sitemap URLs
