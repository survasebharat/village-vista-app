# Quick Services Configuration Guide

## Overview
This guide explains how to manage Quick Services (Birth Certificate, Death Certificate, Property Tax, RTI Application, etc.) using JSON configuration for the village website.

## Features
- **Multilingual Support**: English, Hindi, and Marathi
- **Detailed Service Information**: Title, Description, Required Documents, Tips, and Button Text
- **Centralized Management**: All services managed through JSON Config Manager
- **Easy Updates**: No code changes needed to add/modify services

## JSON Structure

Each Quick Service contains the following fields:

```json
{
  "id": "unique-service-id",
  "title": "Service Title",
  "description": "Detailed description of the service and its purpose",
  "requiredDocuments": [
    "Document 1",
    "Document 2",
    "Document 3"
  ],
  "tips": [
    "Helpful tip 1",
    "Helpful tip 2"
  ],
  "buttonText": "Apply Now"
}
```

## How to Add/Update Services

### Step 1: Access JSON Config Manager
1. Login as **Admin**
2. Navigate to **Admin Dashboard** → **JSON Configuration Manager** (`/admin/json-config`)

### Step 2: Select Village and Language
1. Select your village from the dropdown
2. Choose the language (English, Hindi, or Marathi)
3. Click **Load Configuration**

### Step 3: Add Quick Services
Add the `quickServices` array to your village configuration JSON:

```json
{
  "village": { ... },
  "panchayat": { ... },
  "quickServices": [
    {
      "id": "birth-certificate",
      "title": "Birth Certificate",
      "description": "Apply for a new birth certificate...",
      "requiredDocuments": [
        "Hospital discharge summary",
        "Parents' Aadhar Card"
      ],
      "tips": [
        "Register within 21 days for free certificate"
      ],
      "buttonText": "Apply Now"
    }
  ],
  ... other sections
}
```

### Step 4: Validate and Save
1. Click **Validate JSON** to check for errors
2. If validation passes, click **Save Configuration**
3. The services will be immediately available on the Contact page

## Pre-configured Examples

Three example files are provided in the project root:

1. **quickservices-config-example.json** - English version with 8 common services
2. **quickservices-config-marathi.json** - Marathi translation
3. **quickservices-config-hindi.json** - Hindi translation

### Services Included:
1. Birth Certificate (जन्म दाखला / जन्म प्रमाण पत्र)
2. Death Certificate (मृत्यू दाखला / मृत्यु प्रमाण पत्र)
3. Property Tax Form (मालमत्ता कर फॉर्म / संपत्ति कर फॉर्म)
4. RTI Application (आरटीआय अर्ज / आरटीआई आवेदन)
5. Gram Sabha Resolution Copy (ग्रामसभा ठराव प्रत / ग्राम सभा संकल्प प्रति)
6. Income Certificate (उत्पन्न प्रमाणपत्र / आय प्रमाण पत्र)
7. Caste Certificate (जात प्रमाणपत्र / जाति प्रमाण पत्र)
8. Residence Certificate (रहिवास प्रमाणपत्र / निवास प्रमाण पत्र)

## Using the Examples

### Option 1: Copy from Examples
1. Open the appropriate example file for your language
2. Copy the entire `quickServices` array
3. Paste it into your village configuration in JSON Config Manager
4. Modify as needed for your village's specific requirements

### Option 2: Customize Individual Services
Edit each service to match your village's specific:
- Document requirements
- Processing times
- Fees
- Office hours
- Special instructions

## Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (kebab-case, e.g., "birth-certificate") |
| `title` | string | Yes | Service name displayed to users |
| `description` | string | Yes | Detailed explanation of the service and its purpose |
| `requiredDocuments` | array | Yes | List of documents needed (each as a string) |
| `tips` | array | Yes | Helpful tips and important information |
| `buttonText` | string | Yes | Text on the action button (e.g., "Apply Now", "Download Form") |

## Best Practices

### Tips Array
- Include processing time information
- Mention any fees or discounts
- Add deadline information
- Include office hours or contact details
- Highlight common mistakes to avoid

### Document List
- Be specific (e.g., "Parents' Aadhar Card (both)" instead of just "Aadhar Card")
- Mention if photocopies are acceptable
- Specify number of copies needed
- Include alternative documents if applicable

### Button Text
Use action-oriented text:
- "Apply Now" for applications
- "Download Form" for downloadable documents
- "Request Copy" for document requests
- "Submit Application" for online submissions

## Multilingual Configuration

### Creating Translations
For each language (en, hi, mr):
1. Create separate JSON configuration
2. Translate all text fields:
   - title
   - description
   - requiredDocuments (each item)
   - tips (each item)
   - buttonText
3. Keep `id` field identical across all languages

### Language Switching
Users can switch languages using the language selector in the header. The system will automatically load the corresponding configuration.

## Display Location

Quick Services appear on the **Contact Us** page (`/contact-us`) in a card below the contact form. Each service shows:
- Service title and brief description
- Action button with custom text
- Click opens a modal with full details

## Troubleshooting

### Services Not Showing
1. Verify `quickServices` array exists in configuration
2. Check JSON syntax is valid
3. Ensure village and language are correctly selected
4. Confirm at least one service has all required fields

### Modal Not Opening
1. Check browser console for errors
2. Verify all services have `requiredDocuments` array
3. Ensure `title` field is present

### Translations Not Working
1. Confirm separate configurations exist for each language
2. Verify language codes are correct (en, hi, mr)
3. Check that same service IDs are used across languages

## Support

For additional help:
1. Check the example JSON files in the project
2. Review the Contact.tsx component implementation
3. Test with a single service first before adding multiple services
4. Validate JSON before saving to avoid syntax errors

## Migration from Old Format

If you have services in the old `documents` format, they will continue to work. However, migrating to the new `quickServices` format provides:
- Better organization
- Enhanced user experience with descriptions
- Multiple tips per service
- Customizable button text

The system supports both formats simultaneously during migration.
