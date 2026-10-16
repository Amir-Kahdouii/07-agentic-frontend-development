import React, { useState, useCallback } from 'react';
import {
  Cpu,
  Search,
  Code2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  Activity,
  CheckCircle2,
  Terminal,
  Box,
} from 'lucide-react';
import { toPersianDigits } from '../../deck-engine.js';

const VIBEFARSI_URL = 'https://vibefarsi.ir';

const MCP_TOOLS = [
  {
    id: 'search_registry',
    name: 'search_registry',
    label: 'جست‌وجو در رجیستری',
    description: 'کامپوننت‌های RTL را با دسته و برچسب پیدا می‌کند.',
    request: {
      jsonrpc: '2.0',
      method: 'tools/call',
      params: {
        name: 'search_registry',
        arguments: {
          query: 'metric-card',
          category: 'stats',
        },
      },
    },
    response: {
      status: 'success',
      results: [
        {
          name: 'MetricCardRtl',
          version: '1.2.0',
          author: 'vibefarsi',
          tags: ['stats', 'rtl', 'letters', 'vazirmatn'],
          dependencies: [],
        },
      ],
    },
  },
  {
    id: 'get_component',
    name: 'get_component',
    label: 'گرفتن کد کامپوننت',
    description: 'JSX و CSS کامپوننت را برای استفاده مستقیم در پروژه می‌گیرد.',
    request: {
      jsonrpc: '2.0',
      method: 'tools/call',
      params: {
        name: 'get_component',
        arguments: {
          name: 'MetricCardRtl',
        },
      },
    },
    response: {
      status: 'success',
      component: 'MetricCardRtl.jsx',
      philosophy: 'copy-paste code ownership',
      npmDependencies: 'none',
      styling: 'Vanilla CSS with Letters design tokens',
    },
  },
  {
    id: 'get_design_rules',
    name: 'get_design_rules',
    label: 'گرفتن قواعد طراحی',
    description: 'توکن‌ها، تایپوگرافی فارسی و قواعد RTL را می‌گیرد.',
    request: {
      jsonrpc: '2.0',
      method: 'tools/call',
      params: {
        name: 'get_design_rules',
        arguments: {},
      },
    },
    response: {
      typography: {
        fontFamily: 'Vazirmatn',
        letterSpacing: '0',
        numerals: '۰۱۲۳۴۵۶۷۸۹',
      },
      palette: {
        accent: '#2597d0',
        obsidian: '#070709',
        paperWhite: '#ffffff',
      },
    },
  },
  {
    id: 'scaffold_page',
    name: 'scaffold_page',
    label: 'ساختن اسکلت صفحه',
    description: 'یک صفحهٔ شروع، هماهنگ با فرانت‌اند فارسی می‌سازد.',
    request: {
      jsonrpc: '2.0',
      method: 'tools/call',
      params: {
        name: 'scaffold_page',
        arguments: {
          layout: 'dashboard-single-column',
        },
      },
    },
    response: {
      status: 'success',
      template: 'page.jsx',
      dir: 'rtl',
      lang: 'fa-IR',
    },
  },
];

