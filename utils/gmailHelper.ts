import { authenticate } from '@google-cloud/local-auth';
import { google, Auth } from 'googleapis';
import { promises as fs } from 'fs';
import path from 'path';
import process from 'process';
import console from 'console';

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = path.join(process.cwd(), 'utils/token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'utils/credentials.json');

class GmailHelper {
  private static async loadCredentials(): Promise<Auth.OAuth2Client | null> {
    let content = '';
    try {
      content = await fs.readFile(TOKEN_PATH, 'utf-8');
      const credentials = JSON.parse(content);
      return google.auth.fromJSON(credentials) as Auth.OAuth2Client;
    } catch (e) {
      console.log(`Exception while loading token env: [${content}]`);
      console.log(`Exception while loading token: ${e}`);
      return null;
    }
  }

  private static async saveCredentials(client: Auth.OAuth2Client): Promise<void> {
    const content = await fs.readFile(CREDENTIALS_PATH, 'utf-8');
    const { client_id, client_secret } = JSON.parse(content).installed || {};
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id,
      client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
  }

  public static async authorize(): Promise<Auth.OAuth2Client> {
    let client = await GmailHelper.loadCredentials();
    if (!client) {
      console.log(
        `Has no credential. Process an authenticate with credential file path: ${CREDENTIALS_PATH}`,
      );
      client = (await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
      })) as unknown as Auth.OAuth2Client;
      if (client.credentials) {
        await GmailHelper.saveCredentials(client);
      }
    }
    return client;
  }

  /** Fetch the latest email for a given recipient */
  static async getLatestEmail(auth: Auth.OAuth2Client, toAddress: string): Promise<string | null> {
    const gmail = google.gmail({ version: 'v1', auth });

    const res = await gmail.users.messages.list({
      userId: 'me',
      q: `to:${toAddress}`,
      maxResults: 5,
    });

    if (!res.data.messages || res.data.messages.length === 0) return null;

    const messageId = res.data.messages[0].id!;
    const msg = await gmail.users.messages.get({
      userId: 'me',
      id: messageId,
    });

    const payload = msg.data.payload;
    let body = '';

    if (payload?.parts?.length) {
      // Try to get HTML body first
      const htmlPart = payload.parts.find((p) => p.mimeType === 'text/html');
      if (htmlPart?.body?.data) {
        body = Buffer.from(htmlPart.body.data, 'base64').toString('utf-8');
        return body;
      }

      // Fallback: text/plain
      const textPart = payload.parts.find((p) => p.mimeType === 'text/plain');
      if (textPart?.body?.data) {
        body = Buffer.from(textPart.body.data, 'base64').toString('utf-8');
        return body;
      }
    }

    // If body is directly available
    if (payload?.body?.data) {
      body = Buffer.from(payload.body.data, 'base64').toString('utf-8');
    }

    return body;
  }

  /** Wait for latest email — polls until an email arrives */
  static async waitForLatestEmail(
    auth: Auth.OAuth2Client,
    toAddress: string,
    timeoutMs: number = 30000,
    intervalMs: number = 3000,
  ): Promise<string | null> {
    const start = Date.now();

    while (Date.now() - start < timeoutMs) {
      const email = await this.getLatestEmail(auth, toAddress);
      if (email) return email;

      await new Promise((res) => setTimeout(res, intervalMs));
    }

    return null;
  }

  /** Extract 6-digit OTP */
  static extractOtp(emailBody: string): string | null {
    const spanMatches = emailBody.match(/<span[^>]*>(.*?)<\/span>/g);
    if (!spanMatches) return null;

    for (const span of spanMatches) {
      const inside = span.replace(/<[^>]+>/g, '').trim(); // strip tags
      const otpMatch = inside.match(/\b\d{6}\b/);
      if (otpMatch) return otpMatch[0];
    }

    return null;
  }

  /** Full pipeline: fetch latest email and extract OTP */
  static async getOtp(auth: Auth.OAuth2Client, toAddress: string): Promise<string | null> {
    const emailBody = await this.getLatestEmail(auth, toAddress);
    if (!emailBody) return null;
    return this.extractOtp(emailBody);
  }
}

export default GmailHelper;
