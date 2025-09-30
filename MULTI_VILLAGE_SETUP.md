# Multi-Village Setup Guide

This application supports multiple villages with domain-based routing. Each village can have its own subdomain or domain, and the application will automatically filter and display the appropriate village data.

## How It Works

The application uses the domain/hostname to determine which village's data to display. For example:
- `shivankhed.yourdomain.com` → Shows Shivankhed village data
- `gudsoor.yourdomain.com` → Shows Gudsoor village data

## Configuration

### 1. Village Configuration File
Located at: `src/config/villageConfig.ts`

```typescript
export const VILLAGES: Record<string, VillageConfig> = {
  shivankhed: {
    id: 'shivankhed',
    name: 'Shivankhed',
    domain: 'shivankhed'
  },
  gudsoor: {
    id: 'gudsoor',
    name: 'Gudsoor',
    domain: 'gudsoor'
  }
};
```

### 2. Adding a New Village

1. **Add village config** in `src/config/villageConfig.ts`:
```typescript
newvillage: {
  id: 'newvillage',
  name: 'New Village Name',
  domain: 'newvillage'
}
```

2. **Add village data** in `src/data/villageData.json`:
   - Each village should have its unique data structure
   - You can extend the JSON to support multiple villages with a structure like:
   ```json
   {
     "villages": {
       "shivankhed": { /* village data */ },
       "gudsoor": { /* village data */ }
     }
   }
   ```

3. **Update translations** in `src/i18n.ts`:
   - Add village-specific translations if needed
   - Update header titles, hero sections, etc.

### 3. Domain Setup

#### For Development:
Edit your `/etc/hosts` file (Linux/Mac) or `C:\Windows\System32\drivers\etc\hosts` (Windows):
```
127.0.0.1 shivankhed.localhost
127.0.0.1 gudsoor.localhost
```

Then access:
- `http://shivankhed.localhost:5173`
- `http://gudsoor.localhost:5173`

#### For Production:
Set up subdomains in your DNS settings:
- Create A records pointing to your server IP:
  - `shivankhed.yourdomain.com`
  - `gudsoor.yourdomain.com`

## Usage in Components

Import and use the village config utility:

```typescript
import { getCurrentVillage, getVillageData } from '@/config/villageConfig';
import villageData from '@/data/villageData.json';

// Get current village
const currentVillage = getCurrentVillage();
console.log(currentVillage.name); // "Shivankhed" or "Gudsoor"

// Filter village data
const filteredData = getVillageData(villageData);
```

## Features

✅ Domain-based village detection
✅ Automatic data filtering
✅ Multi-language support (English, Hindi, Marathi)
✅ AI-generated gallery images
✅ Responsive design
✅ Translatable content throughout

## Notes

- Default village: **Shivankhed** (used when domain doesn't match any configured village)
- The system is extensible - you can add as many villages as needed
- Each village can have its own branding, images, and content while sharing the same codebase
