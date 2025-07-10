# Notification Feature Testing Guide

## Overview
The notification system in Admind Briefly allows managers and clients to receive real-time notifications about brief-related activities. This guide will help you test and debug the notification feature.

## What Was Fixed

### 1. Session User ID Mapping Issue
**Problem**: The header component was trying to use `session.user.id` which doesn't exist in NextAuth sessions.

**Solution**: 
- For clients: Use `session.user.clientId` (already available in session)
- For managers: Added `session.user.managerId` to the NextAuth session callback

### 2. NextAuth Configuration Updates
- Added `managerId` lookup for manager users in the JWT callback
- Added `managerId` to the session callback
- Updated managers API to support filtering by email

### 3. Header Component Updates
- Fixed notification fetching logic to use correct user IDs
- Improved error handling and logging

## Current Test Data

Based on the test run, you have:
- **Organization**: Microsoft (ID: 1)
- **Manager**: Natalia Haligowska-Rzepa (ID: 1, Email: natalia.haligowska-rzepa@microsoft.com)
- **Client**: Joanna Trela (ID: 1, Email: joanna.trela@microsoft.com)
- **Test Notifications**: 1 manager notification, 1 client notification

## How to Test

### Step 1: Start the Development Server
```bash
pnpm run dev
```

### Step 2: Test Manager Notifications

1. **Log in as a manager**:
   - Use the manager email: `natalia.haligowska-rzepa@microsoft.com`
   - Or create a new manager user in the database

2. **Check notifications**:
   - Look for the bell icon in the header
   - You should see a notification count badge
   - Click the bell to view notifications

3. **Test API endpoints**:
   ```bash
   # Get manager notifications
   curl "http://localhost:3001/api/notifications?managerId=1"
   
   # Create a new notification
   curl -X POST "http://localhost:3001/api/notifications" \
     -H "Content-Type: application/json" \
     -d '{"managerId": 1, "message": "Test notification", "link": "/admin/briefs/1"}'
   
   # Mark notification as read
   curl -X PATCH "http://localhost:3001/api/notifications" \
     -H "Content-Type: application/json" \
     -d '{"id": 1, "type": "manager"}'
   ```

### Step 3: Test Client Notifications

1. **Log in as a client**:
   - Use the client email: `joanna.trela@microsoft.com`
   - Or create a new client user in the database

2. **Check notifications**:
   - Look for the bell icon in the header
   - You should see a notification count badge
   - Click the bell to view notifications

3. **Test API endpoints**:
   ```bash
   # Get client notifications
   curl "http://localhost:3001/api/notifications?clientId=1"
   
   # Create a new notification
   curl -X POST "http://localhost:3001/api/notifications" \
     -H "Content-Type: application/json" \
     -d '{"clientId": 1, "message": "Test notification", "link": "/client/brief-success?id=1"}'
   
   # Mark notification as read
   curl -X PATCH "http://localhost:3001/api/notifications" \
     -H "Content-Type: application/json" \
     -d '{"id": 1, "type": "client"}'
   ```

### Step 4: Test Brief Creation with Notifications

1. **Create a brief as a client**:
   - Log in as a client
   - Create a new brief
   - Set status to "Sent"
   - This should automatically create notifications for managers

2. **Check manager notifications**:
   - Log in as a manager
   - You should see a notification about the new brief

## Debugging

### Check Session Data
Visit `/api/debug-session` to see the current session data:
```bash
curl "http://localhost:3001/api/debug-session"
```

### Check Database State
Run the test script to see current data:
```bash
node scripts/simple-notification-test.js
```

### Browser Console
Open browser dev tools and check:
1. Network tab for API calls to `/api/notifications`
2. Console for any errors
3. Application tab for session storage

### Common Issues

1. **No notifications showing**:
   - Check if user has correct role (manager/client)
   - Verify user has correct ID in session
   - Check browser console for errors

2. **Notifications not updating**:
   - The header polls every 30 seconds
   - Try refreshing the page
   - Check if notifications are being created in database

3. **Wrong user ID**:
   - Check session data at `/api/debug-session`
   - Verify user exists in database
   - Check NextAuth configuration

## API Reference

### GET /api/notifications
Get notifications for a user.

**Query Parameters**:
- `managerId` (number): Manager ID to get notifications for
- `clientId` (number): Client ID to get notifications for

**Response**:
```json
[
  {
    "id": 1,
    "message": "Test notification",
    "link": "/admin/briefs/1",
    "read": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### POST /api/notifications
Create a new notification.

**Body**:
```json
{
  "managerId": 1,  // or "clientId": 1
  "message": "Notification message",
  "link": "/optional-link"
}
```

### PATCH /api/notifications
Mark a notification as read.

**Body**:
```json
{
  "id": 1,
  "type": "manager"  // or "client"
}
```

## Database Schema

### ManagerNotification
```sql
CREATE TABLE "ManagerNotification" (
    "id" SERIAL PRIMARY KEY,
    "message" TEXT NOT NULL,
    "link" TEXT,
    "read" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "managerId" INTEGER REFERENCES "Manager"("id")
);
```

### ClientNotification
```sql
CREATE TABLE "ClientNotification" (
    "id" SERIAL PRIMARY KEY,
    "message" TEXT NOT NULL,
    "link" TEXT,
    "read" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "clientId" INTEGER REFERENCES "Client"("id")
);
```

## Files Modified

1. `components/layout/header.tsx` - Fixed notification fetching logic
2. `pages/api/auth/[...nextauth].ts` - Added managerId to session
3. `app/api/managers/route.ts` - Added email filtering support
4. `scripts/simple-notification-test.js` - Test script for setup

## Next Steps

1. Test with real users and data
2. Add more notification types (brief updates, comments, etc.)
3. Implement real-time notifications using WebSockets
4. Add email notifications
5. Add notification preferences 