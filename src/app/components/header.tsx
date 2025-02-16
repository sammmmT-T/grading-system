import { BookOpen } from "lucide-react";
import { auth } from "@/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const Header = () => {
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
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen size={32} />
          <span className="text-2xl font-bold">EduPlanner</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors">
                Contact
              </a>
            </li>
            <li>
                <button
                    onClick={handleSignOut}
                    className="hover:text-blue-200 transition-colors"
                >
                    Sign Out
                </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
