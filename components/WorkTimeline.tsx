"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type TimelineEntry = {
  period: string;
  role: string;
  company: string;
  highlights: string[];
  achievements: string[];
  progression?: string;
  badge?:
    | {
        type: "image";
        src: string;
        alt: string;
      }
    | {
        type: "icon";
        icon: "accenture";
      };
};

const timelineEntries: TimelineEntry[] = [
  {
    period: "Feb 2020 - Present",
    role: "Associate Architect III - AI",
    company: "Carelon Global Solutions",
    badge: {
      type: "image",
      src: "/carelon.svg",
      alt: "Carelon logo",
    },
    highlights: [
      "Architected a Lakeflow Spark Declarative Pipeline on Databricks to ingest 10 JSON files (~250K records each, ~2.5M total) from Amazon S3 and curate them into Unity Catalog Bronze, Silver and Gold tables following the medallion architecture, transforming source data that was unsuitable for agentic use into clean, governed, AI-ready datasets. The solution gave business users a single place to search and retrieve the latest data through an agentic application, improving productivity and speeding up business decision-making.",
      "Architected a cloud-native OCR and entity extraction solution that moves files from on-prem servers to S3 after PII encryption, extracts required fields, submits forms, and routes decrypted files to target subfolders.",
      "Architected the cloud-native GRIP application on AWS and secured Architecture Review Board approval by integrating Next.js, FastAPI, UiPath RPA, Snowflake Cortex services, S3, and Kubernetes.",
      "Designed a Kubernetes-based OCR and entity extraction solution using Istio service mesh patterns to parse provider documents and transform entities into business-specific formats.",
      "Designed GRIP's data layer by defining Snowflake schemas and implementing Snowflake SQL ingestion pipelines from external APIs for analytics and downstream AI use cases.",
      "Built a multi-agent GenAI chatbot using AWS Strands SDK for Pricing data query and retrieval workflows, with prompt orchestration and tool-based response patterns.",
      "Co-developed a Responsible AI and QA evaluation framework covering accountability, transparency, fairness, security, and robustness to reduce delivery risk.",
      "Applied prompt engineering to extract structured information from OCR outputs, improving automation accuracy and reducing manual effort.",
      "Led the Enablement Team in the Ireland Global Mobility Program and established reusable CI/CD and MLOps patterns on OpenShift and GCP.",
      "Automated cloud deployments with Argo CD and supported Avondale application delivery with rapid turnaround for client-requested enhancements.",
      "Built automated AWS data pipelines, migrated processing from PySpark to Snowpark, and operationalized ML experiments with Kubeflow.",
      "Advanced Responsible AI by building an in-house Python SDK for bias detection and embedding fairness checks into model workflows.",
      "Strengthened production support and maintainability through onboarding/runbooks, reporting processes, and extensive unit testing with Python/Unix automation.",
    ],
    achievements: [
      "Reduced process turnaround time from 3 weeks to 1 week, delivering multi-million annual savings.",
      "Achieved 95% reduction in execution time of the Ganymede data processing pipeline.",
      "Reduced GCP resource deployment time by 30% through Terraform module improvements.",
      "Reduced MAT CLI defects by 90% through automation and testing improvements.",
      "Reduced model artifact size from GBs to MBs, lowering storage and memory footprint.",
    ],
  },
  {
    period: "Mar 2018 - Jan 2020",
    role: "Senior Consultant",
    company: "Capgemini",
    badge: {
      type: "image",
      src: "/capgemini.svg",
      alt: "Capgemini logo",
    },
    highlights: [
      "Partnered with business and pre-sales stakeholders to identify opportunities, gather sample data, and design rapid AI/ML prototypes in regression, clustering, and forecasting.",
      "Built customer analytics solutions including frequency pattern mining and text classification for buying behavior and sentiment insights.",
      "Developed interactive analytics and storytelling assets using R Shiny and Qlik Sense dashboards.",
      "Designed and implemented an in-house streaming analytics platform on on-prem servers using Kafka and PySpark, enabling real-time data pipelines.",
    ],
    achievements: [
      "Contributed to winning a $1M+ signed engagement by leading the technical pitch and delivering an ML prototype plus Qlik Sense dashboards that demonstrated a lower-cost alternative.",
      "Reduced time from idea to first ML prototype from weeks to days using reusable templates and streamlined data preparation.",
      "Delivered customer behavior findings that supported process improvements and identified cost-reduction opportunities.",
    ],
  },
  {
    period: "Feb 2012 - Feb 2018",
    role: "Senior Engineering Analyst",
    company: "Accenture",
    badge: {
      type: "image",
      src: "/accenture.svg",
      alt: "Accenture logo",
    },
    progression: "Performance Engineering (2.5 yrs) -> Analytics/Data Science (3.5 yrs)",
    highlights: [
      "Built a strong foundation in Performance Engineering, executing load/performance testing and analysis using JMeter, LoadRunner, Dynatrace, and Splunk, and translating findings into actionable tuning recommendations.",
      "Transitioned to Analytics/Data Science with large production-scale datasets and developed regression forecasting plus clustering models for peak-period insights.",
      "Developed churn propensity models using logistic regression and translated model metrics into recommendations for wireless business teams.",
      "Built neural network regression models to predict system behavior and performance from production and test data.",
      "Delivered stakeholder-ready visual insights first in R and later in Python (Matplotlib and Seaborn), based on refreshed analysis datasets.",
    ],
    achievements: [
      "Guided stakeholders on project prioritization and realistic timelines, reducing redundant work and unnecessary cost.",
      "Designed and implemented an ML-based project cost estimation approach that saved about $15K per minor project versus a naive baseline.",
    ],
  },
];

