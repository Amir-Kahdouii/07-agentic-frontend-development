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
      className={`paradigm-comparison-matrix step-${stepIndex} ${isStep1 ? 'is-active-manual' : ''
        } ${isStep2 ? 'is-active-agentic' : ''}`}
      data-step={stepIndex}
    >

      {/* Side-by-Side Comparison Container */}
      <div className="paradigm-cards-grid">
        {/* Card 1: Fragile Manual Prompting */}
        <div
          className={`comparison-card manual-prompting-card ${isStep1 ? 'highlight-manual is-spotlight' : ''
            } ${isStep2 ? 'is-subdued' : ''}`}
        >
          <div className="card-header">
            <div className="badge-wrapper">
              <span className="card-badge badge-manual">
                <Flame size={14} />
                <span>پرامپت نویسی سنتی (Prompt Engineering)</span>
              </span>
            </div>
            <h3 className="card-title">توسعهٔ شانسی و ناپایدار</h3>
            <p className="card-tagline">درخواست‌های طولانی، بدون ابزار تخصصی و بدون تست</p>
          </div>

          <div className="friction-points-list">
            <div className="point-item point-negative">
              <div className="point-icon-box">
                <XCircle size={18} className="text-danger" />
              </div>
              <div className="point-content">
                <strong className="point-label">Hallucination</strong>
                <p className="point-desc">توسعه بدون درک جزئیات و توهم زدن مدل در تصمیم گیری</p>
              </div>
            </div>

            <div className="point-item point-negative">
              <div className="point-icon-box">
                <RefreshCw size={18} className="text-danger" />
              </div>
              <div className="point-content">
                <strong className="point-label">اتلاف توکن و فراموشی بافت</strong>
                <p className="point-desc">بازنویسی مداوم کل فایل‌ها به جای ویرایش جزئی و دقیق</p>
              </div>
            </div>

            <div className="point-item point-negative">
              <div className="point-icon-box">
                <AlertTriangle size={18} className="text-danger" />
              </div>
              <div className="point-content">
                <strong className="point-label">توسعه بدون تست</strong>
                <p className="point-desc">موجب اشتباهات در طراحی UI و کامپوننت ها میشود.</p>
              </div>
            </div>

            <div className="point-item point-negative">
              <div className="point-icon-box">
                <Flame size={18} className="text-danger" />
              </div>
              <div className="point-content">
                <strong className="point-label">عدم تکرارپذیری</strong>
                <p className="point-desc">ممکن است نتوانید متد توسعه را در تیم یا به صورت شخصی تکرار کنید.</p>
              </div>
            </div>
          </div>

          <div className="card-footer-status status-danger">
            <span>نتیجه: بازنویسی مکرر و اتلاف ساعت‌ها زمان باگ‌یابی</span>
          </div>
        </div>

        {/* Card 2: Structured Agentic Workflow */}
        <div
          className={`comparison-card agentic-workflow-card ${isStep2 ? 'highlight-agentic is-spotlight' : ''
            } ${isStep0 ? 'is-waiting' : ''} ${isStep1 ? 'is-muted-preview' : ''}`}
        >
          <div className="card-header">
            <div className="badge-wrapper">
              <span className="card-badge badge-agentic">
                <Sparkles size={14} />
                <span>کار با ایجنت (Agentic Workflow)</span>
              </span>
            </div>
            <h3 className="card-title">یک مسیر روشن برای توسعه</h3>
            <p className="card-tagline">مهارت، سؤال، تست و بازبینی؛ به‌جای حدس‌زدن در هر قدم</p>
          </div>

          <div className="friction-points-list">
            <div className="point-item point-positive">
              <div className="point-icon-box">
                <Layers size={18} className="text-success" />
              </div>
              <div className="point-content">
                <strong className="point-label">مهارت‌های آمادهٔ استفاده (Skills)</strong>
                <p className="point-desc">ایجنت با راهنمای روشن و قواعد همان پروژه جلو می‌رود.</p>
              </div>
            </div>

            <div className="point-item point-positive">
              <div className="point-icon-box">
                <ShieldCheck size={18} className="text-success" />
              </div>
              <div className="point-content">
                <strong className="point-label">تست از همان اول (TDD)</strong>
                <p className="point-desc">رفتار کد را زود می‌سنجیم تا خطاها پیش از رگرسیون دیده شوند.</p>
              </div>
            </div>

            <div className="point-item point-positive">
              <div className="point-icon-box">
                <Zap size={18} className="text-success" />
              </div>
              <div className="point-content">
                <strong className="point-label">سؤال‌های درست پیش از اجرا (Grilling)</strong>
                <p className="point-desc">قبل از کدنویسی، ابهام‌های تصمیم را یکی‌یکی روشن می‌کنیم.</p>
              </div>
            </div>

            <div className="point-item point-positive">
              <div className="point-icon-box">
                <CheckCircle2 size={18} className="text-success" />
              </div>
              <div className="point-content">
                <strong className="point-label">روشی که می‌شود تکرارش کرد</strong>
                <p className="point-desc">تیم می‌تواند همان مسیر را با قواعد مشترک در مخزن ادامه دهد.</p>
              </div>
            </div>
          </div>

          <div className="card-footer-status status-success">
            <span>نتیجه: کد تمیزتر، بازبینی روشن‌تر و مسیر آماده‌تر برای استقرار</span>
          </div>
        </div>
      </div>
    </div>
  );
}
