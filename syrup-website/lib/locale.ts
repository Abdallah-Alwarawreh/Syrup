"use server";

import { cookies, headers } from "next/headers";
import fs from "fs";
import path from "path";

const COOKIE_NAME = "NEXT_LOCALE";
const DEFAULT_LOCALE = "en";
const LOCALES_DIR = path.resolve(process.cwd(), "_locale");

function getSupportedLocales(): string[] {
  return fs
    .readdirSync(LOCALES_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => path.basename(file, ".json"));
}

const SUPPORTED_LOCALES = getSupportedLocales();

function detectLocale(acceptLanguage: string): string {
  const locales = acceptLanguage
  .split(",")
  .map((part) => {
    const [locale, quality = "1"] = part.split(";q=");
    return { locale: locale.trim(), quality: parseFloat(quality) };
  })
  .sort((a, b) => b.quality - a.quality);

  for (const { locale } of locales) {
    const baseLocale = locale.split("-")[0];
    if (SUPPORTED_LOCALES.includes(baseLocale)) {
      return baseLocale;
    }
    if (SUPPORTED_LOCALES.includes(locale)) {
      return locale;
    }
  }

  return DEFAULT_LOCALE;
}

export async function getUserLocale() {
  const cookie = (await cookies()).get(COOKIE_NAME)?.value;

  if (cookie) {
    return cookie;
  }

  const acceptLanguage = (await headers()).get("accept-language") || "";
  return detectLocale(acceptLanguage);
}

export async function getDefaultLocale() {
  return DEFAULT_LOCALE;
}

export async function setUserLocale(locale: string) {
  (await cookies()).set(COOKIE_NAME, locale);
}
