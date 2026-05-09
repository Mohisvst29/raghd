"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeColors {
  primary: string;
  secondary: string;
  surface: string;
  background: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  logoUrl: string;
  logoSize: number;
  updateColor: (key: keyof ThemeColors, value: string) => void;
  updateLogo: (url: string) => void;
  updateLogoSize: (size: number) => void;
  resetColors: () => void;
}

const defaultColors: ThemeColors = {
  primary: "#001629",
  secondary: "#50606f",
  surface: "#f7fafc",
  background: "#f7fafc"
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, initialTheme }: { children: React.ReactNode, initialTheme?: Partial<ThemeContextType> }) {
  const [colors, setColors] = useState<ThemeColors>(initialTheme?.colors || defaultColors);
  const [logoUrl, setLogoUrl] = useState<string>(initialTheme?.logoUrl || "https://lh3.googleusercontent.com/aida/ADBb0ugQAN_RV5Z0Qj6QbnjgXQTOhDqInmfzS9gX6lYPwDXRnzmsITfO50plYVFKPzUjz_KfMkEyX2fU4I43_qarhh0ytjBbdrVCY-b9KJXWIXmGsnFiZaltGXaCke52D58wu77A2KO4HCuCOvfpSo2xRXDUWU5U_v2h_b_rE0GRLu0NKhE85jWe3GSrztPXtTMGoXx3_DbepWo04cwX3OlCOUTXK39zzGjVFKx5xpkrKvrB3A1s1PCbwWt-zp18JbX2U5mKWT7sp0Ut_sE");
  const [logoSize, setLogoSize] = useState<number>(initialTheme?.logoSize || 64);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Apply colors to root HTML element for Tailwind CSS v4 variables
    const root = document.documentElement;
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-surface", colors.surface);
    root.style.setProperty("--color-background", colors.background);
    
    // Save to local storage
    localStorage.setItem("site_colors", JSON.stringify(colors));
  }, [colors, mounted]);

  const updateColor = (key: keyof ThemeColors, value: string) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  const updateLogo = (url: string) => {
    setLogoUrl(url);
    localStorage.setItem("site_logo", url);
  };

  const updateLogoSize = (size: number) => {
    setLogoSize(size);
    localStorage.setItem("site_logo_size", size.toString());
  };

  const resetColors = () => {
    setColors(defaultColors);
  };

  return (
    <ThemeContext.Provider value={{ colors, logoUrl, logoSize, updateColor, updateLogo, updateLogoSize, resetColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
