import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, RefreshCw, XCircle } from "lucide-react";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Cancellation & Refund Policy · K R Pathavan Trading Company" },
      { name: "description", content: "Cancellation and refund guidelines for orders placed with K R Pathavan Trading Company." },
    ],
  }),
  component: RefundPolicy,
});

function RefundPolicy() {
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
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
              <RefreshCw className="w-6 h-6 animate-spin-slow" />
            </div>
            <h1 className="font-display text-2xl font-bold text-slate-800">Cancellation & Refund Policy</h1>
            <p className="text-xs font-bold text-red-600 uppercase tracking-wider">Simple, Fair & Transparent</p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            At <strong>K R Pathavan Trading Company</strong>, we take pride in providing high-quality teas, nuts, and dry fruits sourced with care. While we strive to ensure that every order reaches you fresh and intact, we understand that cancellations or issues may occasionally arise. This policy outlines how we handle cancellations, returns, and refunds.
          </p>

          {/* Section 1 */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Order Cancellations
            </h3>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1.5">
              <li><strong>Cancellation Window:</strong> Orders may be cancelled within 2 hours of purchase, provided they have not yet been packed or dispatched.</li>
              <li>Once an order is processed or handed over to the courier, cancellations are no longer possible due to the nature of food products.</li>
              <li>Customers must share their Order ID when requesting cancellation.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Returns & Replacements
            </h3>
            <div className="space-y-3 pl-2">
              <p className="text-sm text-slate-600 leading-relaxed">
                Returns are accepted only in the following cases:
              </p>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2">
                <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                  <li>Products are damaged or tampered during delivery.</li>
                  <li>The wrong product was delivered.</li>
                  <li>There is a verified quality or packaging defect.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-700">Conditions for Approval:</p>
                <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                  <li>Return requests must be raised within <strong>48 hours</strong> of delivery.</li>
                  <li>The product must remain sealed, unused, and in original packaging.</li>
                  <li>Customers must share clear photos/videos of the issue for verification.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Non-Returnable Items
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed pl-2">
              For reasons of food safety and hygiene, we cannot accept returns for:
            </p>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1.5">
              <li>Opened or partially consumed tea, nuts, or dry fruits.</li>
              <li>Products damaged due to improper storage after delivery.</li>
              <li>Items returned without authorization.</li>
              <li>Bulk/wholesale orders, unless a verified defect is confirmed.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Refunds Process
            </h3>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1.5">
              <li>Once a claim is verified and approved, refunds are initiated within <strong>3–5 business days</strong>.</li>
              <li>Refunds are processed via the original payment method (UPI, card, bank transfer, etc.).</li>
              <li>Depending on your payment provider, refunds may take 5–10 business days to reflect in your account.</li>
              <li>Customers may also choose store credit or product replacement instead of a refund.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Exceptions
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed pl-2">
              Refunds and cancellations will not apply in cases where delivery is delayed due to courier/logistics issues beyond our control, incorrect delivery details were provided by the customer, or natural variations in taste, color, or size occur (as our products are natural and seasonal).
            </p>
          </div>

          {/* Contact Details */}
          <div className="border-t border-slate-100 pt-6 mt-8 space-y-4">
            <h4 className="font-display text-sm font-bold text-slate-800">Need Help?</h4>
            <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 text-xs font-mono text-slate-700 space-y-2">
              <div className="font-sans font-bold text-slate-800 text-xs">K R Pathavan Trading Company</div>
              <div>📍 43/A, ULKOTTAI ROAD, PAAPANKULAM, JAYANKONDAM, ARIYALUR, TAMIL NADU - 621802</div>
              <div>📞 Phone: +91 93604 28764</div>
              <div>📧 Emails: info@krpathavan.com &nbsp;&nbsp;&nbsp;&nbsp; krpathavantradingcompany@gmail.com</div>
              <div>🌐 Website: <a href="https://krpathavan.com" target="_blank" rel="noopener noreferrer" className="text-red-600 underline">krpathavan.com</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
