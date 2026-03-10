import { useState } from "react";
import { SignInForm, type SignInFormValues } from "./components/sign-in-form";

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
  { value: "guest", label: "Guest" },
];

const SKILL_OPTIONS = [
  { value: "react", label: "React" },
  { value: "node", label: "Node.js" },
  { value: "typescript", label: "TypeScript" },
];

const CONTACT_PREFERENCE_OPTIONS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
];

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [contactPreference, setContactPreference] = useState("email");
  const [primitiveSelect, setPrimitiveSelect] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({
      name,
      email,
      password: "***",
      role,
      skills,
      message,
      newsletter,
      contactPreference,
    });
  }

  return (
    <>
      <h4>Admin</h4>
    </>
  );
}

export default App;
