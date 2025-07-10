# Search Functionality Guide

## Overview

The search functionality in Admind_Briefly provides role-based search capabilities across all dashboards. Each user role has access to search different entities based on their permissions.

## User Roles and Search Access

### Admin Role
- **Can Search**: Organizations, Managers, Clients, Briefs
- **Location**: Admin dashboard and global header search
- **Features**: 
  - Filter by entity type (organizations, managers, clients, briefs)
  - Search across all entities in the system
  - Advanced filtering options

### Manager Role
- **Can Search**: Clients and Briefs (within their organization)
- **Location**: Manager dashboard and global header search
- **Features**:
  - Filter by entity type (clients, briefs)
  - Search only within their organization
  - Access to client and brief management

### Client Role
- **Can Search**: Briefs (only their own)
- **Location**: Client dashboard and global header search
- **Features**:
  - Search only their own briefs
  - Simple search interface
  - Direct access to brief details

## API Endpoint

### Search API
```
GET /api/search?q={query}&type={entity_type}
```

#### Parameters
- `q` (required): Search query string
- `type` (optional): Entity type filter
  - `all`: Search all accessible entities (default)
  - `organizations`: Search organizations only (admin)
  - `managers`: Search managers only (admin)
  - `clients`: Search clients only (admin/manager)
  - `briefs`: Search briefs only (all roles)

#### Response Format
```json
{
  "results": [
    {
      "id": 1,
      "type": "organization|manager|client|brief",
      "displayName": "Entity Name",
      "subtitle": "Additional information",
      "status": "Entity status",
      "avatar": "avatar_url"
    }
  ],
  "total": 10
}
```

## Search Components

### 1. Global Search Component
**File**: `components/ui/search.tsx`
- Used in the header across all pages
- Provides universal search access
- Automatically adapts to user role

### 2. Admin Dashboard Search
**File**: `components/admin/admin-dashboard-search.tsx`
- Advanced search with type filtering
- Filter buttons for different entity types
- Comprehensive search results

### 3. Manager Dashboard Search
**File**: `components/manager/manager-dashboard-search.tsx`
- Focused on clients and briefs
- Organization-scoped search
- Simplified interface

### 4. Client Dashboard Search
**File**: `components/client/client-dashboard-search.tsx`
- Brief-only search
- Minimal interface
- Direct access to brief details

## Search Features

### Real-time Search
- Debounced search (300ms delay)
- Live results as you type
- Minimum 2 characters required

### Visual Feedback
- Loading states during search
- Clear indication of search results
- Type badges for different entities
- Status badges for entity states

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- Focus management
- Click outside to close

### Error Handling
- Graceful error handling
- User-friendly error messages
- Fallback states

## Search Fields

### Organizations
- **Searchable Fields**: Name
- **Display**: Organization name with manager/client/brief counts

### Managers
- **Searchable Fields**: Name, Email, Title
- **Display**: Manager name with title and organization

### Clients
- **Searchable Fields**: Name, Email, Title
- **Display**: Client name with title and organization

### Briefs
- **Searchable Fields**: Project name, Project description, Business goals
- **Display**: Project name with client, organization, and status

## Implementation Details

### Database Queries
- Uses Prisma ORM for database queries
- Case-insensitive search with `mode: 'insensitive'`
- Optimized queries with proper indexing
- Role-based filtering at database level

### Security
- Session-based authentication required
- Role-based access control
- Organization-scoped queries for managers
- Client-scoped queries for clients

### Performance
- Debounced API calls
- Limited results (10 per type)
- Efficient database queries
- Client-side caching

## Usage Examples

### Basic Search
```javascript
// Search for all entities
const response = await fetch('/api/search?q=marketing');
const data = await response.json();
```

### Type-Specific Search
```javascript
// Search only briefs
const response = await fetch('/api/search?q=website&type=briefs');
const data = await response.json();
```

### Component Usage
```jsx
import { SearchComponent } from '@/components/ui/search';

<SearchComponent 
  placeholder="Search..." 
  onResultClick={(result) => {
    // Handle result click
    console.log(result);
  }}
/>
```

## Testing

### Manual Testing
1. Navigate to any dashboard
2. Use the search bar in the header or dashboard
3. Test different search queries
4. Verify role-based access restrictions
5. Test filtering options (admin only)

### Automated Testing
Run the test script:
```bash
node scripts/test-search.js
```

## Troubleshooting

### Common Issues
1. **No results**: Check user role and permissions
2. **Search not working**: Verify API endpoint is accessible
3. **Slow search**: Check database indexing
4. **Permission errors**: Verify user session and role

### Debug Steps
1. Check browser console for errors
2. Verify API response in Network tab
3. Check user session data
4. Verify database connectivity

## Future Enhancements

### Planned Features
- Full-text search with Elasticsearch
- Search result highlighting
- Advanced filters (date ranges, status)
- Search history
- Saved searches
- Export search results

### Performance Improvements
- Server-side pagination
- Search result caching
- Database query optimization
- CDN integration for static assets 