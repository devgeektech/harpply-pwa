"use client";
import React, { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const connections = Array(7).fill({
  name: "Elena Vance",
  time: "2m ago",
  image: "https://randomuser.me/api/portraits/women/1.jpg",
});

const Connectionlist = () => {
  const [activeTab, setActiveTab] = useState("new");
  return (
    <div className="flex sm:items-center items-start justify-center sm:px-4 px-0 pb-[50px] md:py-[50px] sm:py-4 w-full">
    <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
      <CardContent className="flex flex-col gap-2 sm:p-10 sm:px-6 px-0 text-left">
        <div className="text-left text-white w-full">
          <Link href="/">
            <ChevronLeft size={24} />
          </Link>
        </div>
        <h2 className="text-[20px] mb-4 text-white text-left">Your Connections</h2>

        <Tabs defaultValue="new" className="w-full">
        <TabsList variant="line">
        <TabsTrigger value="overview" className="cursor-pointer text-white">Overview</TabsTrigger>
        <TabsTrigger value="analytics" className="cursor-pointer text-white">Analytics</TabsTrigger>
        <TabsTrigger value="reports" className="cursor-pointer text-white">Reports</TabsTrigger>
      </TabsList>
        {/* <TabsList className="bg-transparent border-0 gap-4" variant="line">
  
  <TabsTrigger
    value="new"
    className="
      relative px-0 pb-2 cursor-pointer
      text-sm font-medium text-white/70
      hover:text-[#C39936]
      data-[state=active]:text-[#C39936]
      data-[state=active]:border-b-2
      data-[state=active]:border-b-solid
      data-[state=active]:border-[#C39936]
      data-[state=active]:bg-transparent
    "
  >
    New
  </TabsTrigger>

  <TabsTrigger
    value="matched"
    className="
      relative px-0 pb-2 cursor-pointer
      text-sm font-medium text-white/70
      border-none
      hover:text-[#C39936]
      data-[state=active]:text-[#C39936]
      data-[state=active]:border-b-2
      data-[state=active]:border-[#C39936]
      data-[state=active]:bg-transparent
    "
  >
    Matched
  </TabsTrigger>

</TabsList> */}
          <TabsContent value="new">
            <Card>
              <CardHeader>
                <CardTitle>New</CardTitle>
                <CardDescription>
                  View your new connections.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                You have 12 new connections.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="matched">
            <Card>
              <CardHeader>
                <CardTitle>Matched</CardTitle>
                <CardDescription>
                  View your matched connections.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                You have 12 matched connections.
              </CardContent>
            </Card>
          </TabsContent>    

        </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Connectionlist;
