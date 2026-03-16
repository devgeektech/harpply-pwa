"use client"



import { Church, Calendar, RefreshCcw, Home } from "lucide-react"

import { useFaithStore } from "@/store/useFaithStore"
import { Button, Card, CardContent, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui"
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
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col md:gap-6 gap-3 sm:p-10 px-3 text-white">
      <div className="flex items-center px-0 pb-2 w-full">
        <Link
          href="/profile"
          className="flex items-center justify-center size-10 rounded-full text-white/90 hover:bg-white/10 transition-colors"
          aria-label="Back"
        >
          <ChevronLeft className="size-6" />
        </Link>
      </div>
        <p className="text-[24px] font-serif font-normal">
          Faith & Lifestyle
        </p>

        <p className="text-[20px] font-light">
          Spiritual Journey
        </p>

        {/* Denomination */}
        <div className="">
          <p className="text-sm mb-1 text-white">Denomination</p>

          <Select
            value={denomination}
            onValueChange={setDenomination}
          >
            <SelectTrigger className="w-full bg-[#FBFAF9] !h-[52px] rounded-[8px] text-[#1A1A1A] text-sm">
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
        <div className="">
          <p className="text-sm mb-1 text-white">Years in Faith</p>

          <Select
            value={yearsInFaith}
            onValueChange={setYearsInFaith}
          >
            <SelectTrigger className="w-full bg-[#FBFAF9] !h-[52px] rounded-[8px] text-[#1A1A1A] text-sm">
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
        <div className="">
          <p className="text-sm mb-1 text-white">Church Involvement</p>

          <Select
            value={churchInvolvement}
            onValueChange={setChurchInvolvement}
          >
            <SelectTrigger className="w-full bg-[#FBFAF9] !h-[52px] rounded-[8px] text-[#1A1A1A] text-sm">
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
        <div className="mb-4">

          <p className="text-[20px] font-light mb-4 text-white ">
            Church Attendance Frequency
          </p>

          <p className="text-sm mb-1 font-light text-white mb-4">
            How often do you participate in community worship?
          </p>

          <div className="grid grid-cols-2 gap-4">

            <AttendanceCard
              label="Weekly"
              icon={<Church size={36} />}
              active={attendance === "weekly"}
              onClick={() => setAttendance("weekly")}
            />

            <AttendanceCard
              label="Monthly"
              icon={<Calendar size={36} />}
              active={attendance === "monthly"}
              onClick={() => setAttendance("monthly")}
            />

            <AttendanceCard
              label="Occasionally"
              icon={<RefreshCcw size={36} />}
              active={attendance === "occasionally"}
              onClick={() => setAttendance("occasionally")}
            />

            <AttendanceCard
              label="Remote/Home"
              icon={<Home size={36} />}
              active={attendance === "remote"}
              onClick={() => setAttendance("remote")}
            />

          </div>

        </div>

        {/* Next Button */}

        <Button
          className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60">
          Next
        </Button>

      </CardContent>
      </Card>
    </div>
  )
}