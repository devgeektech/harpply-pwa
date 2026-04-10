"use client";

import Link from "next/link";
import { Card, CardContent } from "@repo/ui";
import { ArrowLeft } from "lucide-react";
import Notifications from "@/icons/notifications";

const notifications = [
  {
    id: 1,
    title: "Appointment Success",
    desc: "You have successfully booked your appointment with Dr. Emily Walker.",
    time: "1 min",
  },
  {
    id: 2,
    title: "Schedule Changed",
    desc: "You have successfully changed your appointment with Dr. Emily Walker.",
    time: "2 min",
  },
  {
    id: 3,
    title: "Video Call Appointment",
    desc: "We’ll send you a link to join the call at the booking details.",
    time: "5 min",
  },
  {
    id: 4,
    title: "Appointment Cancelled",
    desc: "You have successfully cancelled your appointment with Dr. Emily Walker.",
    time: "10 min",
  },
  {
    id: 5,
    title: "Schedule Changed",
    desc: "You have successfully changed your appointment with Dr. Emily Walker.",
    time: "15 min",
  },
  {
    id: 6,
    title: "Appointment Success",
    desc: "You have successfully booked your appointment with Dr. Emily Walker.",
    time: "25 min",
  },
  {
    id: 7,
    title: "Video Call Appointment",
    desc: "We’ll send you a link to join the call at the booking details.",
    time: "30 min",
  },
];

export default function NotificationPage() {
  return (
    <>
      <style jsx global>{`
        /* Apply only when body has 'no-scroll' class */
        body.no-scroll .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        body .no-scrollbar {
          -ms-overflow-style: none; /* IE & Edge */
          scrollbar-width: none; /* Firefox */
        }
        body:has(.no-scrollbar) {
          overflow: hidden;
        }
        .scroll-show {
          overflow-y: scroll;
        }
      `}</style>
      <div className="h-screen overflow-auto no-scrollbar scroll-show flex justify-center">
        <div className="w-full max-w-[620px] sm:px-4 py-6">
          <Card className="pt-0 mb-5 w-full bg-transparent md:bg-[url('/images/bg_auth_center.png')] bg-cover bg-center backdrop-blur-xl border border-[#C8A851]/18 rounded-2xl shadow-2xl">
            {/* ✅ Sticky Header */}
            <div className="sticky top-0 z-10 p-4 sm:p-6 !pb-3 rounded-t-2xl bg-[#15003c] flex justify-between items-center">
              <Link href="/setting">
                <ArrowLeft className="text-white cursor-pointer" />
              </Link>
              <h2 className="text-white text-xl font-normal">Notification</h2>
            </div>

            {/* ✅ Scroll Content */}
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="divide-y divide-[#C8A851]/18">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between py-4 gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="min-w-10 w-10 min-h-10 h-10 flex items-center justify-center rounded-full bg-[#FAF5EB]">
                        <Notifications />
                      </div>

                      <div>
                        <p className="text-white text-base font-normal">
                          {item.title}
                        </p>
                        <p className="text-white/60 text-sm mt-1 leading-[1.4]">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <p className="text-white/50 text-xs whitespace-nowrap">
                      {item.time}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
