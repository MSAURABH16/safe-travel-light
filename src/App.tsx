import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Emergency from "./pages/Emergency";
import Places from "./pages/Places";
import Accessibility from "./pages/Accessibility";
import Restaurants from "./pages/Restaurants";
import SafetyInfo from "./pages/SafetyInfo";
import Medical from "./pages/Medical";
import Connectivity from "./pages/Connectivity";
import Volunteers from "./pages/Volunteers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="tourist-safety-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/places" element={<Places />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/safety-info" element={<SafetyInfo />} />
              <Route path="/medical" element={<Medical />} />
              <Route path="/connectivity" element={<Connectivity />} />
              <Route path="/volunteers" element={<Volunteers />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
