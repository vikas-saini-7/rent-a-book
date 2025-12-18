"use client";

import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-main py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-heading font-bold text-text-primary mb-8">
            Privacy Policy
          </h1>

          <div className="space-y-8 text-text-secondary">
            <section>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                1. Introduction
              </h2>
              <p className="leading-relaxed">
                At RentABook, we take your privacy seriously. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you use our book rental platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                2. Information We Collect
              </h2>
              <p className="leading-relaxed mb-4">
                We collect information that you provide directly to us,
                including:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Name, email address, and phone number</li>
                <li>Billing and shipping addresses</li>
                <li>
                  Payment information (processed securely through our payment
                  providers)
                </li>
                <li>Profile information and preferences</li>
                <li>Communication history with our support team</li>
                <li>Book listings and rental history</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                3. How We Use Your Information
              </h2>
              <p className="leading-relaxed mb-4">
                We use the collected information to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Facilitate book rentals and transactions</li>
                <li>Process payments and prevent fraud</li>
                <li>Send you updates about your rentals and account</li>
                <li>Improve our services and user experience</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send promotional communications (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                4. Information Sharing
              </h2>
              <p className="leading-relaxed mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Other users (limited to information necessary for rentals)
                </li>
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your explicit consent</li>
              </ul>
              <p className="leading-relaxed mt-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                5. Data Security
              </h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational security
                measures to protect your personal information. However, no
                method of transmission over the Internet is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                6. Cookies and Tracking
              </h2>
              <p className="leading-relaxed">
                We use cookies and similar tracking technologies to enhance your
                experience, analyze usage patterns, and deliver personalized
                content. You can control cookie preferences through your browser
                settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                7. Your Rights
              </h2>
              <p className="leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Access and receive a copy of your personal data</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                8. Children&apos;s Privacy
              </h2>
              <p className="leading-relaxed">
                Our service is not intended for children under 18 years of age.
                We do not knowingly collect personal information from children.
                If you believe we have collected information from a child,
                please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                9. Changes to This Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                10. Contact Us
              </h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please
                contact us at privacy@rentabook.com.
              </p>
            </section>

            <p className="text-sm text-text-muted pt-8 border-t border-border">
              Last updated: December 2025
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
