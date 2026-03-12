"use client";

import { useProfileStore } from "@/store/profileStore";
import {
  Avatar,
  AvatarFallback,
  Button,
  Card,
  CardContent,
  Progress,
} from "@repo/ui";
import { Pencil } from "lucide-react";

export default function ReviewProfilePage() {
  const { name, age, location, church, bio } = useProfileStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1B0033] to-[#020012] text-white p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 p-6 bg-[#130028]/80">
        {/* Progress */}
        <div className="space-y-2 mb-6">
          <p className="text-xs text-white/60">FINAL STEP</p>
          <Progress value={80} className="h-1" />
          <p className="text-xs text-white/60">
            Review your spiritual journey profile
          </p>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold mb-6">
          Review Your Profile
        </h2>

        {/* Profile Card */}
        <Card className="bg-white text-black rounded-xl">
          <CardContent className="p-6 text-center space-y-4">
            <Avatar className="w-20 h-20 mx-auto border">
              <AvatarFallback>UP</AvatarFallback>
            </Avatar>

            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-gray-600">
                {age} • {location}
              </p>

              <p className="text-sm text-gray-500 mt-1">⛪ {church}</p>
            </div>

            {/* Bio */}
            <div className="text-sm text-gray-600 border-t pt-4 relative">
              <p>{bio}</p>

              <Pencil
                size={14}
                className="absolute right-0 top-4 text-yellow-600 cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        {/* Info Sections */}
        <div className="mt-6 space-y-3">
          <InfoRow label="Church Involvement" value="Member" />
          <InfoRow label="Years in Faith" value="5 years" />
          <InfoRow label="Church Attendance Frequency" value="Weekly" />
          <InfoRow label="My Faith Values" value="Kindness" />
          <InfoRow label="Partner Values" value="Forgiveness" />

          <div className="pt-2 text-xs text-white/60">Lifestyle Habits</div>

          <InfoRow label="Smoking" value="Never" />
          <InfoRow label="Alcohol" value="Socially" />
          <InfoRow label="Dietary Preferences" value="No specific diet" />
        </div>

        {/* Secure box */}
        <div className="mt-6 bg-[#0E1A2B] p-4 rounded-lg flex gap-3 items-start text-sm">
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-black text-xs">
            ✓
          </div>

          <div>
            <p className="font-medium">Secure Account</p>
            <p className="text-xs text-white/60">
              Your data is encrypted and kept private.
            </p>
          </div>
        </div>

        {/* Button */}
        <Button className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
          Complete Setup
        </Button>
      </div>
    </div>
  );
}

/* Row component */

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center bg-white text-black rounded-lg px-4 py-3 text-sm">
      <span>{label}</span>
      <span className="text-yellow-600 font-medium">{value}</span>
    </div>
  );
}
