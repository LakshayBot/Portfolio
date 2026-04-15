"use client";

const skills = [
  {
    icon: "dynamic_form",
    title: "Front-end Excellence",
    description:
      "Building immersive UIs with React and Next.js, focusing on performance and web vitals.",
  },
  {
    icon: "database",
    title: "Robust Back-end",
    description:
      "Designing secure, scalable APIs with Node.js and distributed database architectures.",
  },
  {
    icon: "precision_manufacturing",
    title: "Engineering Mindset",
    description:
      "Applying structural problem-solving techniques to complex digital infrastructures.",
  },
];

export function SkillsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {skills.map((skill) => (
        <div
          key={skill.title}
          className="skill-card p-8 rounded-lg transition-colors duration-200"
        >
          <div className="mb-6" style={{ color: "var(--color-md-primary)" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "2.25rem" }}>
              {skill.icon}
            </span>
          </div>
          <h3
            className="font-bold text-xl mb-3"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "var(--color-md-on-surface)",
            }}
          >
            {skill.title}
          </h3>
          <p style={{ color: "var(--color-md-on-surface-variant)" }}>
            {skill.description}
          </p>
        </div>
      ))}
    </div>
  );
}
