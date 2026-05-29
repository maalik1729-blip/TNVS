import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileText } from "lucide-react";

export const Route = createFileRoute("/terms-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions · K R Pathavan Trading Company" },
      { name: "description", content: "Terms of service and legal agreement for K R Pathavan Trading Company customers." },
    ],
  }),
  component: TermsConditions,
});

function TermsConditions() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-10 text-left font-sans">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition mb-6 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xxs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Home
        </Link>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-10 shadow-sm space-y-6">
          {/* Header */}
          <div className="border-b border-slate-100 pb-5 space-y-2">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h1 className="font-display text-2xl font-bold text-slate-800">Terms & Conditions</h1>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Please read these terms carefully before using our services</p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Welcome to <strong>K R Pathavan Trading Company</strong>. By accessing our website, making a purchase, or engaging with our services, you agree to comply with and be bound by the following Terms & Conditions. These terms govern all orders, sales, and interactions with K R Pathavan Trading Company. If you do not agree with these terms, we request you to discontinue using our services.
          </p>

          {/* Section 1 */}
          <div className="space-y-3">
            <h3 className="font-display text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-3 bg-indigo-600 rounded-full" />
              1. General Use of Website & Services
            </h3>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1.5">
              <li>By shopping with us, you confirm that you are at least 18 years old, or using our services under the supervision of a parent/guardian.</li>
              <li>You agree to provide accurate and complete details when placing orders.</li>
              <li>Any misuse, fraudulent activity, or violation of these terms may result in suspension of service.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h3 className="font-display text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-3 bg-indigo-600 rounded-full" />
              2. Products & Pricing
            </h3>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1.5">
              <li>We specialize in premium teas, nuts, and dry fruits.</li>
              <li>All product descriptions are provided as accurately as possible, but minor variations in color, taste, or texture may occur since products are natural and seasonal.</li>
              <li>Prices are listed in Indian Rupees (INR ₹) and may change due to seasonal availability, market fluctuations, or business policy.</li>
              <li>We reserve the right to correct any errors in product listings, descriptions, or pricing, and may cancel affected orders with refunds where applicable.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h3 className="font-display text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-3 bg-indigo-600 rounded-full" />
              3. Orders & Payments
            </h3>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1.5">
              <li>Orders are confirmed only after successful payment.</li>
              <li>We accept UPI, debit/credit cards, net banking, and wallets via secure, PCI-compliant gateways.</li>
              <li>K R Pathavan Trading Company does not store your payment details.</li>
              <li>In the event of duplicate charges or transaction errors, customers should contact our support team immediately.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h3 className="font-display text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-3 bg-indigo-600 rounded-full" />
              4. Shipping & Delivery
            </h3>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1.5">
              <li>Orders are shipped within India via trusted courier/logistics partners.</li>
              <li>Delivery timelines vary based on location and will be shared at checkout.</li>
              <li>Tracking details are provided once the order is dispatched.</li>
              <li>We are not liable for courier delays, force majeure events, or customer unavailability during delivery.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h3 className="font-display text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-3 bg-indigo-600 rounded-full" />
              5. Cancellations & Returns
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed pl-2">
              Orders may be cancelled within 2 hours of purchase, provided they have not been packed or shipped. Returns are accepted only in cases of damaged/tampered products on delivery, wrong items shipped, or verified quality concerns. For details, please refer to our <Link to="/refund-policy" className="text-indigo-600 underline font-semibold">Cancellation & Refund Policy</Link>.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-3">
            <h3 className="font-display text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-3 bg-indigo-600 rounded-full" />
              6. Customer Responsibilities
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed pl-2">
              By engaging with us, you agree not to provide false/incomplete delivery details, resell our products without prior written approval, misuse our brand name/content, or raise fraudulent claims/chargebacks.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-3">
            <h3 className="font-display text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-3 bg-indigo-600 rounded-full" />
              7. Intellectual Property
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed pl-2">
              All product images, content, designs, and branding are the intellectual property of K R Pathavan Trading Company. Unauthorized use, reproduction, or distribution is strictly prohibited.
            </p>
          </div>

          {/* Section 8 */}
          <div className="space-y-3">
            <h3 className="font-display text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-3 bg-indigo-600 rounded-full" />
              8. Limitation of Liability
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed pl-2">
              K R Pathavan Trading Company shall not be liable for natural variations in product taste/texture, courier delays, or indirect damages arising from product use beyond its intended purpose. Our liability is strictly limited to the value of the product purchased.
            </p>
          </div>

          {/* Section 9 */}
          <div className="space-y-3">
            <h3 className="font-display text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-3 bg-indigo-600 rounded-full" />
              9. Governing Law & Jurisdiction
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed pl-2">
              These Terms & Conditions are governed by the laws of India. Any disputes shall fall under the exclusive jurisdiction of the courts in Ariyalur, Tamil Nadu.
            </p>
          </div>

          {/* Contact Details */}
          <div className="border-t border-slate-100 pt-6 mt-8 space-y-4">
            <h4 className="font-display text-sm font-bold text-slate-800">Contact Us</h4>
            <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 text-xs font-mono text-slate-700 space-y-2">
              <div className="font-sans font-bold text-slate-800 text-xs">K R Pathavan Trading Company</div>
              <div>📍 43/A, ULKOTTAI ROAD, PAAPANKULAM, JAYANKONDAM, ARIYALUR, TAMIL NADU - 621802</div>
              <div>📞 Phone: +91 93604 28764</div>
              <div>📧 Emails: info@krpathavan.com &nbsp;&nbsp;&nbsp;&nbsp; krpathavantradingcompany@gmail.com</div>
              <div>🌐 Website: <a href="https://krpathavan.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">krpathavan.com</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
