import Certification from "@/components/Certification";
import EducationDetails from "@/components/EducationDetails";

export default function Education() {
  return (
    <section
      data-scroll-section="education"
      className="h-full snap-start overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 p-6"
    >

      <div className="mt-5 space-y-4">
        <EducationDetails />
        <Certification />
      </div>
    </section>
  );
}