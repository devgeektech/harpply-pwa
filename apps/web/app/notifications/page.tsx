"use client";

import Link from "next/link";
import { Card, CardContent } from "@repo/ui";
import { ArrowLeft } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Appointment Success",
    desc: "You have successfully booked your appointment with Dr. Emily Walker.",
    time: "1 min",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    title: "Schedule Changed",
    desc: "You have successfully changed your appointment with Dr. Emily Walker.",
    time: "2 min",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    title: "Video Call Appointment",
    desc: "We’ll send you a link to join the call at the booking details.",
    time: "5 min",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 4,
    title: "Appointment Cancelled",
    desc: "You have successfully cancelled your appointment with Dr. Emily Walker.",
    time: "10 min",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 5,
    title: "Schedule Changed",
    desc: "You have successfully changed your appointment with Dr. Emily Walker.",
    time: "15 min",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 6,
    title: "Appointment Success",
    desc: "You have successfully booked your appointment with Dr. Emily Walker.",
    time: "25 min",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 7,
    title: "Video Call Appointment",
    desc: "We’ll send you a link to join the call at the booking details.",
    time: "30 min",
    color: "bg-blue-100 text-blue-600",
  },
];

export default function NotificationPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center sm:px-4 py-6">
      <Card className="pt-0 mb-5 w-full max-w-[620px] bg-transparent md:bg-[url('/images/bg_auth_center.png')] bg-cover bg-center backdrop-blur-xl border border-[#C8A851]/18 rounded-2xl shadow-2xl">
        <CardContent className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex justify-between mb-6">
            <Link href="/dashboard/setting">
              <ArrowLeft className="text-white cursor-pointer" />
            </Link>
            <h2 className="text-white text-xl font-normal">Notification</h2>
          </div>

          {/* Notification List */}
          <div className="divide-y divide-[#C8A851]/18">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between py-4 gap-3"
              >
                {/* Left */}
                <div className="flex items-start gap-3">
                  {/* Icon Circle */}
                  <div
                    className={`min-w-10 w-10 min-h-10 h-10 flex items-center justify-center rounded-full ${item.color}`}
                  >
                    📅
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-white text-base font-normal">
                      {item.title}
                    </p>
                    <p className="text-white/60 text-sm mt-1 leading-[1.4]">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <p className="text-white/50 text-xs whitespace-nowrap">
                  {item.time}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
