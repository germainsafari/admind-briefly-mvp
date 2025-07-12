import { sendUserEmail } from './msGraphClient';

export interface EmailNotificationData {
  to: string;
  subject: string;
  message: string;
  link?: string;
  type: 'brief_created' | 'organization_created' | 'manager_created' | 'client_created' | 'brief_assigned';
}

export class EmailNotificationService {
  /**
   * Send email notification using Microsoft Graph
   * This requires a valid access token from an authenticated user
   */
  static async sendEmailViaGraph(accessToken: string, notification: EmailNotificationData) {
    try {
      const htmlBody = this.generateEmailHTML(notification);
      await sendUserEmail(accessToken, notification.to, notification.subject, htmlBody);
      console.log(`✅ Email sent to ${notification.to}: ${notification.subject}`);
    } catch (error) {
      console.error('❌ Error sending email via Graph:', error);
      throw error;
    }
  }

  /**
   * Send email notification using a service account
   * This would use a dedicated service account with email sending permissions
   */
  static async sendEmailViaServiceAccount(notification: EmailNotificationData) {
    try {
      // TODO: Implement service account email sending
      // This could use:
      // - Microsoft Graph with a service account
      // - SendGrid
      // - AWS SES
      // - Nodemailer with SMTP
      
      console.log(`📧 Would send email via service account to ${notification.to}:`, {
        subject: notification.subject,
        message: notification.message,
        link: notification.link
      });

      // For now, just log the email that would be sent
      // In production, you'd implement the actual email sending here
    } catch (error) {
      console.error('❌ Error sending email via service account:', error);
      throw error;
    }
  }

  /**
   * Generate HTML email body
   */
  private static generateEmailHTML(notification: EmailNotificationData): string {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const fullLink = notification.link ? `${baseUrl}${notification.link}` : '';
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${notification.subject}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .content { padding: 20px; }
            .button { display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; color: #333;">Admind Briefly</h1>
            </div>
            
            <div class="content">
              <h2>${notification.subject}</h2>
              <p>${notification.message}</p>
              
              ${fullLink ? `
                <a href="${fullLink}" class="button">View Details</a>
              ` : ''}
            </div>
            
            <div class="footer">
              <p>This is an automated notification from Admind Briefly.</p>
              <p>If you have any questions, please contact your administrator.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  /**
   * Get email subject based on notification type
   */
  static getEmailSubject(type: EmailNotificationData['type']): string {
    switch (type) {
      case 'brief_created':
        return 'New Brief Created - Admind Briefly';
      case 'organization_created':
        return 'New Organization Created - Admind Briefly';
      case 'manager_created':
        return 'New Manager Added - Admind Briefly';
      case 'client_created':
        return 'New Client Added - Admind Briefly';
      case 'brief_assigned':
        return 'Brief Assigned to You - Admind Briefly';
      default:
        return 'New Notification - Admind Briefly';
    }
  }

  /**
   * Get email message based on notification type and data
   */
  static getEmailMessage(type: EmailNotificationData['type'], data: any): string {
    switch (type) {
      case 'brief_created':
        return `A new brief "${data.projectName}" has been created in your organization.`;
      case 'organization_created':
        return `A new organization "${data.organizationName}" has been created.`;
      case 'manager_created':
        return `A new manager "${data.managerName}" has been added to your organization.`;
      case 'client_created':
        return `A new client "${data.clientName}" has been added to your organization.`;
      case 'brief_assigned':
        return `A new brief "${data.projectName}" has been assigned to you!`;
      default:
        return 'You have a new notification from Admind Briefly.';
    }
  }
} 