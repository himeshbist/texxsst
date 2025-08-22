import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Home from "./pages/home.jsx";
import Pricing from "./pages/pricing.jsx";
import BulkEmail from "./pages/tools/bulk-email.jsx";
import OCR from "./pages/tools/ocr.jsx";
import BulkSMS from "./pages/tools/bulk-sms.jsx";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/tools/bulk-email" element={<BulkEmail />} />
          <Route path="/tools/ocr" element={<OCR />} />
          <Route path="/tools/bulk-sms" element={<BulkSMS />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}