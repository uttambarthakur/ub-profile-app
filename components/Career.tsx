import WorkTimeline from "@/components/WorkTimeline";

export default function Career() {
  return (
    <section
      data-scroll-section="career"
      className="flex h-full min-h-0 snap-start flex-col rounded-xl  border-gray-200 bg-gray-50 p-6"
    >
      <WorkTimeline />
    </section>
  );
}