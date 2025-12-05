import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import {
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconEdit,
  IconCamera,
} from "@tabler/icons-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
        <h1 className="text-3xl font-heading text-text-primary mb-8">
          My Profile
        </h1>

        {/* Profile Header */}
        <div className="bg-bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center">
                <IconUser size={40} className="text-primary" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary-hover transition-colors">
                <IconCamera size={16} />
              </button>
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-xl font-semibold text-text-primary">
                John Doe
              </h2>
              <p className="text-text-muted">Member since January 2024</p>
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">
                <span className="text-sm text-text-secondary">
                  <strong className="text-primary">12</strong> Books Rented
                </span>
                <span className="text-sm text-text-secondary">
                  <strong className="text-primary">3</strong> Currently Reading
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-md text-text-secondary hover:border-primary hover:text-primary transition-colors">
              <IconEdit size={18} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-text-primary mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-bg-main flex items-center justify-center">
                <IconUser size={18} className="text-text-muted" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Full Name</p>
                <p className="text-text-primary">John Doe</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-bg-main flex items-center justify-center">
                <IconMail size={18} className="text-text-muted" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Email</p>
                <p className="text-text-primary">john@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-bg-main flex items-center justify-center">
                <IconPhone size={18} className="text-text-muted" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Phone</p>
                <p className="text-text-primary">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-bg-main flex items-center justify-center">
                <IconMapPin size={18} className="text-text-muted" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Address</p>
                <p className="text-text-primary">New Delhi, India</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
