# OrgServicesModule CSS Classes — Complete List

## Page & Layout

### .os-page
Container for the entire module. Entry animation wrapper.
```css
.os-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
```

## Header

### .os-header
Compact header with title, subtitle, and badge.
```css
.os-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  background: rgba(212, 175, 55, 0.06);
  border-left: 3px solid var(--gold);
  border-radius: 8px;
}
```

### .os-header-title
Large title text.
```css
.os-header-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}
```

### .os-header-subtitle
Secondary text with context.
```css
.os-header-subtitle {
  font-size: 13px;
  color: var(--text-secondary);
}
```

### .os-header-badge
Right-aligned badge with icon.
```css
.os-header-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--gold);
  color: #000;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
}
```

## Sections

### .os-section
Vertical container for grouped content (charter, equity, revenue, credentials).
```css
.os-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
}
```

### .os-label
Section title with optional icon.
```css
.os-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 6px;
}
```

### .os-card
Glass card containing section content (charter, equity, revenue, credentials).
```css
.os-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 16px;
  backdrop-filter: blur(10px);
}
```

## Charter Grid

### .os-grid
2-column grid of key-value pairs in charter.
```css
.os-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}
```

### .os-kv
Single key-value pair.
```css
.os-kv {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.os-kv span {
  font-size: 10px;
  font-weight: 500;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.os-kv strong {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}
```

### .os-mono
Monospace styling for IDs (entity ID, NFT ID).
```css
.os-mono {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 12px;
  color: var(--gold);
  word-break: break-all;
}
```

### .os-status-row
Row containing status badge(s).
```css
.os-status-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}
```

### .os-badge
Status badge with icon and label. Color variants: green (active), yellow (pending), red (expired).
```css
.os-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
}

.os-badge.green {
  background: rgba(16, 185, 129, 0.1);
  color: var(--green);
}

.os-badge.yellow {
  background: rgba(245, 158, 11, 0.1);
  color: #F59E0B;
}

.os-badge.red {
  background: rgba(239, 68, 68, 0.1);
  color: #EF4444;
}
```

## Equity Structure

### .os-bar-track
Horizontal bar showing ownership distribution percentages.
```css
.os-bar-track {
  display: flex;
  height: 24px;
  border-radius: 4px;
  overflow: hidden;
  gap: 2px;
  margin-bottom: 16px;
}
```

### .os-bar-seg
Individual segment in the ownership bar. Uses dynamic color and flex.
```css
.os-bar-seg {
  opacity: 0.85;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.os-bar-seg:hover {
  opacity: 1;
}
```

### .os-eq-row
Single shareholder row in equity table.
```css
.os-eq-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.os-eq-row:last-child {
  border-bottom: none;
}
```

### .os-eq-dot
Colored dot indicator for shareholder. Uses dynamic color.
```css
.os-eq-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}
```

### .os-eq-copy
Shareholder name and role section.
```css
.os-eq-copy {
  flex: 1;
  min-width: 0;
}
```

### .os-eq-name
Shareholder name.
```css
.os-eq-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}
```

### .os-eq-role
Shareholder role and type.
```css
.os-eq-role {
  font-size: 11px;
  color: var(--text-tertiary);
}
```

### .os-eq-right
Percentage and share count (right side).
```css
.os-eq-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}

.os-eq-right strong {
  font-size: 14px;
  font-weight: 700;
}

.os-eq-right span {
  font-size: 10px;
  color: var(--text-tertiary);
}
```

## Revenue & Profit-Sharing

### .os-rev-head
Header of revenue card (period, amount, status).
```css
.os-rev-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.os-rev-head > div:first-child {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
```

### .os-rev-period
Period label (e.g., "Q4 2025").
```css
.os-rev-period {
  font-size: 10px;
  font-weight: 500;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}
```

### .os-rev-amount
Gross revenue amount.
```css
.os-rev-amount {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
}
```

### .os-rev-dist
Container for distribution breakdown rows.
```css
.os-rev-dist {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
```

### .os-dist-row
Single distribution row (recipient, bar, percentage).
```css
.os-dist-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.os-dist-row > span:first-child {
  font-size: 12px;
  color: var(--text-secondary);
  min-width: 80px;
}

.os-dist-row > strong {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
  min-width: 35px;
  text-align: right;
  flex-shrink: 0;
}
```

### .os-dist-bar
Progress bar background.
```css
.os-dist-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  overflow: hidden;
  min-width: 80px;
}
```

### .os-dist-fill
Colored fill inside progress bar. Uses dynamic color (gold, blue, green).
```css
.os-dist-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.2s ease;
}
```

## Enterprise Credentials

### .os-cred-row
Single credential row.
```css
.os-cred-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
}
```

### .os-cred-icon
Credential type icon. Uses dynamic color based on status.
```css
.os-cred-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}
```

### .os-cred-copy
Credential name and metadata section.
```css
.os-cred-copy {
  flex: 1;
  min-width: 0;
}
```

### .os-cred-name
Credential name.
```css
.os-cred-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}
```

### .os-cred-meta
Issuer, issued date, and expiry.
```css
.os-cred-meta {
  font-size: 11px;
  color: var(--text-tertiary);
}
```

### .os-cred-status
Status badge (right side). Uses dynamic color based on status.
```css
.os-cred-status {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 600;
  text-transform: capitalize;
  flex-shrink: 0;
}
```

### .os-divider
Horizontal divider between credentials.
```css
.os-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.04);
  margin: 8px 0;
}
```

---

## Summary of Dynamic Styles

The following use inline `style={{}}` for data-driven values:

1. **os-bar-seg**: `flex`, `background` (color)
2. **os-eq-dot**: `background` (color)
3. **os-dist-fill**: `width` (percentage), `background` (color)
4. **os-cred-icon**: `color` (status color)
5. **os-cred-status**: `color` (status color)
6. **os-eq-right strong**: `color` (shareholder color)

All other styling is handled by CSS classes.
