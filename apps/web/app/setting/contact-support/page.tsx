"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, Button, Input, Textarea } from "@repo/ui";
import { ArrowLeft } from "lucide-react";

export default function ContactSupportPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", form);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[620px] sm:px-4 py-6">
        <Card className="pt-0 w-full bg-transparent md:bg-[url('/images/bg_auth_center.png')] bg-cover bg-center backdrop-blur-xl gap-3 border border-[#C8A851]/18 rounded-2xl shadow-2xl">
          <div className="p-4 sm:p-6 !pb-3 flex items-center justify-between gap-3">
            <Link href="/setting">
              <ArrowLeft className="text-white cursor-pointer" />
            </Link>
            <h2 className="text-white text-xl font-normal">Contact Support</h2>
          </div>

          <p className="text-white p-4 sm:px-6">
            If you need help, you can write to us here. We usually respond
            within a timely manner.
          </p>

          <CardContent className="p-4 sm:p-6 !pt-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Richardson"
                  className="border-[#C8A851]/18 bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] focus-visible:border-[#C8A851]/60 focus-visible:ring-0 focus-visible:ring-transparent h-[50px] text-white placeholder:text-white/40"
                />
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="elena.richardson@gmail.com"
                  className="border-[#C8A851]/18 bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] focus-visible:border-[#C8A851]/60 focus-visible:ring-0 focus-visible:ring-transparent h-[50px] text-white placeholder:text-white/40"
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={5}
                  className="border-[#C8A851]/18 bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] focus-visible:border-[#C8A851]/60 focus-visible:ring-0 focus-visible:ring-transparent h-[150px] text-white placeholder:text-white/40"
                />
              </div>

              <Button
                type="submit"
                className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
