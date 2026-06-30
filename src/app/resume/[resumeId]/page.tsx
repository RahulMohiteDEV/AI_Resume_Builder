"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import PersonalInfoStep from "@/components/PersonalInfoStep";
import EducationStep from "@/components/EducationStep";
import SkillsStep from "@/components/SkillsStep";
import ProjectsStep from "@/components/ProjectStep";
import ExperienceStep from "@/components/ExperienceStep";
import AchievementStep from "@/components/AchievementStep";
import CertificationStep from "@/components/CertificationStep";
import SummaryStep from "@/components/SummaryStep";

import { useSearchParams } from "next/navigation";

export default function ResumeBuilderPage() {
  const params = useParams();

  const resumeId = params.resumeId as string;
  console.log("resume id", resumeId);

  const [step, setStep] = useState(1);

  const searchParams = useSearchParams();

const isEditMode =
  searchParams.get("edit") === "true";

  return (
    <>



      {step === 1 && (
        <PersonalInfoStep resumeId={resumeId} onNext={() => setStep(2)} />
      )}

      {step === 2 && (
  <SummaryStep
    resumeId={resumeId}
    onBack={() => setStep(1)}
    onNext={() => setStep(3)}
  />
)}

      {step === 3 && (
        <EducationStep
          resumeId={resumeId}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <SkillsStep
          resumeId={resumeId}
          onBack={() => setStep(3)}
          onNext={() => setStep(5)}
        />
      )}

      {step === 5 && (
        <ProjectsStep
          resumeId={resumeId}
          onBack={() => setStep(4)}
          onNext={() => setStep(6)}
        />
      )}

      {step === 6 && (
        <ExperienceStep
          resumeId={resumeId}
          onBack={() => setStep(5)}
          onNext={() => setStep(7)}
        />
      )}
{step === 7 && (
  <AchievementStep
    resumeId={resumeId}
    onBack={() => setStep(6)}
    onNext={() => setStep(8)}
  />
)}

{step === 8 && (
  <CertificationStep
    resumeId={resumeId}
    onBack={() => setStep(7)}
    onNext={() => setStep(9)}
  />
)}
    </>
  );
}