"use client";

import { auth } from "@/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

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
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOut;
