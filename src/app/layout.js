import "src/global.css";

// ----------------------------------------------------------------------

import PropTypes from "prop-types";

import ThemeProvider from "src/theme";
import { primaryFont } from "src/theme/typography";
import { LocalizationProvider } from "src/locales";

import ProgressBar from "src/components/progress-bar";
import { MotionLazy } from "src/components/animate/motion-lazy";
import { SettingsDrawer, SettingsProvider } from "src/components/settings";
import { GlobalProvider } from "./GlobalProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReduxProvider from "../redux/ReduxProvider";

// ----------------------------------------------------------------------

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: "Shoe Shop",
  description: "The e-commerce shoe shop.",
  keywords: "ecommerce,shoe,shop,",
  manifest: "/manifest.json",
  icons: [
    { rel: "icon", url: "/favicon/favicon.ico" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <ReduxProvider>
          <LocalizationProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: "light", // 'light' | 'dark'
                themeDirection: "ltr", //  'rtl' | 'ltr'
                themeColorPresets: "default", // 'default' | 'preset01' | 'preset02' | 'preset03' | 'preset04' | 'preset05'
              }}
            >
              <ThemeProvider>
                <GlobalProvider>
                  <MotionLazy>
                    <ToastContainer closeOnClick />
                    <ProgressBar />
                    <SettingsDrawer />
                    {children}
                  </MotionLazy>
                </GlobalProvider>
              </ThemeProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
