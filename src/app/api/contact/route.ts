import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // 1. Validate inputs
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_RECEIVER_EMAIL;

    // 2. Configuration checks
    if (!apiKey) {
      console.error("RESEND_API_KEY environment variable is missing.");
      return NextResponse.json(
        { error: "Email service is not configured (RESEND_API_KEY is missing)." },
        { status: 500 }
      );
    }

    if (!toEmail) {
      console.error("CONTACT_RECEIVER_EMAIL environment variable is missing.");
      return NextResponse.json(
        { error: "Receiver email configuration is missing (CONTACT_RECEIVER_EMAIL is missing)." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // 3. Send email via Resend API
    // Note: If you haven't verified a domain in Resend, you must send FROM 'onboarding@resend.dev'
    // and TO the email address you registered your Resend account with.
    const response = await resend.emails.send({
      from: "Kyro Studio Contact <onboarding@resend.dev>",
      to: toEmail,
      subject: `New Client Inquiry from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; border: 1px solid #f1f5f9; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <div style="margin-bottom: 24px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px;">
            <h2 style="color: #7c3aed; margin: 0; font-size: 20px; font-weight: 700; tracking-tight: -0.025em;">
              New Contact Inquiry
            </h2>
            <p style="color: #64748b; font-size: 14px; margin: 4px 0 0 0;">
              Submitted from your Kyro Studio portfolio contact form.
            </p>
          </div>

          <!-- Client Info -->
          <div style="margin-bottom: 24px; background-color: #f8fafc; border-radius: 8px; padding: 16px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #475569; width: 100px;">Name:</td>
                <td style="padding: 4px 0; font-size: 14px; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #475569;">Email:</td>
                <td style="padding: 4px 0; font-size: 14px; color: #0f172a;">
                  <a href="mailto:${email}" style="color: #7c3aed; text-decoration: none; font-weight: 500;">${email}</a>
                </td>
              </tr>
            </table>
          </div>

          <!-- Message Body -->
          <div style="margin-bottom: 24px;">
            <h4 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">
              Client Message
            </h4>
            <div style="border-left: 3px solid #e2e8f0; padding-left: 16px; margin: 0; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>

          <!-- Footer -->
          <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; text-align: center;">
            <p style="color: #94a3b8; font-size: 11px; margin: 0; font-family: monospace;">
              SYSTEM TRIGGERED AUTOMATION • RESEND API
            </p>
          </div>
        </div>
      `,
    });

    if (response.error) {
      console.error("Resend API error:", response.error);
      return NextResponse.json(
        { error: response.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: response.data?.id });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Contact API Exception:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
