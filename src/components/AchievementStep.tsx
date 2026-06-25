"use client";

import axios from "axios";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Trophy,
} from "lucide-react";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

interface FormValues {
  achievements: {
    title: string;
  }[];
}

export default function AchievementStep({
  resumeId,
  onNext,
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
      achievements: [{ title: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievements",
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
  achievements:
    data.data.achievements?.length
      ? data.data.achievements.map(
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
    achievements:
      values.achievements.map(
        (item) => item.title
      ),
  }
);

      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="text-yellow-500" />
        <h1 className="text-3xl font-bold">
          Achievements
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-3"
          >
            <input
              {...register(
                `achievements.${index}.title`
              )}
              placeholder="Achievement"
              className="flex-1 border rounded-xl p-3"
            />

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  remove(index)
                }
              >
                <Trash2 />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ title: "" })}
          className="flex items-center gap-2 border px-4 py-2 rounded-xl"
        >
          <Plus size={18} />
          Add Achievement
        </button>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="border px-5 py-3 rounded-xl"
          >
            <ArrowLeft />
          </button>

          <button
            disabled={isSubmitting}
            className="bg-violet-600 text-white px-6 py-3 rounded-xl"
          >
            {isSubmitting
              ? "Saving..."
              : "Continue"}
            <ArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
}