export default function Slide5McpVibeFarsi({ stepIndex = 0 }) {
  const [selectedToolId, setSelectedToolId] = useState('search_registry');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isInteractiveLiked, setIsInteractiveLiked] = useState(false);

  // Determine active tool based on manual click or build step
  const activeTool =
    MCP_TOOLS.find((t) => t.id === selectedToolId) || MCP_TOOLS[0];

  const handleCopyUrl = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(VIBEFARSI_URL).then(() => {
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
      }).catch(() => {});
    }
  }, []);

  const handleCopyComponentCode = useCallback(() => {
    const codeSnippet = `<MetricCardRtl
  title="کارت آمار فارسی"
  value="+${toPersianDigits(89)}٪"
  subtitle="یک نمونهٔ خروجی با ایجنت"
/>`;
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(codeSnippet).then(() => {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      }).catch(() => {});
    }
  }, []);

  const isStep0 = stepIndex === 0;
  const isStep1 = stepIndex >= 1;
  const isStep2 = stepIndex >= 2;
  const isStep3 = stepIndex >= 3;

  return (
    <div
      className={`mcp-vibefarsi-artifact step-${stepIndex}`}
      data-step={stepIndex}
    >
      {/* Top Bar: VibeFarsi Server Status & MCP Protocol Bar */}
      <div className="mcp-server-banner">
        <div className="mcp-server-meta">
          <div className="mcp-server-indicator">
            <span className="live-pulse-dot" />
            <strong className="mcp-server-name">سرور MCP: vibefarsi.ir</strong>
          </div>
          <span className="mcp-protocol-pill">JSON-RPC 2.0 / MCP Protocol</span>
        </div>

        <div className="mcp-server-actions">
          <button
            type="button"
            className={`mcp-copy-url-btn ${copiedUrl ? 'is-copied' : ''}`}
            onClick={handleCopyUrl}
            data-copy={VIBEFARSI_URL}
            title="کپی آدرس سرور https://vibefarsi.ir"
            aria-label="کپی آدرس سرور https://vibefarsi.ir"
          >
            {copiedUrl ? <Check size={14} /> : <Copy size={14} />}
            <span>{copiedUrl ? 'کپی شد! ✓' : 'کپی آدرس'}</span>
          </button>

          <a
            href={VIBEFARSI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mcp-external-link"
            title="مشاهده vibefarsi.ir در تب جدید"
          >
            <span dir="ltr">vibefarsi.ir</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Main Two-Column Cockpit: Protocol Inspector vs Live Persian Component */}
      <div className="mcp-workspace-grid">
        {/* Left Panel: MCP Protocol & Tool Inspector */}
        <div
          className={`mcp-protocol-panel ${
            isStep0 || isStep1 || isStep2 ? 'panel-active' : ''
          }`}
        >
          <div className="panel-header">
            <div className="panel-title-group">
              <Cpu size={16} color="var(--color-surgical-blue)" />
              <h3 className="panel-heading">ابزارهای MCP</h3>
            </div>
            <span className="step-tag-badge">
              {stepIndex === 0 && 'گام ۰: اتصال'}
              {stepIndex === 1 && 'گام ۱: اجرای ابزار'}
              {stepIndex === 2 && 'گام ۲: گرفتن کد'}
              {stepIndex >= 3 && 'گام ۳: دیدن خروجی فارسی'}
            </span>
          </div>

          {/* Tool Navigation Tabs */}
          <div className="mcp-tools-tab-list" role="tablist">
            {MCP_TOOLS.map((tool) => {
              const isSelected = selectedToolId === tool.id;
              return (
                <button
                  key={tool.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`mcp-tool-tab-btn ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelectedToolId(tool.id)}
                >
                  <Code2 size={13} />
                  <span className="tool-code-name" dir="ltr">{tool.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tool Meta & Description */}
          <div className="tool-meta-bar">
            <span className="tool-label-text">{activeTool.label}</span>
            <p className="tool-description-text">{activeTool.description}</p>
          </div>

          {/* Clean JSON Payload Viewers (Request & Response) */}
          <div className="json-payload-viewer">
            <div className="payload-box request-payload">
              <div className="payload-box-header">
                <span className="box-tag tag-request">درخواست</span>
                <span className="payload-method" dir="ltr">tools/call/{activeTool.name}</span>
              </div>
              <pre className="code-payload" dir="ltr">
                <code>{JSON.stringify(activeTool.request, null, 2)}</code>
              </pre>
            </div>

            {isStep1 && (
              <div className="payload-box response-payload animate-fade-in">
                <div className="payload-box-header">
                  <span className="box-tag tag-response">پاسخ سرور</span>
                  <span className="response-time">زمان پاسخ: {toPersianDigits(42)} میلی‌ثانیه</span>
                </div>
                <pre className="code-payload" dir="ltr">
                  <code>{JSON.stringify(activeTool.response, null, 2)}</code>
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Live Rendered Persian Component */}
        <div
          className={`persian-component-panel ${
            isStep3 ? 'panel-spotlight' : ''
          }`}
        >
          <div className="panel-header">
            <div className="panel-title-group">
              <Sparkles size={16} color="var(--color-surgical-blue)" />
              <h3 className="panel-heading">خروجی کامپوننت فارسی</h3>
            </div>
            <span className="component-badge-letters">سبک Letters</span>
          </div>

          {/* Rendered Persian Card Container */}
          <div className="rendered-component-box">
            <div className="live-persian-card">
              <div className="card-top-row">
                <div className="card-badge-wrap">
                  <span className="card-category-pill">
                    <Activity size={12} />
                    <span>کارت آمار</span>
                  </span>
                  <span className="component-source-tag">MetricCardRtl</span>
                </div>

                <button
                  type="button"
                  className={`card-interaction-btn ${isInteractiveLiked ? 'is-active' : ''}`}
                  onClick={() => setIsInteractiveLiked((prev) => !prev)}
                  title="تست تعامل دکمه"
                >
                  <TrendingUp size={14} />
                  <span>{isInteractiveLiked ? 'ثبت شد ✓' : 'امتحان دکمه'}</span>
                </button>
              </div>

              {/* Main Metric Visual */}
              <div className="metric-main-display">
                <div className="metric-number-group">
                  <span className="metric-value-huge">+{toPersianDigits(89)}٪</span>
                  <span className="metric-trend-badge">یک نمونهٔ خروجی با ایجنت</span>
                </div>
                <h4 className="metric-title-text">یک کارت آمار فارسی، آمادهٔ استفاده</h4>
                <p className="metric-desc-text">
                  یک کامپوننت RTL با تایپوگرافی فارسی؛ سورسش مستقیم داخل پروژه می‌آید.
                </p>
              </div>

              {/* Sub-Metrics Grid */}
              <div className="metric-sub-grid">
                <div className="sub-metric-item">
                  <span className="sub-metric-value">{toPersianDigits(32)}</span>
                  <span className="sub-metric-label">کامپوننت RTL</span>
                </div>
                <div className="sub-metric-item">
                  <span className="sub-metric-value">{toPersianDigits(4)}٫{toPersianDigits(9)} / {toPersianDigits(5)}</span>
                  <span className="sub-metric-label">امتیاز نمونه</span>
                </div>
                <div className="sub-metric-item">
                  <span className="sub-metric-value">۰ kb</span>
                  <span className="sub-metric-label">وابستگی npm اضافه</span>
                </div>
              </div>

              {/* Micro-Progress Bar */}
              <div className="metric-progress-wrapper">
                <div className="progress-labels">
                  <span>پیشرفت نمونهٔ اجرا</span>
                  <span dir="ltr">{toPersianDigits(89)}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '89%' }} />
                </div>
              </div>

              {/* Bottom Ownership Banner */}
              <div className="card-footer-banner">
                <div className="ownership-info">
                  <CheckCircle2 size={15} color="#16a34a" />
                  <strong>کد داخل پروژه می‌ماند؛ بدون وابستگی npm</strong>
                </div>
                <button
                  type="button"
                  className={`copy-component-code-btn ${copiedCode ? 'is-copied' : ''}`}
                  onClick={handleCopyComponentCode}
                  title="کپی قطعه‌کد کامپوننت"
                >
                  {copiedCode ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedCode ? 'کپی شد! ✓' : 'کپی JSX'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Philosophy Note */}
          <div className="component-philosophy-callout">
            <Box size={15} color="var(--color-surgical-blue)" />
            <p>
              <strong>کد را خود پروژه نگه می‌دارد:</strong> به‌جای یک پکیج حجیم که شاید در RTL مشکل داشته باشد، سورس سبک را می‌گیریم و همان‌جا در پروژه نگه می‌داریم.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
