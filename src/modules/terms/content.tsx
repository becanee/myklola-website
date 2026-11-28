import type { LegalDocument } from "../legal/_comp/legal-page";

/**
 * Copy is reproduced verbatim from the approved Terms of Service text. Do not
 * reword, merge or "tidy" clauses — legal wording is approved as written.
 */
export const termsDocument: LegalDocument = {
  brand: "myklola",
  title: "Terms of Service",
  intro:
    "Welcome to myklola HRMS operated by Klola Indonesia. By registering for or using our software platform and related services you agree to comply with these Terms of Service and our Privacy Policy. If you accept these terms on behalf of a company or organization you confirm that you have the legal authority to bind that entity. Klola Indonesia may revise these Terms of Service periodically and your continued use of the platform after updates are posted constitutes acceptance of the revised terms.",
  sections: [
    {
      number: "1",
      title: "Key Definitions",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Account",
              text: "means a registered user profile that enables authorized personnel to access myklola HRMS according to assigned system roles.",
            },
            {
              term: "Active Period",
              text: "means the paid subscription duration during which the Customer may access and use the Platform.",
            },
            {
              term: "Confidential Information",
              text: "means any nonpublic business technical or operational information shared by one Party with the other Party in connection with these Terms of Service.",
            },
            {
              term: "Customer",
              text: "means the company or business organization that subscribes to and uses the Platform.",
            },
            {
              term: "Force Majeure",
              text: "means any event beyond reasonable control such as natural disasters epidemics wars civil unrest strikes utility disruptions or changes in government regulations that prevents a Party from fulfilling its obligations.",
            },
            {
              term: "Grace Period",
              text: "means the period of 30 calendar days immediately following the end of an Active Period.",
            },
            {
              term: "Klola ID",
              text: "means the unique company identification code assigned to the Customer organization within the Platform.",
            },
            {
              term: "Personal Data",
              text: "means any information relating to an identified or identifiable individual including employee records and attendance location coordinates.",
            },
            {
              term: "Platform",
              text: "means the cloud based human resource management and employee self service application known as myklola HRMS.",
            },
            {
              term: "Subscription Agreement",
              text: "means the separate quotation order form or commercial agreement signed by the Parties specifying selected modules employee capacity and fees.",
            },
          ],
        },
      ],
    },
    {
      number: "2",
      title: "Scope of Services",
      blocks: [
        {
          kind: "paragraph",
          text: "Klola Indonesia provides access to the Platform as a cloud based Human Resource Management System and Employee Self Service application in accordance with the Customer Subscription Agreement. Core capabilities include workforce analytics dashboards employee lifecycle and onboarding management attendance tracking with location geofencing leave and overtime administration expense reimbursement business travel contract monitoring organizational approval hierarchies and candidate synchronization with the external recruitment portal at recplus.klola.app.",
        },
        {
          kind: "paragraph",
          text: "Klola Indonesia acts strictly as a software technology provider. Klola Indonesia does not manage internal company policies payroll disbursement decisions or employment relations between the Customer and its personnel.",
        },
        {
          kind: "paragraph",
          text: "Klola Indonesia may refine or enhance Platform features from time to time to maintain operational security and service quality.",
        },
      ],
    },
    {
      number: "3",
      title: "Accounts Access and Subscription Period",
      blocks: [
        {
          kind: "paragraph",
          text: "Klola Indonesia provisions the Customer organization profile under a unique Klola ID and the Customer designated administrators manage user accounts and access permissions across Administrator Manager and Employee roles.",
        },
        {
          kind: "paragraph",
          text: "The Customer is responsible for protecting login credentials and for all activities performed through its registered accounts. The Customer must notify Klola Indonesia promptly at helpdesk@klola.id upon discovering any unauthorized access.",
        },
        {
          kind: "paragraph",
          text: "Subscription fees are determined by the employee capacity limit stated in the Subscription Agreement and are calculated based on active employee records during each monthly cycle. Adding employees beyond the agreed limit or upgrading modules requires prior notice and payment of the applicable fee difference.",
        },
        {
          kind: "paragraph",
          text: "Initial system setup and administrator onboarding are delivered according to the Subscription Agreement while extra configuration or training sessions may incur additional charges.",
        },
        {
          kind: "paragraph",
          text: "To renew or extend an Active Period the Customer should submit written notice at least 30 calendar days before the current Active Period expires.",
        },
      ],
    },
    {
      number: "4",
      title: "Fees and Payment",
      blocks: [
        {
          kind: "paragraph",
          text: "Pricing billing schedules and payment terms are governed by the applicable Subscription Agreement. If any conflict arises between these Terms of Service and the Subscription Agreement the commercial provisions in the Subscription Agreement prevail.",
        },
        {
          kind: "paragraph",
          text: "All commercial transactions invoicing and fee settlements take place exclusively outside the Platform in accordance with the agreed contract or Subscription Agreement. The Platform functions strictly as an operational human resource management application and does not provide direct in app purchasing checkout or payment processing functionality.",
        },
        {
          kind: "paragraph",
          text: "Each Party is responsible for its own taxes arising under these Terms of Service in accordance with prevailing Indonesian tax regulations.",
        },
        {
          kind: "paragraph",
          text: "Klola Indonesia may temporarily suspend access to the Platform if the Customer fails to settle overdue invoices on time and will restore access once full payment is received.",
        },
      ],
    },
    {
      number: "5",
      title: "Service Availability",
      blocks: [
        {
          kind: "paragraph",
          text: "Klola Indonesia strives to keep the Platform accessible and reliable throughout the Active Period under its standard Service Level Agreement. While reasonable technical measures are applied to support smooth daily operations uninterrupted or error free availability cannot be guaranteed at all times.",
        },
        {
          kind: "paragraph",
          text: "Temporary service interruptions may occur during scheduled maintenance system upgrades or external network disruptions. Klola Indonesia aims to notify Customers in advance before performing planned maintenance whenever reasonably practicable.",
        },
        {
          kind: "paragraph",
          text: "Technical support is available during standard operational hours from Monday through Friday between 09:00 and 18:00 WIB excluding Indonesian national holidays. Support inquiries sent to helpdesk@klola.id are reviewed and prioritized according to issue severity under the applicable Service Level Agreement.",
        },
        {
          kind: "paragraph",
          text: "Any custom uptime targets or enterprise service remedies apply only if expressly agreed upon in a separate Subscription Agreement.",
        },
      ],
    },
    {
      number: "6",
      title: "Customer Responsibilities and Acceptable Use",
      blocks: [
        {
          kind: "paragraph",
          text: "The Customer confirms that it holds all required business licenses and corporate authority to enter into these Terms of Service and that its use of the Platform complies with applicable Indonesian laws including anti corruption and anti money laundering regulations.",
        },
        {
          kind: "paragraph",
          text: "The Customer is solely responsible for the accuracy legality and completeness of all data uploaded into the Platform including bulk employee attendance and overtime files imported through official system Excel templates.",
        },
        {
          kind: "paragraph",
          text: "The Customer and its personnel must not:",
        },
        {
          kind: "list",
          items: [
            "Rent lease sublicense or distribute access to the Platform to any unauthorized third party.",
            "Copy alter decompile disassemble or reverse engineer any software component of the Platform.",
            "Disrupt interfere with or attempt unauthorized access to the servers networks or security controls of the Platform.",
            "Upload unlawful fraudulent or harmful files into the Platform.",
          ],
        },
      ],
    },
    {
      number: "7",
      title: "Personal Data Protection and Privacy",
      blocks: [
        {
          kind: "paragraph",
          text: "Klola Indonesia collects processes and safeguards Personal Data in accordance with the myklola Privacy Policy and Indonesian personal data protection laws.",
        },
        {
          kind: "paragraph",
          text: "The Customer warrants that it has obtained all legally required notices and consents from its employees before submitting their Personal Data including geographic location data for attendance tracking into the Platform.",
        },
        {
          kind: "paragraph",
          text: "Klola Indonesia applies reasonable technical and organizational safeguards to protect Personal Data against unauthorized access disclosure or alteration. Klola Indonesia does not sell rent or trade Personal Data to third parties for marketing purposes without explicit consent.",
        },
        {
          kind: "paragraph",
          text: "Individuals may request access correction or deletion of their Personal Data by contacting helpdesk@klola.id.",
        },
      ],
    },
    {
      number: "8",
      title: "Confidentiality",
      blocks: [
        {
          kind: "paragraph",
          text: "Each Party receiving Confidential Information must protect it from unauthorized disclosure and use it solely to fulfill obligations under these Terms of Service.",
        },
        {
          kind: "paragraph",
          text: "Confidentiality duties do not cover information that becomes publicly known without breach was already lawfully held prior to disclosure is independently developed or must be disclosed under applicable law or court order.",
        },
        {
          kind: "paragraph",
          text: "These confidentiality obligations remain in effect even after these Terms of Service expire or terminate.",
        },
      ],
    },
    {
      number: "9",
      title: "Intellectual Property Rights",
      blocks: [
        {
          kind: "paragraph",
          text: "All intellectual property rights in the Platform including source code interface designs databases documentation and trademarks belong exclusively to Klola Indonesia.",
        },
        {
          kind: "paragraph",
          text: "Klola Indonesia grants the Customer a limited nonexclusive and nontransferable license to use the Platform strictly for internal human resource operations during the Active Period.",
        },
        {
          kind: "paragraph",
          text: "The Customer retains full ownership of all company records and employee data submitted to the Platform.",
        },
        {
          kind: "paragraph",
          text: "Unless otherwise agreed in writing Klola Indonesia may reasonably display the Customer company name and logo in customer directories and marketing materials in good faith.",
        },
      ],
    },
    {
      number: "10",
      title: "Disclaimers and Limitation of Liability",
      blocks: [
        {
          kind: "paragraph",
          text: "Except as expressly stated in these Terms of Service the Platform is provided on an as is and as available basis without express or implied warranties of any kind.",
        },
        {
          kind: "paragraph",
          text: "If the Customer incurs a proven direct financial loss caused solely by Klola Indonesia negligence or operational error during an Active Period the Customer may submit a written claim within 30 calendar days after the loss occurs or becomes known.",
        },
        {
          kind: "paragraph",
          text: "Total cumulative liability of Klola Indonesia for all claims under these Terms of Service will not exceed the subscription fees actually paid by the Customer for the affected module during the current Active Period up to a maximum of 12 months.",
        },
        {
          kind: "paragraph",
          text: "To the fullest extent permitted by law Klola Indonesia is not liable for indirect incidental or consequential damages including lost profits business interruption or data inaccuracies caused by Customer input.",
        },
      ],
    },
    {
      number: "11",
      title: "Force Majeure",
      blocks: [
        {
          kind: "paragraph",
          text: "Neither Party is liable for failure or delay in performing obligations caused by a Force Majeure event.",
        },
        {
          kind: "paragraph",
          text: "An affected Party must notify the other Party in writing within 5 business days of the Force Majeure event and take reasonable steps to resume performance. If a Force Majeure event continues for more than 30 calendar days either Party may request to modify or terminate the affected services by mutual written agreement.",
        },
      ],
    },
    {
      number: "12",
      title: "Term and Termination",
      blocks: [
        {
          kind: "paragraph",
          text: "These Terms of Service remain active throughout the Active Period and any applicable Grace Period unless terminated earlier under this section.",
        },
        {
          kind: "paragraph",
          text: "Either Party may terminate the subscription by giving at least 30 calendar days prior written notice to the other Party.",
        },
        {
          kind: "paragraph",
          text: "Klola Indonesia may immediately suspend or terminate Customer access without prior notice if the Customer commits a material breach engages in unlawful conduct or enters bankruptcy or liquidation proceedings.",
        },
        {
          kind: "paragraph",
          text: "Upon early termination by the Customer without cause paid subscription fees are nonrefundable and unpaid fees for the remaining Active Period remain payable. Both Parties will settle accrued obligations within 30 calendar days after termination and expressly waive Article 1266 of the Indonesian Civil Code to the extent judicial approval is required to effect termination.",
        },
      ],
    },
    {
      number: "13",
      title: "Governing Law and Dispute Resolution",
      blocks: [
        {
          kind: "paragraph",
          text: "These Terms of Service are governed by the laws of the Republic of Indonesia.",
        },
        {
          kind: "paragraph",
          text: "Any dispute arising from these Terms of Service will first be settled amicably through good faith negotiation within 30 calendar days after written notice of the dispute. During negotiation neither Party will publish statements in online or offline media that harm the other Party reputation.",
        },
        {
          kind: "paragraph",
          text: "If no amicable settlement is reached within 30 calendar days the dispute will be submitted to formal resolution in Jakarta in accordance with the Subscription Agreement while both Parties continue fulfilling undisputed obligations.",
        },
      ],
    },
    {
      number: "14",
      title: "General Provisions",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Entire Agreement",
              text: "These Terms of Service together with the Subscription Agreement and Privacy Policy form the complete agreement between the Parties and replace all prior oral or written understandings.",
            },
            {
              term: "Assignment",
              text: "Neither Party may transfer its rights or obligations under these Terms of Service to a third party without prior written consent from the other Party.",
            },
            {
              term: "Severability",
              text: "If any provision of these Terms of Service is found invalid or unenforceable under applicable law the remaining provisions remain in full force and effect.",
            },
            {
              term: "Amendments",
              text: "Klola Indonesia may update these Terms of Service periodically by publishing revised terms on its website or inside the Platform and continued use constitutes acceptance.",
            },
            {
              term: "Contact",
              text: "Questions legal notices or privacy requests regarding these Terms of Service may be sent to Klola Indonesia at helpdesk@klola.id.",
            },
          ],
        },
      ],
    },
  ],
};
