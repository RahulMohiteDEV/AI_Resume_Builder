"use client";

import axios from "axios";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Award,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

interface FormValues {
  certifications: {
    title: string;
  }[];
}

export default function CertificationStep({
  resumeId,
  onBack,
}: Props) {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      certifications: [{ title: "" }],
    },
  });

  const router = useRouter();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(
        `/api/resume/${resumeId}`
      );

      reset({
        certifications:
          data.data.certifications?.length
            ? data.data.certifications.map(
                (item: string) => ({
                  title: item,
                })
              )
            : [{ title: "" }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (
    values: FormValues
  ) => {
    try {
      await axios.patch(
        `/api/resume/${resumeId}`,
        {
          certifications:
            values.certifications.map(
              (item) => item.title
            ),
        }
      );

      router.push(
        `/resume/${resumeId}/preview?updated=true`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="font-medium">
              Step 8 of 8
            </span>

            <span className="text-slate-500">
              100%
            </span>
          </div>

          <div className="h-2 bg-slate-200 rounded-full">
            <div className="h-full w-full bg-violet-600 rounded-full" />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Certifications
            </h1>

            <p className="text-slate-500 mt-2">
              Add your professional certifications,
              online courses and industry credentials.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-start gap-3"
              >
                <div className="relative flex-1">

                  <Award
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600"
                  />

                  <input
                    {...register(
                      `certifications.${index}.title`
                    )}
                    placeholder={`Certification ${index + 1}`}
                    className="w-full border border-slate-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                  />
                </div>

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-3 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}

            {/* Add Button */}
            <button
              type="button"
              onClick={() =>
                append({ title: "" })
              }
              className="inline-flex items-center gap-2 border border-violet-300 text-violet-700 hover:bg-violet-50 px-5 py-3 rounded-xl font-semibold transition"
            >
              <Plus size={18} />
              Add Certification
            </button>

            {/* Footer Buttons */}
            <div className="flex justify-between pt-6">

              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 border border-slate-300 hover:bg-slate-100 px-6 py-3 rounded-xl font-semibold transition"
              >
                <ArrowLeft size={18} />
                Back
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                {isSubmitting
                  ? "Saving..."
                  : "Finish Resume"}

                <ArrowRight size={18} />
              </button>

            </div>
          </form>

        </div>
      </div>
    </div>
  );
}