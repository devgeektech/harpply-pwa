"use client"

import { useEffect, useState } from "react"
import { Church, Calendar, RefreshCcw, Home } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { useFaithStore } from "@/store/useFaithStore"
import { useProfileStore } from "@/store/profileStore"
import {
  CHURCH_ATTENDANCE_OPTIONS,
  CHURCH_INVOLVEMENT_OPTIONS,
  type ChurchAttendanceOption,
  type ChurchInvolvementOption,
} from "@/lib/constants"
import {
  Button,
  Card,
  CardContent,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui"
import AttendanceCard from "@/components/common/attendance-card"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { fetchProfile, updateFaithLifestyleProfile } from "@/lib/api/profile"
import { SUCCESS_MESSAGES } from "@/lib/messages"

/** Icons per index matching `CHURCH_ATTENDANCE_OPTIONS` order. */
const CHURCH_ATTENDANCE_ICONS = [
  <Church key="church" size={36} />,
  <Calendar key="calendar" size={36} />,
  <RefreshCcw key="refresh" size={36} />,
  <Home key="home" size={36} />,
] as const

function normalizeChurchAttendance(
  value: string | null | undefined
): ChurchAttendanceOption | "" {
  if (!value?.trim()) return ""
  const exact = CHURCH_ATTENDANCE_OPTIONS.find((o) => o === value)
  if (exact) return exact
  const ci = CHURCH_ATTENDANCE_OPTIONS.find(
    (o) => o.toLowerCase() === value.trim().toLowerCase()
  )
  return ci ?? ""
}

const LEGACY_CHURCH_INVOLVEMENT: Record<string, ChurchInvolvementOption> = {
  member: "Member",
  volunteer: "Volunteer",
  leader: "Regular Attender",
}

function normalizeChurchInvolvement(
  value: string | null | undefined
): ChurchInvolvementOption | "" {
  if (!value?.trim()) return ""
  const trimmed = value.trim()
  const exact = CHURCH_INVOLVEMENT_OPTIONS.find((o) => o === trimmed)
  if (exact) return exact
  const ci = CHURCH_INVOLVEMENT_OPTIONS.find(
    (o) => o.toLowerCase() === trimmed.toLowerCase()
  )
  if (ci) return ci
  return LEGACY_CHURCH_INVOLVEMENT[trimmed.toLowerCase()] ?? ""
}

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
  const { loaded, hydrateFromApi } = useProfileStore()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [denominationError, setDenominationError] = useState("")
  const [yearsError, setYearsError] = useState("")
  const [involvementError, setInvolvementError] = useState("")
  const [attendanceError, setAttendanceError] = useState("")

  useEffect(() => {
    if (!loaded) {
      fetchProfile()
        .then((res) => {
          if (res?.data) hydrateFromApi(res.data)
        })
        .catch(() => {})
      return
    }
    const {
      churchAttendance,
      denomination: d,
      yearsInFaith: y,
      church,
    } = useProfileStore.getState()
    setAttendance(normalizeChurchAttendance(churchAttendance))
    if (d) setDenomination(d)
    if (y != null) setYearsInFaith(String(y))
    const involvement = normalizeChurchInvolvement(church)
    if (involvement) setChurchInvolvement(involvement)
  }, [
    loaded,
    hydrateFromApi,
    setAttendance,
    setDenomination,
    setYearsInFaith,
    setChurchInvolvement,
  ])

  const handleSave = async () => {
    if (saving) return
    let hasError = false
    if (!denomination?.trim()) {
      setDenominationError("Denomination is required.")
      hasError = true
    } else {
      setDenominationError("")
    }

    if (!yearsInFaith?.trim()) {
      setYearsError("Years in faith is required.")
      hasError = true
    } else {
      const n = Number(yearsInFaith)
      if (!Number.isFinite(n) || n < 0 || n > 120) {
        setYearsError("Enter a valid number (0–120).")
        hasError = true
      } else {
        setYearsError("")
      }
    }

    if (!churchInvolvement?.trim()) {
      setInvolvementError("Church involvement is required.")
      hasError = true
    } else {
      setInvolvementError("")
    }

    if (!attendance?.trim()) {
      setAttendanceError("Church attendance is required.")
      hasError = true
    } else {
      setAttendanceError("")
    }

    if (hasError) return
    setSaving(true)
    try {
      await updateFaithLifestyleProfile({
        denomination,
        yearsInFaith: yearsInFaith ? Number(yearsInFaith) : undefined,
        churchInvolvement,
        churchAttendance: attendance || undefined,
      })
      toast.success(SUCCESS_MESSAGES.PROFILE.FAITH_LIFESTYLE_UPDATED)
      router.push("/profile/faithvalues")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update faith & lifestyle. Please try again."
      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col md:gap-6 gap-3 sm:p-10 px-3 text-white">
      <div className="flex items-center px-0 pb-2 w-full">
        <Link
          href="/profile/edit"
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
            onValueChange={(value) => {
              setDenomination(value)
              if (denominationError) setDenominationError("")
            }}
          >
            <SelectTrigger className="w-full bg-[#FBFAF9] !h-[52px] rounded-[8px] text-[#1A1A1A] text-sm">
              <SelectValue placeholder="Non-denominational" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="non-denominational">Non-denominational</SelectItem>
              <SelectItem value="catholic">Catholic</SelectItem>
              <SelectItem value="protestant">Protestant</SelectItem>
            </SelectContent>
          </Select>
          {denominationError && (
            <p className="mt-1 text-sm text-red-300">{denominationError}</p>
          )}
        </div>

        {/* Years in faith */}
        <div className="">
          <p className="text-sm mb-1 text-white">Years in Faith</p>

          <Input
            type="number"
            inputMode="numeric"
            min={0}
            max={120}
            value={yearsInFaith}
            onChange={(e) => {
              setYearsInFaith(e.target.value)
              if (yearsError) setYearsError("")
            }}
            placeholder="e.g. 5"
            className="w-full h-[52px] rounded-[8px] border-0 bg-[#FBFAF9] text-[#1A1A1A] text-sm placeholder:text-[#1A1A1A]/40 focus-visible:ring-2 focus-visible:ring-amber-500/40"
          />
          {yearsError && <p className="mt-1 text-sm text-red-300">{yearsError}</p>}
        </div>

        {/* Church involvement */}
        <div className="">
          <p className="text-sm mb-1 text-white">Church Involvement</p>

          <Select
            value={churchInvolvement || ""}
            onValueChange={(v) => {
              setChurchInvolvement(v)
              if (involvementError) setInvolvementError("")
            }}
          >
            <SelectTrigger className="w-full bg-[#FBFAF9] !h-[52px] rounded-[8px] text-[#1A1A1A] text-sm">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>

            <SelectContent>
              {CHURCH_INVOLVEMENT_OPTIONS.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {involvementError && (
            <p className="mt-1 text-sm text-red-300">{involvementError}</p>
          )}
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
            {CHURCH_ATTENDANCE_OPTIONS.map((option, index) => (
              <AttendanceCard
                key={option}
                label={option}
                icon={CHURCH_ATTENDANCE_ICONS[index]}
                active={attendance === option}
                onClick={() => {
                  setAttendance(option)
                  if (attendanceError) setAttendanceError("")
                }}
              />
            ))}
          </div>
          {attendanceError && (
            <p className="mt-2 text-sm text-red-300">{attendanceError}</p>
          )}

        </div>

        {/* Next Button */}

        <Button
          onClick={handleSave}
          disabled={saving}
          className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60">
          {saving ? "Saving..." : "Save & next"}
        </Button>

      </CardContent>
      </Card>
    </div>
  )
}