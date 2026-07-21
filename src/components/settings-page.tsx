"use client";

import { FaArrowLeft as ArrowLeft, FaMagnifyingGlassMinus as ZoomOut, FaMagnifyingGlassPlus as ZoomIn } from "react-icons/fa6";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  caretStyles,
  ControlButton,
  Dropdown,
  DuckLogo,
  fonts,
  fontSizes,
  funboxes,
  SettingsRow,
  themes,
} from "@/components/ducktype-app";
import { loadSettings, saveSettings } from "@/lib/settings-store";
import { defaultSettings } from "@/lib/snippets";
import type { DuckSettings } from "@/types/snippet";

export function SettingsPage() {
  const [settings, setSettings] = useState<DuckSettings>(defaultSettings);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSettings(loadSettings());
  }, []);

  function update(next: Partial<DuckSettings>) {
    setSettings((current) => {
      const merged = { ...current, ...next };
      saveSettings(merged);
      return merged;
    });
  }

  function stepFontSize(direction: 1 | -1) {
    const index = fontSizes.findIndex((size) => size.id === settings.fontSize);
    const next = fontSizes[Math.min(Math.max(index + direction, 0), fontSizes.length - 1)];
    update({ fontSize: next.id });
  }

  const activeFontSize = fontSizes.find((size) => size.id === settings.fontSize) ?? fontSizes[2];

  return (
    <main className="flex min-h-screen flex-col px-5 py-6 text-[var(--text)] md:px-10">
      <header className="chrome mx-auto flex w-full max-w-6xl items-center justify-between gap-4 text-sm text-[var(--muted)]">
        <Link href="/" className="logo">
          <DuckLogo />
          duck<span className="logo-caret">_</span>type
        </Link>
        <Link className="icon-button" href="/" title="Back">
          <ArrowLeft size={17} />
        </Link>
      </header>

      <div className="page-body mx-auto mt-8 w-full max-w-6xl">
        <h1 className="page-title">settings</h1>

        <div className="page-panel">
          <SettingsRow label="theme">
            <Dropdown
              ariaLabel="Theme"
              value={settings.theme}
              onChange={(theme) => update({ theme })}
              options={themes.map((theme) => ({ value: theme.id, label: theme.label, swatch: theme.swatch }))}
            />
          </SettingsRow>

          <SettingsRow label="font">
            {fonts.map((font) => (
              <ControlButton key={font.label} active={settings.font === font.label} onClick={() => update({ font: font.label })}>
                {font.label.toLowerCase()}
              </ControlButton>
            ))}
          </SettingsRow>

          <SettingsRow label="font size">
            <button className="icon-button" onClick={() => stepFontSize(-1)} title="Smaller">
              <ZoomOut size={15} />
            </button>
            <span className="settings-value">{activeFontSize.label}</span>
            <button className="icon-button" onClick={() => stepFontSize(1)} title="Bigger">
              <ZoomIn size={15} />
            </button>
          </SettingsRow>

          <SettingsRow label="caret">
            {caretStyles.map((style) => (
              <ControlButton key={style} active={settings.caretStyle === style} onClick={() => update({ caretStyle: style })}>
                {style}
              </ControlButton>
            ))}
          </SettingsRow>

          <SettingsRow label="behavior">
            <ControlButton active={settings.stopOnError === "letter"} onClick={() => update({ stopOnError: settings.stopOnError === "letter" ? "off" : "letter" })}>
              stop on error
            </ControlButton>
            <ControlButton active={settings.showLiveWpm} onClick={() => update({ showLiveWpm: !settings.showLiveWpm })}>
              live wpm
            </ControlButton>
            <ControlButton active={settings.showLiveTimer} onClick={() => update({ showLiveTimer: !settings.showLiveTimer })}>
              live timer
            </ControlButton>
            <ControlButton active={settings.showProgress} onClick={() => update({ showProgress: !settings.showProgress })}>
              progress bar
            </ControlButton>
          </SettingsRow>

          <SettingsRow label="funbox">
            {funboxes.map((funbox) => (
              <ControlButton key={funbox.id} active={settings.funbox === funbox.id} onClick={() => update({ funbox: funbox.id })}>
                {funbox.label}
              </ControlButton>
            ))}
          </SettingsRow>
          <p className="settings-hint">
            {funboxes.find((funbox) => funbox.id === settings.funbox)?.desc}
          </p>
        </div>
      </div>
    </main>
  );
}
