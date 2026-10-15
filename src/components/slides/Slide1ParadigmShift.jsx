import React from 'react';
import {
  AlertTriangle,
  XCircle,
  Flame,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers,
  ArrowLeftRight,
} from 'lucide-react';
import { toPersianDigits } from '../../deck-engine.js';

export default function Slide1ParadigmShift({ stepIndex = 0 }) {
  const isStep0 = stepIndex === 0;
  const isStep1 = stepIndex === 1;
  const isStep2 = stepIndex === 2;

  return (
    <div
      className={`paradigm-comparison-matrix step-${stepIndex} ${
        isStep1 ? 'is-active-manual' : ''
      } ${isStep2 ? 'is-active-agentic' : ''}`}
      data-step={stepIndex}
    >
      {/* Top Paradigm Indicator Bar */}
      <div className="paradigm-header-bar">
        <div className="paradigm-header-meta">
          <ArrowLeftRight size={18} color="var(--color-surgical-blue)" />
          <span className="paradigm-header-title">مقایسه دو پارادایم توسعه فرانت‌اند</span>
        </div>
        <div className="paradigm-step-badge">
          {isStep0 && 'گام ۰: تبیین دوراهی پیش رو'}
          {isStep1 && 'گام ۱: اصطکاک و تله‌های پرامپت دستی'}
          {isStep2 && 'گام ۲: راهکار پایدار مهندسی ایجنت‌محور'}
        </div>
      </div>

      {/* Side-by-Side Comparison Container */}
      <div className="paradigm-cards-grid">
        {/* Card 1: Fragile Manual Prompting */}
        <div
          className={`comparison-card manual-prompting-card ${
            isStep1 ? 'highlight-manual is-spotlight' : ''
          } ${isStep2 ? 'is-subdued' : ''}`}
        >
          <div className="card-header">
            <div className="badge-wrapper">
              <span className="card-badge badge-manual">
                <Flame size={14} />
                <span>پرامپت تصادفی (Prompt & Pray)</span>
              </span>
            </div>
            <h3 className="card-title">توسعهٔ شانسی و ناپایدار</h3>
            <p className="card-tagline">درخواست‌های طولانی، بدون ابزار تخصصی و فاقد آزمون</p>
          </div>

          <div className="friction-points-list">
            <div className="point-item point-negative">
              <div className="point-icon-box">
                <XCircle size={18} className="text-danger" />
              </div>
              <div className="point-content">
                <strong className="point-label">توهم و خطای معماری</strong>
                <p className="point-desc">نادیده گرفتن الگوهای پروژه و تولید کدهای منسوخ یا نامعتبر</p>
              </div>
            </div>

            <div className="point-item point-negative">
              <div className="point-icon-box">
                <RefreshCw size={18} className="text-danger" />
              </div>
              <div className="point-content">
                <strong className="point-label">اتلاف توکن و فراموشی بافت</strong>
                <p className="point-desc">بازنویسی مداوم کل فایل‌ها به جای ویرایش جراحی و دقیق</p>
              </div>
            </div>

            <div className="point-item point-negative">
              <div className="point-icon-box">
                <AlertTriangle size={18} className="text-danger" />
              </div>
              <div className="point-content">
                <strong className="point-label">کد تست‌نشده و شکست کامیت</strong>
                <p className="point-desc">فقدان گیت‌های خودکار ارزیابی و بروز خطاهای پنهان در اجرا</p>
              </div>
            </div>

            <div className="point-item point-negative">
              <div className="point-icon-box">
                <Flame size={18} className="text-danger" />
              </div>
              <div className="point-content">
                <strong className="point-label">شکنندگی و عدم تکرارپذیری</strong>
                <p className="point-desc">وابستگی ۱۰۰٪ به فرمول پرامپت و ناتوانی در انتقال به تیم</p>
              </div>
            </div>
          </div>

          <div className="card-footer-status status-danger">
            <span>نتیجه: بازنویسی مکرر و اتلاف ساعت‌ها زمان باگ‌یابی</span>
          </div>
        </div>

        {/* Card 2: Structured Agentic Workflow */}
        <div
          className={`comparison-card agentic-workflow-card ${
            isStep2 ? 'highlight-agentic is-spotlight' : ''
          } ${isStep0 ? 'is-waiting' : ''} ${isStep1 ? 'is-muted-preview' : ''}`}
        >
          <div className="card-header">
            <div className="badge-wrapper">
              <span className="card-badge badge-agentic">
                <Sparkles size={14} />
                <span>مهندسی ایجنت‌محور (Agentic Workflow)</span>
              </span>
            </div>
            <h3 className="card-title">خط لولهٔ قطعی و سیستماتیک</h3>
            <p className="card-tagline">مهارت‌های کپسوله‌شده، آزمون پیش‌دستانه و استانداردهای سخت‌گیرانه</p>
          </div>

          <div className="friction-points-list">
            <div className="point-item point-positive">
              <div className="point-icon-box">
                <Layers size={18} className="text-success" />
              </div>
              <div className="point-content">
                <strong className="point-label">مهارت‌های تخصصی (Skills)</strong>
                <p className="point-desc">هدایت ایجنت با دستورالعمل‌های رسمی و استاندارد مخزن</p>
              </div>
            </div>

            <div className="point-item point-positive">
              <div className="point-icon-box">
                <ShieldCheck size={18} className="text-success" />
              </div>
              <div className="point-content">
                <strong className="point-label">گیت‌های اعتبارسنجی کیفی (TDD)</strong>
                <p className="point-desc">سنجش خودکار رفتار کد و جلوگیری از ورود خطاهای رگرسیون</p>
              </div>
            </div>

            <div className="point-item point-positive">
              <div className="point-icon-box">
                <Zap size={18} className="text-success" />
              </div>
              <div className="point-content">
                <strong className="point-label">مصاحبه Grilling پیش از اجرا</strong>
                <p className="point-desc">تثبیت ۱۰۰٪ مرز تصمیم‌گیری قبل از نوشتن حتی یک خط کد</p>
              </div>
            </div>

            <div className="point-item point-positive">
              <div className="point-icon-box">
                <CheckCircle2 size={18} className="text-success" />
              </div>
              <div className="point-content">
                <strong className="point-label">بازتولیدپذیری قطعی و خودکار</strong>
                <p className="point-desc">توسعه قابل اتکا، همسو با استاندارد شرکت و یکپارچه در مخزن</p>
              </div>
            </div>
          </div>

          <div className="card-footer-status status-success">
            <span>نتیجه: کد تمیز، آماده برای استقرار و بازبینی شفاف</span>
          </div>
        </div>
      </div>
    </div>
  );
}
