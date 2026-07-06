import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { GuestRoute } from './components/auth/GuestRoute';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { PageLoader } from './components/ui/PageLoader';

// Eager load critical components
import { Home } from './pages/Home';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ProductPage } from './pages/ProductPage';
import { PlatformPage } from './pages/PlatformPage';
import { EnterprisePage } from './pages/EnterprisePage';

// Lazy load the rest
const GenericPage = lazy(() => import('./pages/GenericPage').then(module => ({ default: module.GenericPage })));
const MarketingDocsPage = lazy(() => import('./pages/MarketingDocsPage').then(module => ({ default: module.MarketingDocsPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then(module => ({ default: module.PricingPage })));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage').then(module => ({ default: module.ForgotPasswordPage })));
// Legal & Company Pages
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(module => ({ default: module.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(module => ({ default: module.TermsPage })));
const SecurityPage = lazy(() => import('./pages/SecurityPage').then(module => ({ default: module.SecurityPage })));
const CompliancePage = lazy(() => import('./pages/CompliancePage').then(module => ({ default: module.CompliancePage })));
const DPAPage = lazy(() => import('./pages/DPAPage').then(module => ({ default: module.DPAPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(module => ({ default: module.BlogPage })));
const CareersPage = lazy(() => import('./pages/CareersPage').then(module => ({ default: module.CareersPage })));
const DevelopersPage = lazy(() => import('./pages/DevelopersPage').then(module => ({ default: module.DevelopersPage })));
const ApiReferencePage = lazy(() => import('./pages/ApiReferencePage').then(module => ({ default: module.ApiReferencePage })));
const SDKsPage = lazy(() => import('./pages/SDKsPage').then(module => ({ default: module.SDKsPage })));
const GitHubPage = lazy(() => import('./pages/GitHubPage').then(module => ({ default: module.GitHubPage })));

const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome').then(module => ({ default: module.DashboardHome })));
const ApiKeysPage = lazy(() => import('./pages/dashboard/ApiKeysPage').then(module => ({ default: module.ApiKeysPage })));
const OrganizationPage = lazy(() => import('./pages/dashboard/OrganizationPage').then(module => ({ default: module.OrganizationPage })));
const SettingsPage = lazy(() => import('./pages/dashboard/SettingsPage').then(module => ({ default: module.SettingsPage })));
const ApiPlayground = lazy(() => import('./pages/dashboard/ApiPlayground').then(module => ({ default: module.ApiPlayground })));
const DocumentationPage = lazy(() => import('./pages/dashboard/DocumentationPage').then(module => ({ default: module.DocumentationPage })));
const WebhooksPage = lazy(() => import('./pages/dashboard/WebhooksPage').then(module => ({ default: module.WebhooksPage })));
const StatusPage = lazy(() => import('./pages/StatusPage').then(module => ({ default: module.StatusPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));

// Admin Pages
const AdminRoute = lazy(() => import('./components/auth/AdminRoute').then(module => ({ default: module.AdminRoute })));
const AdminLayout = lazy(() => import('./components/dashboard/AdminLayout').then(module => ({ default: module.AdminLayout })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers').then(module => ({ default: module.AdminUsers })));
const AdminOrgs = lazy(() => import('./pages/admin/AdminOrgs').then(module => ({ default: module.AdminOrgs })));
const AdminTickets = lazy(() => import('./pages/admin/AdminTickets').then(module => ({ default: module.AdminTickets })));

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Marketing Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="product" element={<ProductPage />} />
                <Route path="platform" element={<PlatformPage />} />
                <Route path="api" element={<ApiReferencePage />} />
                <Route path="developers" element={<DevelopersPage />} />
                <Route path="sdks" element={<SDKsPage />} />
                <Route path="github" element={<GitHubPage />} />
                <Route path="pricing" element={<PricingPage />} />
                <Route path="enterprise" element={<EnterprisePage />} />
                <Route path="documentation" element={<MarketingDocsPage />} />

                {/* Company */}
                <Route path="about" element={<AboutPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="careers" element={<CareersPage />} />
                <Route path="contact" element={<ContactPage />} />

                {/* Legal & Status */}
                <Route path="status" element={<StatusPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="security" element={<SecurityPage />} />
                <Route path="compliance" element={<CompliancePage />} />
                <Route path="dpa" element={<DPAPage />} />
              </Route>

              {/* Auth Routes (Guest Only) */}
              <Route element={<GuestRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              </Route>

              {/* Dashboard Routes (Protected) */}
              <Route path="/dashboard" element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="api-keys" element={<ApiKeysPage />} />
                  <Route path="playground" element={<ApiPlayground />} />
                  <Route path="api-docs" element={<DocumentationPage />} />
                  <Route path="webhooks" element={<WebhooksPage />} />
                  <Route path="projects" element={<GenericPage title="Projects" />} />
                  <Route path="org" element={<OrganizationPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
              </Route>

              {/* Admin Routes (Superadmin only) */}
              <Route path="/admin" element={<AdminRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="orgs" element={<AdminOrgs />} />
                  <Route path="tickets" element={<AdminTickets />} />
                  <Route path="settings" element={<GenericPage title="Platform Settings" />} />
                </Route>
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
