"use client";

import { useState } from "react";
import {
  Button,
  SubmitButton,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  FormField,
  Input,
  PasswordField,
  Textarea,
  SelectField,
  MultiSelectField,
  CheckboxField,
  RadioGroupField,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@repo/ui";

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

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [contactPreference, setContactPreference] = useState("email");

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
    <main className="mx-auto max-w-xl px-4 py-10">
      <Card>
        <form onSubmit={handleSubmit} className="contents">
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>Create your account. Fill in the details below.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormField label="Name" id="name">
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </FormField>

        <FormField label="Email" id="email">
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            inputMode="email"
          />
        </FormField>

        <FormField label="Password" id="password">
          <PasswordField
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>

        <FormField label="Message" id="message">
          <Textarea
            id="message"
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </FormField>

        <FormField label="Role" id="role">
          <SelectField
            id="role"
            placeholder="Select role"
            options={ROLE_OPTIONS}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </FormField>

        <FormField label="Skills" id="skills">
          <MultiSelectField
            id="skills"
            placeholder="Select skills"
            options={SKILL_OPTIONS}
            value={skills}
            onChange={setSkills}
            aria-label="Select skills"
          />
        </FormField>

        <RadioGroupField
          name="contactPreference"
          label="Contact preference"
          options={CONTACT_PREFERENCE_OPTIONS}
          value={contactPreference}
          onChange={setContactPreference}
        />

        <CheckboxField
          id="newsletter"
          label="Subscribe to newsletter"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
        />
          </CardContent>
          <CardFooter className="flex gap-2 flex-wrap">
            <SubmitButton>Submit</SubmitButton>
            <Button type="button" variant="outline" onClick={() => {}}>
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="mt-10">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary">Open info sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>About this form</SheetTitle>
              <SheetDescription>
                This form uses all common components from @repo/ui: Input,
                Input, PasswordField, Textarea, SelectField, MultiSelectField,
                FormField, SubmitButton, and Button.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </main>
  );
}