export default function WorkTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const activeEntry = timelineEntries[activeIndex];

  useEffect(() => {
    contentRef.current?.animate(
      [
        { opacity: 0, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 220, easing: "ease-out" }
    );
  }, [activeIndex]);

  const navItems = useMemo(
    () =>
      timelineEntries.map((entry) => ({
        company: entry.company,
        period: entry.period,
      })),
    []
  );

  return (
    <section className="mt-2 flex min-h-0 flex-1 flex-col pt-2 sm:mt-4 sm:pt-4">
      <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
        Work Timeline
      </h3>

      {/* ========== Timeline selector ========== */}
      <div className="relative mt-4 overflow-x-auto pb-2 -mx-1 px-1">
        {/* Desktop / tablet: full horizontal timeline */}
        <div className="relative hidden min-w-0 sm:block">
          <div className="absolute left-6 right-6 top-5 h-0.5 bg-gray-300" />
          <div className="relative flex justify-between gap-2">
            {navItems.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={`${item.company}-${item.period}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="flex flex-1 flex-col items-center"
                  aria-label={`Show ${item.company} experience`}
                  title={`${item.company} (${item.period})`}
                >
                  <span
                    className={`h-3.5 w-3.5 rounded-full border-2 ${
                      isActive
                        ? "border-blue-700 bg-blue-700"
                        : "border-gray-400 bg-white"
                    }`}
                  />
                  <span
                    className={`mt-2 text-center text-xs font-semibold ${
                      isActive ? "text-blue-700" : "text-gray-600"
                    }`}
                  >
                    {item.period}
                  </span>
                  <span
                    className={`mt-1 text-center text-xs ${
                      isActive ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {item.company}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile: compact pill tabs (no forced min-width) */}
        <div className="flex gap-2 overflow-x-auto sm:hidden">
          {navItems.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`${item.company}-${item.period}-mobile`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span className="block font-semibold">{item.company}</span>
                <span className="block text-[10px] opacity-80">{item.period}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========== Content card ========== */}
      <article className="mt-4 flex min-h-0 flex-1 flex-col rounded-lg border border-gray-200 bg-white p-3 sm:p-4">
        <div ref={contentRef} className="flex min-h-0 flex-1 flex-col">
          <header className="relative flex items-start gap-3">
            {/* Logo */}
            {activeEntry.badge?.type === "image" && (
              <div className="relative h-10 w-10 shrink-0 sm:h-14 sm:w-14">
                <Image
                  src={activeEntry.badge.src}
                  alt={activeEntry.badge.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 40px, 56px"
                />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-blue-700 sm:text-sm">
                {activeEntry.period}
              </p>
              <h4 className="text-sm font-semibold text-gray-900 sm:text-base">
                {activeEntry.role}
              </h4>
              <p className="text-xs text-gray-600 sm:text-sm">
                {activeEntry.company}
              </p>
              {activeEntry.progression && (
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Progression: {activeEntry.progression}
                </p>
              )}
            </div>
          </header>

          <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1">
            <ul className="list-disc list-outside space-y-2 pl-5 text-sm text-gray-700">
              {activeEntry.highlights.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-900">
                Key Achievements
              </p>
              <ul className="mt-2 list-disc list-outside space-y-2 pl-5 text-sm text-gray-700">
                {activeEntry.achievements.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>

      {/* ========== Prev / Next ========== */}
      <div className="mt-3 flex justify-between gap-2 sm:justify-end">
        <button
          type="button"
          onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={activeIndex === 0}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() =>
            setActiveIndex((prev) =>
              Math.min(prev + 1, timelineEntries.length - 1)
            )
          }
          className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={activeIndex === timelineEntries.length - 1}
        >
          Next
        </button>
      </div>
    </section>
  );
}