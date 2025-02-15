"use client";

import { auth } from "@/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Assuming you're using shadcn/ui

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/sign-in");
    } catch (error) {
      console.error("Sign-out error", error);
    }
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="destructive"
      className="w-full sm:w-auto px-6 py-2 text-sm md:text-base font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all"
    >
      Sign Out
    </Button>
  );
};

export default SignOut;
