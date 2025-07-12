import { prisma } from './prisma';
import { EmailNotificationService, EmailNotificationData } from './email-notification-service';

export interface NotificationData {
  message: string;
  link?: string;
  type: 'brief_created' | 'organization_created' | 'manager_created' | 'client_created' | 'brief_assigned';
  metadata?: Record<string, any>;
}

export class NotificationService {
  /**
   * Send notifications to admins in an organization
   */
  static async notifyAdmins(organizationId: number, notification: NotificationData) {
    try {
      // Find all admins in the organization
      const admins = await prisma.manager.findMany({
        where: {
          organization_id: organizationId,
          role: 'admin',
          status: 'active'
        }
      });

      // Create in-app notifications
      await Promise.all(
        admins.map(admin =>
          prisma.managerNotification.create({
            data: {
              managerId: admin.id,
              message: notification.message,
              link: notification.link,
            }
          })
        )
      );

      // Send email notifications if email is available
      await Promise.all(
        admins
          .filter(admin => admin.email)
          .map(admin => this.sendEmailNotification(admin.email!, notification))
      );

      console.log(`✅ Notified ${admins.length} admins for ${notification.type}`);
    } catch (error) {
      console.error('❌ Error notifying admins:', error);
    }
  }

  /**
   * Send notifications to managers in an organization
   */
  static async notifyManagers(organizationId: number, notification: NotificationData, excludeManagerId?: number) {
    try {
      // Find all managers in the organization
      const managers = await prisma.manager.findMany({
        where: {
          organization_id: organizationId,
          status: 'active',
          ...(excludeManagerId && { id: { not: excludeManagerId } })
        }
      });

      // Create in-app notifications
      await Promise.all(
        managers.map(manager =>
          prisma.managerNotification.create({
            data: {
              managerId: manager.id,
              message: notification.message,
              link: notification.link,
            }
          })
        )
      );

      // Send email notifications if email is available
      await Promise.all(
        managers
          .filter(manager => manager.email)
          .map(manager => this.sendEmailNotification(manager.email!, notification))
      );

      console.log(`✅ Notified ${managers.length} managers for ${notification.type}`);
    } catch (error) {
      console.error('❌ Error notifying managers:', error);
    }
  }

  /**
   * Send notification to a specific manager
   */
  static async notifyManager(managerId: number, notification: NotificationData) {
    try {
      const manager = await prisma.manager.findUnique({
        where: { id: managerId }
      });

      if (!manager) {
        console.error(`❌ Manager not found: ${managerId}`);
        return;
      }

      // Create in-app notification
      await prisma.managerNotification.create({
        data: {
          managerId: manager.id,
          message: notification.message,
          link: notification.link,
        }
      });

      // Send email notification if email is available
      if (manager.email) {
        await this.sendEmailNotification(manager.email, notification);
      }

      console.log(`✅ Notified manager ${manager.name} for ${notification.type}`);
    } catch (error) {
      console.error('❌ Error notifying manager:', error);
    }
  }

  /**
   * Send notification to a specific client
   */
  static async notifyClient(clientId: number, notification: NotificationData) {
    try {
      const client = await prisma.client.findUnique({
        where: { id: clientId }
      });

      if (!client) {
        console.error(`❌ Client not found: ${clientId}`);
        return;
      }

      // Create in-app notification
      await prisma.clientNotification.create({
        data: {
          clientId: client.id,
          message: notification.message,
          link: notification.link,
        }
      });

      // Send email notification if email is available
      if (client.email) {
        await this.sendEmailNotification(client.email, notification);
      }

      console.log(`✅ Notified client ${client.name} for ${notification.type}`);
    } catch (error) {
      console.error('❌ Error notifying client:', error);
    }
  }

  /**
   * Send email notification using EmailNotificationService
   */
  private static async sendEmailNotification(email: string, notification: NotificationData) {
    try {
      const emailData: EmailNotificationData = {
        to: email,
        subject: EmailNotificationService.getEmailSubject(notification.type),
        message: notification.message,
        link: notification.link,
        type: notification.type
      };

      // Use service account email sending (recommended for automated notifications)
      await EmailNotificationService.sendEmailViaServiceAccount(emailData);
    } catch (error) {
      console.error('❌ Error sending email notification:', error);
    }
  }



  /**
   * Handle brief creation notifications
   */
  static async handleBriefCreated(brief: any) {
    const notification: NotificationData = {
      message: `A new brief "${brief.project_name}" has been created in your organization.`,
      link: `/admin/briefs/${brief.id}`,
      type: 'brief_created',
      metadata: { briefId: brief.id, projectName: brief.project_name }
    };

    // Notify admins in the organization
    await this.notifyAdmins(brief.organization_id, notification);

    // Notify assigned managers (existing logic)
    if (Array.isArray(brief.managers) && brief.managers.length > 0) {
      await Promise.all(
        brief.managers.map((manager: any) =>
          this.notifyManager(manager.id, {
            ...notification,
            message: `A new brief "${brief.project_name}" has been assigned to you!`,
            type: 'brief_assigned'
          })
        )
      );
    }

    // Notify the client
    if (brief.client_id) {
      await this.notifyClient(brief.client_id, {
        message: `Your brief "${brief.project_name}" was sent successfully!`,
        link: `/client/brief-success?id=${brief.id}`,
        type: 'brief_created'
      });
    }
  }

  /**
   * Handle organization creation notifications
   */
  static async handleOrganizationCreated(organization: any, createdByManagerId?: number) {
    const notification: NotificationData = {
      message: `A new organization "${organization.name}" has been created.`,
      link: `/admin/organizations/${organization.id}`,
      type: 'organization_created',
      metadata: { organizationId: organization.id, organizationName: organization.name }
    };

    // Notify all admins (if any exist)
    // Note: For new organizations, there might not be any admins yet
    // This could be handled by notifying a global admin or system admin
    console.log(`📢 Organization "${organization.name}" created`);
  }

  /**
   * Handle manager creation notifications
   */
  static async handleManagerCreated(manager: any, createdByManagerId?: number) {
    const notification: NotificationData = {
      message: `A new manager "${manager.name}" has been added to your organization.`,
      link: `/admin/managers/${manager.id}`,
      type: 'manager_created',
      metadata: { managerId: manager.id, managerName: manager.name }
    };

    // Notify admins in the organization
    if (manager.organization_id) {
      await this.notifyAdmins(manager.organization_id, notification);
    }

    // Notify other managers in the organization (excluding the creator)
    if (manager.organization_id) {
      await this.notifyManagers(manager.organization_id, notification, createdByManagerId);
    }
  }

  /**
   * Handle client creation notifications
   */
  static async handleClientCreated(client: any, createdByManagerId?: number) {
    const notification: NotificationData = {
      message: `A new client "${client.name}" has been added to your organization.`,
      link: `/admin/clients/${client.id}`,
      type: 'client_created',
      metadata: { clientId: client.id, clientName: client.name }
    };

    // Notify admins in the organization
    if (client.organization_id) {
      await this.notifyAdmins(client.organization_id, notification);
    }

    // Notify managers in the organization (excluding the creator)
    if (client.organization_id) {
      await this.notifyManagers(client.organization_id, notification, createdByManagerId);
    }
  }
} 