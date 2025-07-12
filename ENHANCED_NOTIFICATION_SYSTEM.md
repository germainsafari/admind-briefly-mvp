# Enhanced Notification System

## Overview

The enhanced notification system in Admind Briefly provides comprehensive notifications for all user actions, including both in-app notifications and email notifications. This system addresses the previous limitations where admins weren't receiving notifications for brief creation and other actions.

## Key Features

### ✅ **Admin Notifications**
- Admins now receive notifications when briefs are created in their organization
- Admins are notified when new managers or clients are added to their organization
- Admins receive notifications for organization-level changes

### ✅ **Manager Notifications**
- Managers receive notifications when briefs are assigned to them
- Managers are notified when new clients are added to their organization
- Managers receive notifications when new managers join their organization

### ✅ **Client Notifications**
- Clients receive notifications when their briefs are sent successfully
- Clients are notified of brief status changes

### ✅ **Email Notifications**
- All notifications can be sent via email in addition to in-app notifications
- Professional HTML email templates
- Configurable email sending methods (Microsoft Graph, service accounts, etc.)

## Architecture

### Core Components

1. **NotificationService** (`lib/notification-service.ts`)
   - Central service for managing all notifications
   - Handles both in-app and email notifications
   - Provides methods for different notification types

2. **EmailNotificationService** (`lib/email-notification-service.ts`)
   - Dedicated service for email notifications
   - Supports multiple email providers
   - Professional HTML email templates

3. **API Integration**
   - All creation APIs now include notification logic
   - Automatic notifications on user actions
   - Configurable notification preferences

## Notification Types

### Brief Creation (`brief_created`)
- **Triggered by**: Client creates and sends a brief
- **Notifies**: 
  - All admins in the organization
  - Assigned managers (existing functionality)
  - The client who created the brief

### Organization Creation (`organization_created`)
- **Triggered by**: Admin creates a new organization
- **Notifies**: System administrators (future enhancement)

### Manager Creation (`manager_created`)
- **Triggered by**: Admin creates a new manager
- **Notifies**: 
  - All admins in the organization
  - Other managers in the organization (excluding the creator)

### Client Creation (`client_created`)
- **Triggered by**: Manager creates a new client
- **Notifies**: 
  - All admins in the organization
  - Other managers in the organization (excluding the creator)

### Brief Assignment (`brief_assigned`)
- **Triggered by**: Brief is assigned to specific managers
- **Notifies**: Assigned managers

## Implementation Details

### NotificationService Methods

```typescript
// Notify all admins in an organization
static async notifyAdmins(organizationId: number, notification: NotificationData)

// Notify all managers in an organization (with exclusion option)
static async notifyManagers(organizationId: number, notification: NotificationData, excludeManagerId?: number)

// Notify a specific manager
static async notifyManager(managerId: number, notification: NotificationData)

// Notify a specific client
static async notifyClient(clientId: number, notification: NotificationData)

// Handle specific events
static async handleBriefCreated(brief: any)
static async handleOrganizationCreated(organization: any, createdByManagerId?: number)
static async handleManagerCreated(manager: any, createdByManagerId?: number)
static async handleClientCreated(client: any, createdByManagerId?: number)
```

### Email Notification Methods

```typescript
// Send email via Microsoft Graph (requires access token)
static async sendEmailViaGraph(accessToken: string, notification: EmailNotificationData)

// Send email via service account (recommended for automated notifications)
static async sendEmailViaServiceAccount(notification: EmailNotificationData)
```

## API Integration

### Brief Creation (`/api/briefs`)
```typescript
// Enhanced notification logic using NotificationService
if (prismaData.status === 'Sent') {
  const { NotificationService } = await import('@/lib/notification-service');
  await NotificationService.handleBriefCreated(brief);
}
```

### Organization Creation (`/api/organizations`)
```typescript
// Send notifications
const { NotificationService } = await import('@/lib/notification-service');
await NotificationService.handleOrganizationCreated(org, creatingManagerId);
```

### Manager Creation (`/api/managers`)
```typescript
// Send notifications
const { NotificationService } = await import('@/lib/notification-service');
await NotificationService.handleManagerCreated(manager, creatingManagerId);
```

### Client Creation (`/api/clients`)
```typescript
// Send notifications
const { NotificationService } = await import('@/lib/notification-service');
await NotificationService.handleClientCreated(client, creatingManagerId);
```

## Email Configuration

### Current Implementation
- Email notifications are logged to console for development
- Ready for production email service integration
- Supports Microsoft Graph and service account methods

