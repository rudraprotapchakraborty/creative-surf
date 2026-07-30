import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Renders a legal document (terms, privacy policy) from translated content so
 * the same layout serves every locale.
 */

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "strong"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export type LegalSection = {
  heading?: string;
  blocks: LegalBlock[];
};

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "h3":
      return <h3 className="text-xl font-medium text-flow-text mt-6 mb-3">{block.text}</h3>;
    case "strong":
      return <p className="leading-relaxed mt-4 font-semibold text-flow-text">{block.text}</p>;
    case "ul":
      return (
        <ul className="list-disc pl-6 mt-2 space-y-1">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p className="leading-relaxed mt-2">{block.text}</p>;
  }
}

export default function LegalDocument({
  breadcrumbHome,
  breadcrumbCurrent,
  title,
  lastUpdatedLabel,
  sections,
}: {
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  title: string;
  lastUpdatedLabel: string;
  sections: LegalSection[];
}) {
  return (
    <div className="bg-flow-bg min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-flow-textSoft mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            {breadcrumbHome}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-flow-textSoft font-medium">{breadcrumbCurrent}</span>
        </div>

        <div className="bg-flow-surface rounded-xl shadow-md p-8 md:p-12 border border-flow-border">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-flow-text">{title}</h1>
          <p className="text-flow-textSoft mb-8">{lastUpdatedLabel}</p>

          <div className="prose max-w-none text-flow-textSoft space-y-6">
            {sections.map((section, i) => (
              <div key={section.heading ?? i}>
                {section.heading && (
                  <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">{section.heading}</h2>
                )}
                {section.blocks.map((block, j) => (
                  <Block key={j} block={block} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
