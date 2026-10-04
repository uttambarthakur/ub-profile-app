const certifications = [
  "SAFe 5 Practitioner",
  "AWS ML Speciality (Pearson)",
  "MLOps For ML (O'Reilly)",
];

export default function Certification() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
      <ul className="mt-3 list-disc list-outside space-y-2 pl-6 text-sm text-gray-700">
        {certifications.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}