"use client";
import { useState, useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  console.log('user: ', user)
  const { user: authUser, loading: authLoading } = useAuthContext();

  useEffect(() => {
    if (!authLoading && authUser) {
      router.push("/");
    }
  }, [authLoading, authUser, router]);

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);

      if (res?.user) {
        sessionStorage.setItem("user", "true");
        setEmail("");
        setPassword("");
        alert("Account created successfully.");
        router.push("/");
      } else {
        alert(
          "An error occurred while creating your account. Please try again."
        );
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred while creating your account. Please try again.");
    }
  };

  if (authLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
          disabled={loading}
        >
          Sign Up
        </button>
        {error && <p className="text-red-500 mt-4">{error.message}</p>}
      </div>
    </div>
  );
};

export default SignUp;
