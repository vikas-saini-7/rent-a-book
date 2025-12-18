"use client";

import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const TermsAndConditionsPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-main py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-heading font-bold text-text-primary mb-8">
            Terms and Conditions
          </h1>

          <div className="space-y-8 text-text-secondary">
            <section>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="leading-relaxed">
                By accessing and using RentABook, you accept and agree to be
                bound by the terms and provisions of this agreement. If you do
                not agree to abide by these terms, please do not use this
                service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                2. Book Rental Service
              </h2>
              <p className="leading-relaxed mb-4">
                RentABook provides a platform for users to rent books from other
                users. We act as an intermediary and are not responsible for the
                condition of books rented through our platform.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Users must be at least 18 years old to use this service</li>
                <li>All book listings must be accurate and truthful</li>
                <li>Rental periods and prices are set by the book owner</li>
                <li>Late returns may incur additional charges</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                3. User Responsibilities
              </h2>
              <p className="leading-relaxed mb-4">
                As a user of RentABook, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Return rented books in the same condition as received</li>
                <li>Report any damages or issues promptly</li>
                <li>Not use the platform for any illegal activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                4. Rental Policies
              </h2>
              <p className="leading-relaxed mb-4">
                When renting books through RentABook:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Rental periods begin from the date of pickup/delivery</li>
                <li>Extensions may be requested before the due date</li>
                <li>
                  Damaged or lost books must be compensated at replacement value
                </li>
                <li>
                  Cancellations must be made at least 24 hours before pickup
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                5. Payments and Fees
              </h2>
              <p className="leading-relaxed">
                All payments are processed securely through our platform.
                RentABook charges a small service fee on each transaction.
                Refunds are available in accordance with our refund policy and
                are subject to the specific circumstances of each case.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                6. Limitation of Liability
              </h2>
              <p className="leading-relaxed">
                RentABook is not liable for any direct, indirect, incidental, or
                consequential damages arising from the use of our service. We do
                not guarantee the availability, quality, or condition of any
                books listed on our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                7. Changes to Terms
              </h2>
              <p className="leading-relaxed">
                We reserve the right to modify these terms at any time. Users
                will be notified of significant changes via email or through the
                platform. Continued use of the service after changes constitutes
                acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                8. Contact Information
              </h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms and Conditions,
                please contact us at support@rentabook.com.
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

export default TermsAndConditionsPage;
