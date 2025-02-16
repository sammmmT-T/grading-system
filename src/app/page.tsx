"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import SchoolYearAccordion from "@/components/landing-page/school-year-accordion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AddSchoolYearButton from "@/components/landing-page/add-school-year-button";
import { Card, CardContent } from "@/components/ui/card";
import { SchoolYear } from "./types";
import StudentGradingPage from "@/components/student-grade-page/student-table";

export default function Page() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  const [selectedSchoolYearAndSemester, setSelectedSchoolYearAndSemester] =
    useState<SchoolYear | null>(null);

  console.log('selectedSchoolYearAndSemester', selectedSchoolYearAndSemester);
  useEffect(() => {
    // Redirect to sign-in page if not authenticated
    if (!loading && !user) {
      router.push("pages/sign-in");
    }
  }, [loading, user, router]);

  if (!user) return null;

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col p-2">
        <div className="min-h-screen bg-gray-50 flex flex-col w-full">
          <main className="flex-grow container mx-auto px-4 py-8 w-full">
            {selectedSchoolYearAndSemester ? (
              <StudentGradingPage selectedSchoolYearAndSemester={selectedSchoolYearAndSemester} />
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800">
                    Academic Year Overview
                  </h1>
                  <AddSchoolYearButton/>
                </div>
                <Card>
                  <CardContent className="py-4">
                    <SchoolYearAccordion
                      setSelectedSchoolYearAndSemester={setSelectedSchoolYearAndSemester}
                    />
                  </CardContent>
                </Card>
              </>
            )}
          </main>
          <Footer />
        </div>
      </main>
    </>
  );
}
