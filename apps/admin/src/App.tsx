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
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
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
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Admin Demo">
                <span>Admin Demo</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Demo</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Form & Card" isActive>
                    <span>Form & Card</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Buttons">Buttons</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Select">Select</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Modal">Modal</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Sheet">Sheet</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">UI component demo</span>
        </header>
        <main className="mx-auto max-w-2xl space-y-12 px-4 py-10">
          {/* Section: Card + form (FormField, Input, PasswordField, Textarea, SelectField, MultiSelectField, RadioGroupField, CheckboxField, SubmitButton, Button) */}
          <section>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Card & Form (all form components)
        </h2>
        <Card>
          <form onSubmit={handleSubmit} className="contents">
            <CardHeader>
              <CardTitle>Sign up</CardTitle>
              <CardDescription>
                Create your account. All @repo/ui form components below.
              </CardDescription>
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
            <CardFooter className="flex flex-wrap gap-2">
              <SubmitButton>Submit</SubmitButton>
              <Button type="button" variant="outline" onClick={() => {}}>
                Cancel
              </Button>
            </CardFooter>
          </form>
        </Card>
      </section>

      {/* Section: Button variants */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Button variants
        </h2>
        <Card>
          <CardContent className="flex flex-wrap gap-2 pt-6">
            <Button type="button">Default</Button>
            <Button type="button" variant="secondary">
              Secondary
            </Button>
            <Button type="button" variant="outline">
              Outline
            </Button>
            <Button type="button" variant="destructive">
              Destructive
            </Button>
            <Button type="button" variant="ghost">
              Ghost
            </Button>
            <Button type="button" variant="link">
              Link
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Section: Select primitives (Select, SelectTrigger, SelectContent, SelectItem, SelectValue) */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Select (primitives)
        </h2>
        <Card>
          <CardContent className="pt-6">
            <FormField label="Primitive Select" id="primitive-select">
              <Select
                value={primitiveSelect || undefined}
                onValueChange={setPrimitiveSelect}
              >
                <SelectTrigger id="primitive-select" className="w-full">
                  <SelectValue placeholder="Pick one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">Option A</SelectItem>
                  <SelectItem value="b">Option B</SelectItem>
                  <SelectItem value="c">Option C</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </CardContent>
        </Card>
      </section>

      {/* Section: Modal */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Modal
        </h2>
        <Modal>
          <ModalTrigger asChild>
            <Button type="button" variant="secondary">
              Open modal
            </Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Modal demo</ModalTitle>
              <ModalDescription>
                Modal with ModalHeader, ModalTitle, ModalDescription, and
                ModalFooter. Use for confirmations or focused content.
              </ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="button">Continue</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </section>

      {/* Section: Sheet */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Sheet
        </h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button type="button" variant="secondary">
              Open sheet
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sheet demo</SheetTitle>
              <SheetDescription>
                Sheet with SheetHeader, SheetTitle, SheetDescription. Slides in
                from the side.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
