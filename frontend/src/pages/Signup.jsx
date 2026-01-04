import { useState } from "react";
import { supabase } from "../supabaseClient";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Signup successful");
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Signup</h2>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-3"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-3"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="bg-black text-white w-full py-2">
        Signup
      </button>
    </form>
  );
}

export default Signup;
