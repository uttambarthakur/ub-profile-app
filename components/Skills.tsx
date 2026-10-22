import type { IconType } from "react-icons";
import Image from "next/image";
import {
  FaBrain,
  FaCode,
  FaDatabase,
  FaKey,
  FaLaptopCode,
  FaLeaf,
  FaLink,
  FaUsers,
} from "react-icons/fa";
import { TbFileLambdaFilled } from "react-icons/tb";
import {
  SiDocker,
  SiFastapi,
  SiGo,
  SiJavascript,
  SiJira,
  SiKubernetes,
  SiNextdotjs,
  SiPython,
  SiQdrant,
  SiRedis,
  SiRedhatopenshift,
  SiTailwindcss,
  SiTypescript,
  SiApacheairflow,
  SiMlflow,
  SiOllama,
  SiDatabricks,
  SiCrewai,
} from "react-icons/si";

type SkillItem = {
  name: string;
  icon?: IconType;
  svgSrc?: string;
  imageSize?: number;
  imageClassName?: string;
};

type SkillGroup = {
  title: string;
  items: SkillItem[];
};

const skillGroups: SkillGroup[] = [
  {
    title: "GenAI / Agent Engineering",
    items: [
      {
        name: "Strands Agents/Tools/Eval",
        svgSrc: "/strands-agents.svg",
        imageSize: 52,
        imageClassName: "h-8 w-9",
      },
      { name: "CrewAI", icon: SiCrewai },
      { name: "LangGraph (LangChain)", svgSrc: "/langgraph-light.svg" },
      { name: "Context Engineering", icon: FaBrain },
      { name: "RAG", icon: FaDatabase },
      { name: "MCP (Model Context Protocol)", svgSrc: "/mcp.png" },
      { name: "A2A (Agent-to-Agent)", icon: FaLink },
      { name: "Generative UI (AGUI)", icon: FaLaptopCode },
    ],
  },
  {
    title: "Model Providers & AI Services",
    items: [
      { name: "OpenAI", svgSrc: "/openai.svg" },
      { name: "Anthropic", svgSrc: "/anthropic.svg" },
      { name: "Grok", svgSrc: "/grok.svg" },
      { name: "Amazon Bedrock", svgSrc: "/bedrock-color.svg" },
      { name: "Snowflake Cortex", svgSrc: "/snowflake-light.svg" },
      { name: "Ollama", icon: SiOllama },
    ],
  },
  {
    title: "Cloud, Security & Identity",
    items: [
      { name: "AWS S3", svgSrc: "/aws-s3.svg" },
      { name: "AWS Lambda", icon: TbFileLambdaFilled },
      { name: "AWS EC2", svgSrc: "/aws-ec2.svg" },
      { name: "AWS Secrets Manager", icon: FaKey },
      {
        name: "GCP Firebase",
        svgSrc: "/gcp-firebase.jpeg",
        imageSize: 52,
        imageClassName: "h-12 w-12",
      },
      {
        name: "GCP Cloud Functions",
        svgSrc: "/gcp-cloud-functions.png",
        imageSize: 52,
        imageClassName: "h-12 w-12",
      },
      {
        name: "GCP Firestore",
        svgSrc: "/gcp-firestore.png",
        imageSize: 52,
        imageClassName: "h-12 w-12",
      },
      { name: "Okta (OAuth/OIDC)", svgSrc: "/okta.svg" },
    ],
  },
  {
    title: "AI/ML Platform, Orchestration & Compute",
    items: [
      { name: "MLflow", icon: SiMlflow },
      { name: "Airflow", icon: SiApacheairflow },
      { name: "Kubeflow", svgSrc: "/kubeflow.svg" },
      { name: "Ray", svgSrc: "/ray.svg" },
      { name: "Databricks", icon: SiDatabricks },
      { name: "PySpark", svgSrc: "/apachespark.svg" },
      { name: "Snowpark", svgSrc: "/snowflake-light.svg" },
      { name: "Celery", icon: FaLeaf },
    ],
  },
  {
    title: "Platform Engineering, GitOps & IaC",
    items: [
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "OpenShift", icon: SiRedhatopenshift },
      { name: "Docker", icon: SiDocker },
      { name: "Helm", svgSrc: "/helm.svg" },
      { name: "Quay", svgSrc: "/quay.svg" },
      { name: "Tekton", svgSrc: "/tekton-light.svg" },
      { name: "Terraform", svgSrc: "/terraform.svg" },
      { name: "Argo CD", svgSrc: "/argo-cd.svg" },
    ],
  },
  {
    title: "Data Platforms & Vector Stores",
    items: [
      { name: "MongoDB", svgSrc: "/mongodb.svg" },
      { name: "Qdrant", icon: SiQdrant },
      { name: "ChromaDB", icon: FaDatabase },
      { name: "Redis", icon: SiRedis },
    ],
  },
  {
    title: "Application Engineering",
    items: [
      { name: "FastAPI", icon: SiFastapi },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Unix Scripting", svgSrc: "/unix-scripting.svg" },
    ],
  },
  {
    title: "Delivery, Quality & Process",
    items: [
      { name: "SAFe / Agile", icon: FaUsers },
      { name: "JQL (Jira Query Language)", icon: SiJira },
      { name: "K6", svgSrc: "/k6-light.svg" },
    ],
  },
  {
    title: "Languages",
    items: [
      { name: "Python", icon: SiPython },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Go", icon: SiGo },
      { name: "TypeScript", icon: SiTypescript },
    ],
  },
];

export default function Skills() {
  return (
    <section
      data-scroll-section="skills"
      className="h-full snap-start overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-6"
    >
      <div className="mt-2 space-y-6 sm:mt-4 sm:space-y-8">
        {skillGroups.map((group) => {
          return (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-700 sm:text-sm">
                {group.title}
              </h3>

              {/* 
                Mobile: 2 columns
                sm: 3 columns  
                md: 4 columns
                lg: 5 columns
              */}
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {group.items.map((item) => {
                  const ItemIcon = item.icon ?? FaCode;
                  const imageSize = item.imageSize ?? 30;
                  const imageClassName = item.imageClassName ?? "h-7 w-7";

                  return (
                    <li
                      key={`${group.title}-${item.name}`}
                      className="flex min-h-[5.5rem] flex-col items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-2 py-3 text-center text-xs font-medium text-gray-800 sm:min-h-26"
                    >
                      {item.svgSrc ? (
                        <Image
                          src={item.svgSrc}
                          alt={`${item.name} icon`}
                          width={imageSize}
                          height={imageSize}
                          className={`${imageClassName} object-contain`}
                        />
                      ) : (
                        <ItemIcon
                          className="h-6 w-6 text-gray-700"
                          aria-hidden="true"
                        />
                      )}
                      <span className="leading-tight">{item.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}