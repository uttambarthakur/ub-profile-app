const educationItems = [
  {
    degree: "PGP-BABI",
    institute: "Great Lakes Institute of Management & Stuart School of Business - Illinois Institute of Technology",
  },
  {
    degree: "BTECH - ECE",
    institute: "Tezpur University",
  },
];

export default function EducationDetails() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="text-lg font-semibold text-gray-900">Education</h3>
      <ul className="mt-3 list-disc list-outside space-y-2 pl-6 text-sm text-gray-700">
        {educationItems.map((item) => (
          <li key={item.degree}>
            <span className="font-semibold text-gray-900">{item.degree}</span>
            <span>{", "}</span>
            <span>{item.institute}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}