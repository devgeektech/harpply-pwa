"use client"



import { Church, Calendar, RefreshCcw, Home } from "lucide-react"

import { useFaithStore } from "@/store/useFaithStore"
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui"
import AttendanceCard from "@/components/common/attendance-card"
import Link from "next/link"
import { ChevronLeft } from "lucide-react";
export default function FaithLifestylePage() {
  const {
    denomination,
    yearsInFaith,
    churchInvolvement,
    attendance,
    setDenomination,
    setYearsInFaith,
    setChurchInvolvement,
    setAttendance,
  } = useFaithStore()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#150028] to-[#070012]">

      <div className="w-[420px] rounded-2xl border border-white/10 bg-[#120021] p-8 text-white">
      <div className="flex items-center px-0 pt-4 pb-2 w-full">
        <Link
          href="/profile"
          className="flex items-center justify-center size-10 rounded-full text-white/90 hover:bg-white/10 transition-colors"
          aria-label="Back"
        >
          <ChevronLeft className="size-6" />
        </Link>
      </div>
        <p className="text-[24px] font-serif font-normal mb-6">
          Faith & Lifestyle
        </p>

        <p className="text-[20px] font-normal mb-4">
          Spiritual Journey
        </p>

        {/* Denomination */}
        <div className="mb-4">
          <p className="text-sm mb-1 text-white">Denomination</p>

          <Select
            value={denomination}
            onValueChange={setDenomination}
          >
            <SelectTrigger className="bg-white w-full h-[52px] rounded-[8px] text-black">
              <SelectValue placeholder="Non-denominational" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="non">Non-denominational</SelectItem>
              <SelectItem value="catholic">Catholic</SelectItem>
              <SelectItem value="protestant">Protestant</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Years in faith */}
        <div className="mb-4">
          <p className="text-xs mb-1 opacity-70">Years in Faith</p>

          <Select
            value={yearsInFaith}
            onValueChange={setYearsInFaith}
          >
            <SelectTrigger className="bg-gray-200 text-black">
              <SelectValue placeholder="Life-long" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="lifelong">Life-long</SelectItem>
              <SelectItem value="1-5">1-5 years</SelectItem>
              <SelectItem value="5-10">5-10 years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Church involvement */}
        <div className="mb-6">
          <p className="text-xs mb-1 opacity-70">Church Involvement</p>

          <Select
            value={churchInvolvement}
            onValueChange={setChurchInvolvement}
          >
            <SelectTrigger className="bg-gray-200 text-black">
              <SelectValue placeholder="Member" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="volunteer">Volunteer</SelectItem>
              <SelectItem value="leader">Leader</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Attendance */}
        <div className="mb-6">

          <p className="text-sm font-medium mb-1">
            Church Attendance Frequency
          </p>

          <p className="text-xs opacity-70 mb-4">
            How often do you participate in community worship?
          </p>

          <div className="grid grid-cols-2 gap-4">

            <AttendanceCard
              label="Weekly"
              icon={<Church size={28} />}
              active={attendance === "weekly"}
              onClick={() => setAttendance("weekly")}
            />

            <AttendanceCard
              label="Monthly"
              icon={<Calendar size={28} />}
              active={attendance === "monthly"}
              onClick={() => setAttendance("monthly")}
            />

            <AttendanceCard
              label="Occasionally"
              icon={<RefreshCcw size={28} />}
              active={attendance === "occasionally"}
              onClick={() => setAttendance("occasionally")}
            />

            <AttendanceCard
              label="Remote/Home"
              icon={<Home size={28} />}
              active={attendance === "remote"}
              onClick={() => setAttendance("remote")}
            />

          </div>

        </div>

        {/* Next Button */}

        <Button
          className="
          w-full
          bg-gradient-to-r
          from-yellow-400
          to-orange-600
          text-black
          font-semibold
          rounded-lg
          "
        >
          Next
        </Button>

      </div>
    </div>
  )
}