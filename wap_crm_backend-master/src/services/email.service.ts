import { Resend } from 'resend';
import logger from '../utils/logger';

// Create a Resend instance using the API key from environment variables
const resendApiKey = process.env.RESEND_API_KEY || 're_test123';
const resend = new Resend(resendApiKey);

// A realistic default from email
const defaultFromEmail = process.env.FROM_EMAIL || 'onboarding@noreply.greenpilot.in';

export class EmailService {
  /**
   * Send a welcome email after successful onboarding
   */
  static async sendWelcomeEmail(email: string, name: string) {
    try {
      const data = await resend.emails.send({
        from: defaultFromEmail,
        to: [email],
        subject: 'Welcome to WAP CRM!',
        html: `
          <h1>Welcome ${name}!</h1>
          <p>We are thrilled to have you on board.</p>
          <p>Your CRM is now ready to use. Get started by uploading your first batch of leads and engaging with them on WhatsApp.</p>
          <br/>
          <p>Best regards,<br/>The WAP CRM Team</p>
        `,
      });

      logger.info(`Welcome email sent to ${email} (ID: ${data.data?.id})`);
      return data;
    } catch (error) {
      logger.error(`Error sending welcome email to ${email}: ${error}`);
      // Don't throw so it doesn't block the main flow
    }
  }

  /**
   * Send an email receipt after successful payment
   */
  static async sendPaymentSuccessEmail(email: string, name: string, amount: number) {
    try {
      const data = await resend.emails.send({
        from: defaultFromEmail,
        to: [email],
        subject: 'Payment Successful - WAP CRM',
        html: `
          <h1>Payment Successful</h1>
          <p>Hi ${name},</p>
          <p>We have successfully received your onboarding payment of ₹${amount}.</p>
          <p>Your account is now fully active.</p>
          <br/>
          <p>Best regards,<br/>The WAP CRM Team</p>
        `,
      });

      logger.info(`Payment success email sent to ${email} (ID: ${data.data?.id})`);
      return data;
    } catch (error) {
      logger.error(`Error sending payment email to ${email}: ${error}`);
    }
  }
}
