import type { LegalDocument } from "../legal/_comp/legal-page";

/**
 * Copy is reproduced verbatim from the approved Privacy & Policy text. Do not
 * reword, merge or "tidy" clauses — legal wording is approved as written.
 */
export const privacyDocument: LegalDocument = {
  brand: "myklola",
  title: "Privacy & Policy",
  intro:
    "Your data security is our top priority at myklola. We want you to feel safe and comfortable when using our services. Therefore, this Privacy Policy explains in simple and clear terms what information we collect, why we collect it, and how we keep it secure.",
  sections: [
    {
      number: "1",
      title: "Introduction",
      blocks: [
        {
          kind: "paragraph",
          text: 'Welcome to Klola Indonesia ("we," "our," or "us"). We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you use our software application (the "Software").',
        },
      ],
    },
    {
      number: "2",
      title: "Information We Collect",
      blocks: [
        {
          kind: "clause",
          number: "2.1",
          text: "Personal Information: We may collect personal information that you provide directly to us, such as your name, email address, contact information, and any other information you choose to provide.",
        },
        {
          kind: "clause",
          number: "2.2",
          text: "User Data: We may collect and process various types of user data, including but not limited to personal information and employee data. The use and protection of this data are governed by this Privacy Policy.",
        },
        {
          kind: "clause",
          number: "2.3",
          text: "Location Data: We may collect and process geographic location data for purposes such as user attendance tracking and location-based features. You can control the collection of location data through your device settings.",
        },
        {
          kind: "clause",
          number: "2.4",
          text: "Log Data: When you use the Software, we may automatically collect certain information, including but not limited to your device IP address, operating system version, application configuration, usage patterns, and other statistics.",
        },
      ],
    },
    {
      number: "3",
      title: "How We Use Your Information",
      blocks: [
        {
          kind: "clause",
          number: "3.1",
          text: "We may use the information we collect for various purposes, including but not limited to:",
        },
        {
          kind: "list",
          items: [
            "Providing, maintaining, and improving the Software.",
            "Personalizing your experience.",
            "Responding to your requests, comments, or questions.",
            "Sending you important notices, updates, or administrative messages.",
            "Complying with legal obligations.",
            "Protecting our rights, privacy, safety, or property, and/or that of you or others.",
          ],
        },
        {
          kind: "clause",
          number: "3.2",
          text: "We will not use your personal information for purposes other than those outlined in this Privacy Policy without obtaining your explicit consent.",
        },
      ],
    },
    {
      number: "4",
      title: "Sharing Your Information",
      blocks: [
        {
          kind: "clause",
          number: "4.1",
          text: "We may share your personal information with third-party service providers, business partners, or other entities that assist us in delivering the Software, but only to the extent necessary for those purposes.",
        },
        {
          kind: "clause",
          number: "4.2",
          text: "We will not sell, rent, or trade your personal information to third parties for marketing purposes without your explicit consent.",
        },
      ],
    },
    {
      number: "5",
      title: "Security",
      blocks: [
        {
          kind: "paragraph",
          text: "We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no data transmission over the internet or electronic storage method is entirely secure, so we cannot guarantee absolute security.",
        },
      ],
    },
    {
      number: "6",
      title: "Your Choices",
      blocks: [
        {
          kind: "paragraph",
          text: "You may have the following rights regarding your personal information:",
        },
        {
          kind: "list",
          items: [
            "Access: You can request access to the personal information we hold about you.",
            "Correction: You can request corrections to inaccuracies in your personal information.",
            "Deletion: You can request the deletion of your personal information.",
            "Objection: You can object to the processing of your personal information.",
          ],
        },
        {
          kind: "paragraph",
          text: "To exercise these rights, please contact us at helpdesk@klola.id. We will respond to your request within a reasonable timeframe.",
        },
      ],
    },
    {
      number: "7",
      title: "Changes to this Privacy Policy",
      blocks: [
        {
          kind: "paragraph",
          text: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the updated Privacy Policy on our website or within the Software. By continuing to use the Software after such changes, you consent to the updated terms.",
        },
      ],
    },
    {
      number: "8",
      title: "Contact Us",
      blocks: [
        {
          kind: "paragraph",
          text: "If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at helpdesk@klola.id.",
        },
      ],
    },
  ],
};
