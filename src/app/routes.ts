import { createBrowserRouter } from "react-router";
import { ScrollToTop } from "./components/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ContactPage } from "./pages/ContactPage";
import BlogsPage from "./pages/BlogsPage";
import VideosPage from "./pages/VideosPage";
import DocumentationPage from "./pages/DocumentationPage";
import ApiReferencePage from "./pages/ApiReferencePage";
import FaqPage from "./pages/FaqPage";
import CareersPage from "./pages/CareersPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import CommunityPage from "./pages/CommunityPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import BrandGuidelinePage from "./pages/BrandGuidelinePage";

export const router = createBrowserRouter([
  {
    Component: ScrollToTop,
    children: [
      { path: "/",                        Component: HomePage },
      { path: "/about",                   Component: AboutPage },
      { path: "/services",                Component: ServicesPage },
      { path: "/contact",                 Component: ContactPage },
      { path: "/resources/blogs",         Component: BlogsPage },
      { path: "/resources/videos",        Component: VideosPage },
      { path: "/resources/documentation", Component: DocumentationPage },
      { path: "/resources/api-reference", Component: ApiReferencePage },
      { path: "/resources/faq",           Component: FaqPage },
      { path: "/careers",                 Component: CareersPage },
      { path: "/support/help-center",     Component: HelpCenterPage },
      { path: "/support/community",       Component: CommunityPage },
      { path: "/privacy-policy",          Component: PrivacyPolicyPage },
      { path: "/terms-of-service",        Component: TermsOfServicePage },
      { path: "/brand-guidelines",        Component: BrandGuidelinePage },
    ],
  },
]);