### Production Setup Options

#### Option 1: Microsoft Graph Service Account
```typescript
// Configure service account credentials
const serviceAccountToken = await getServiceAccountToken();
await EmailNotificationService.sendEmailViaGraph(serviceAccountToken, emailData);
```

#### Option 2: SendGrid
```typescript
// Add SendGrid integration
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
```

#### Option 3: AWS SES
```typescript
// Add AWS SES integration
import AWS from 'aws-sdk';
const ses = new AWS.SES();
```

#### Option 4: Nodemailer with SMTP
```typescript
// Add SMTP integration
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransporter(smtpConfig);
```

## Testing

### Run Enhanced Notification Tests
```bash
node scripts/test-enhanced-notifications.js
```

This test script will:
1. Create test data (organizations, admins, managers, clients)
2. Test all notification methods
3. Verify notification creation and email logging
4. Show notification counts and recent notifications

### Manual Testing
1. **Test Admin Notifications**:
   - Log in as an admin
   - Create a brief as a client
   - Check admin dashboard for notifications

2. **Test Manager Notifications**:
   - Log in as a manager
   - Create a client
   - Check manager dashboard for notifications

3. **Test Email Notifications**:
   - Check console logs for email notifications
   - Implement actual email service for production

## Database Schema

The notification system uses the existing database schema:

```sql
-- Manager notifications
CREATE TABLE "ManagerNotification" (
    "id" SERIAL PRIMARY KEY,
    "message" TEXT NOT NULL,
    "link" TEXT,
    "read" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "managerId" INTEGER REFERENCES "Manager"("id")
);

-- Client notifications
CREATE TABLE "ClientNotification" (
    "id" SERIAL PRIMARY KEY,
    "message" TEXT NOT NULL,
    "link" TEXT,
    "read" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "clientId" INTEGER REFERENCES "Client"("id")
);
```

## Environment Variables

Add these environment variables for email functionality:

```env
# Email Configuration
EMAIL_PROVIDER=service_account  # or "microsoft_graph"
SENDGRID_API_KEY=your_sendgrid_key
AWS_SES_ACCESS_KEY=your_aws_key
AWS_SES_SECRET_KEY=your_aws_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# Microsoft Graph (for service account)
MICROSOFT_GRAPH_CLIENT_ID=your_client_id
MICROSOFT_GRAPH_CLIENT_SECRET=your_client_secret
MICROSOFT_GRAPH_TENANT_ID=your_tenant_id
```

## Future Enhancements

### 1. Notification Preferences
- Allow users to configure notification preferences
- Email frequency settings (immediate, daily digest, weekly)
- Notification type preferences

### 2. Real-time Notifications
- WebSocket integration for real-time notifications
- Push notifications for mobile devices
- Browser notifications

### 3. Advanced Email Features
- Email templates with branding
- Rich text formatting
- Attachment support
- Email tracking and analytics

### 4. Notification Management
- Bulk notification actions (mark all as read)
- Notification filtering and search
- Notification history and archiving

### 5. Integration with External Services
- Slack notifications
- Microsoft Teams integration
- SMS notifications
- Calendar integration

## Troubleshooting

### Common Issues

1. **Notifications not appearing**:
   - Check user role and organization assignment
   - Verify notification service is properly imported
   - Check console for error messages

2. **Email notifications not sending**:
   - Verify email service configuration
   - Check email provider credentials
   - Review console logs for email errors

3. **Admin notifications missing**:
   - Ensure user has `role: 'admin'` in database
   - Verify organization assignment
   - Check notification service logs

### Debug Commands

```bash
# Test notification system
node scripts/test-enhanced-notifications.js

# Check database state
node scripts/simple-notification-test.js

# Test specific notification types
node scripts/test-notifications.js
```

## Migration Guide

### From Old System
The enhanced notification system is backward compatible. Existing notifications will continue to work, and new notifications will be added automatically.

### Database Changes
No database schema changes are required. The system uses existing notification tables.

### Code Changes
- API endpoints automatically include new notification logic
- Frontend components will show new notifications automatically
- No changes required to existing notification display components

## Support

For issues or questions about the enhanced notification system:

1. Check the troubleshooting section above
2. Review console logs for error messages
3. Run test scripts to verify functionality
4. Check database state and user permissions

## Contributing

When adding new notification types:

1. Add the notification type to the `NotificationData` interface
2. Implement the notification logic in `NotificationService`
3. Add email templates in `EmailNotificationService`
4. Update API endpoints to trigger notifications
5. Add tests to verify functionality 