# OrgIdentityModule Integration Guide

## Files Created

1. **OrgIdentityModule.jsx** (343 lines)
   - React 19 functional component
   - Located: `src/modules/OrgIdentityModule.jsx`
   - Exports: `export default OrgIdentityModule`

2. **OrgIdentityModule.css** (778 lines)
   - Complete styling with responsive design
   - Located: `src/modules/OrgIdentityModule.css`
   - Auto-imported by JSX file

## Component Structure

### State Management
- `expandedDetails` - Controls Entity Details section expansion

### Sections (Top to Bottom)

1. **Entity Identity Hero**
   - Gold-bordered card with glow effect
   - Building2 icon avatar
   - Entity name, ID, status pills
   - Charter NFT badge with sparkle animation

2. **Entity Details** (Collapsible)
   - 5 detail rows with icons
   - Smooth height animation
   - Hover state on rows

3. **Authorized Operators**
   - 5 team member cards
   - Avatar/initials with online/offline status
   - Signer badges with level
   - Permission tags
   - Sorted: online members first

4. **Verified Credentials**
   - 5 credential cards
   - Type-specific icons (File, Landmark, Shield, Lock, Globe)
   - Issued/expiry dates
   - Active/pending_renewal status badges

5. **Entity Verifications**
   - 3 ZKP verification items
   - Green checkmarks
   - Verification dates
   - "ZKP Verified" badges

## Data Dependencies

Import from `src/data/mockData.js`:
```javascript
- ORG_PROFILE      // { name, entityId, multiSigConfig, status }
- ORG_CHARTER      // { entityName, entityId, registrationDate, jurisdiction, charterNft, charterStatus, registeredAgent, annualFiling, type }
- ORG_MEMBERS      // Array of { id, name, role, avatar, initials, signer, signerLevel, status, lastActive, permissions }
- ORG_CREDENTIALS  // Array of { id, name, issuer, issued, expires, status, icon, type }
```

## CSS Variables Used

```css
--gold              /* #D4AF37 - primary accent */
--surface-1         /* primary background */
--surface-2         /* secondary background */
--text-primary      /* main text color */
--text-secondary    /* secondary text */
--text-tertiary     /* tertiary text */
--blue              /* status accent */
--green             /* verification accent */
```

## Animations

- **Module entry**: opacity + x-slide (0.3s)
- **Hero section**: y-slide with fade (0.4s, 0.1s delay)
- **Charter badge**: hover scale (1.05), tap scale (0.98)
- **Member cards**: staggered entrance + hover lift
- **Credential cards**: scale entrance + hover glow
- **Verification items**: x-slide entrance
- **Sparkle icon**: 2s pulse loop

## Responsive Breakpoints

```css
@media (max-width: 768px)   /* Tablet adjustments */
@media (max-width: 600px)   /* Small mobile */
@media (max-width: 400px)   /* Extra small mobile */
```

## Integration Steps

1. Component is already in place at: `src/modules/OrgIdentityModule.jsx`
2. Styles are auto-imported: `src/modules/OrgIdentityModule.css`
3. Mock data already available in: `src/data/mockData.js`
4. Ready to import and use in your layout/routing:

```jsx
import OrgIdentityModule from './modules/OrgIdentityModule';

// Use in your organization mode tab view
<OrgIdentityModule />
```

## Features

✓ Gold-accented dark theme matching FC Wallet design system
✓ Mobile-first responsive design (400px minimum width)
✓ Smooth framer-motion animations throughout
✓ Collapsible sections with smooth transitions
✓ Member sorting (online first)
✓ Dynamic credential icons based on type
✓ Status indicators and badges
✓ Permission displays with overflow handling
✓ All data from centralized mockData.js

## Performance Notes

- Component uses useState for minimal state
- All animations optimized with framer-motion
- CSS Grid for responsive layouts
- No heavy computations
- Proper key usage in map() functions
- Staggered animations prevent janky rendering
