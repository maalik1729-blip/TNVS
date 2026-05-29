import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Truck, MapPin, Globe } from "lucide-react";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({
    meta: [
      { title: "Shipping Policy · K R Pathavan Trading Company" },
      { name: "description", content: "Shipping and delivery policy for K R Pathavan Trading Company premium teas, nuts, and dry fruits." },
    ],
  }),
  component: ShippingPolicy,
});

function ShippingPolicy() {
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
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h1 className="font-display text-2xl font-bold text-slate-800">Shipping Policy</h1>
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Freshness Delivered with Care</p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            At <strong>K R Pathavan Trading Company</strong>, we are committed to ensuring that your premium teas, nuts, and dry fruits reach you in perfect condition. This Shipping Policy explains how we process orders, handle packaging, and manage deliveries for both retail and wholesale customers.
          </p>

          {/* Section 1 */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Order Processing Time
            </h3>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1.5">
              <li>Orders are processed within 2–4 business days of payment confirmation.</li>
              <li>Orders placed on Sundays or public holidays will be processed on the next working day.</li>
              <li>Bulk/wholesale orders may require longer preparation time depending on quantity and product availability. Customers will be informed in advance.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Shipping Destinations & Delivery Timelines
            </h3>
            <div className="space-y-3 pl-2">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Domestic Shipping (India)
                </h4>
                <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                  <li><strong>Metro Cities:</strong> 3–6 business days after dispatch</li>
                  <li><strong>Non-Metro Cities & Semi-Urban Areas:</strong> 5–10 business days after dispatch</li>
                  <li><strong>Remote/Rural Areas:</strong> 7–12 business days after dispatch</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  International Shipping
                </h4>
                <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                  <li>International delivery may be available for wholesale/B2B orders.</li>
                  <li>Timelines depend on the destination country, customs clearance, and shipping partner schedules.</li>
                  <li>Customers will be informed of estimated timelines during order confirmation.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Shipping Charges
            </h3>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1.5">
              <li>Charges are calculated based on order weight, packaging type, and delivery location.</li>
              <li>Shipping costs will be displayed clearly at checkout before payment.</li>
              <li>Free shipping offers may apply during promotions or for orders above a certain value.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Packaging & Handling
            </h3>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1.5">
              <li>Products are packed in airtight, food-grade, tamper-proof packaging to ensure freshness.</li>
              <li>Nuts and dry fruits are sealed to maintain shelf life and avoid contamination.</li>
              <li>Tea is packed in moisture-proof containers to preserve aroma and quality.</li>
              <li>Bulk/wholesale orders are carefully palletized and secured for safe long-distance transit.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Tracking Your Order
            </h3>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1.5">
              <li>Once dispatched, customers will receive:</li>
              <ul className="list-disc pl-5 mt-1 text-slate-500 space-y-1">
                <li>A tracking ID via SMS/email</li>
                <li>A real-time tracking link to monitor shipment progress</li>
              </ul>
              <li>Please allow 24–48 hours for tracking details to update after dispatch.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Delays & Exceptions
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed pl-2">
              While we strive for timely delivery, certain factors may cause delays, including courier disruptions, extreme weather, regional holidays, or customs checks for international orders. In such cases, our support team will provide updates and assistance.
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
              <div>🌐 Website: <a href="https://krpathavan.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 underline">krpathavan.com</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
