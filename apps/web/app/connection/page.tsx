"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui";
import { ChevronLeft, CircleUserRound, Dot, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";


const connectionsData = [
  {
    id: 1,
    name: "John Doe",
    time: "12 hours ago",
    image: "/images/new-connect.png",
  },
  {
    id: 2,
    name: "Aman Sharma",
    time: "5 hours ago",
    image: "/images/new-connect.png",
  },
  {
    id: 3,
    name: "Priya Singh",
    time: "2 days ago",
    image: "/images/new-connect.png",
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    time: "3 days ago",
    image: "/images/new-connect.png",
  },
  {
    id: 5,
    name: "Sneha Patel",
    time: "4 days ago",
    image: "/images/new-connect.png",
  },
  {
    id: 6,
    name: "Vikash Yadav",
    time: "5 days ago",
    image: "/images/new-connect.png",
  },
  {
    id: 7,
    name: "Anjali Gupta",
    time: "6 days ago",
    image: "/images/new-connect.png",
  },
];

const matchedConnectionsData = [
  {
    id: 1,
    name: "John Doe",
    time: "12 hours ago",
    image: "/images/new-connect.png",
  },
  {
    id: 2,
    name: "Aman Sharma",
    time: "5 hours ago",
    image: "/images/new-connect.png",
  },
  {
    id: 3,
    name: "Priya Singh",
    time: "2 days ago",
    image: "/images/new-connect.png",
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    time: "3 days ago",
    image: "/images/new-connect.png",
  },
  {
    id: 5,
    name: "Sneha Patel",
    time: "4 days ago",
    image: "/images/new-connect.png",
  },
  {
    id: 6,
    name: "Vikash Yadav",
    time: "5 days ago",
    image: "/images/new-connect.png",
  },
  {
    id: 7,
    name: "Anjali Gupta",
    time: "6 days ago",
    image: "/images/new-connect.png",
  },
];

const Connectionlist = () => {
  const router = useRouter();
  const [hasConnection] = useState(true); // Later replace with API-driven condition


  return (
    <div className="flex sm:items-center items-start justify-center sm:px-4 px-0 pb-[50px] md:py-[50px] sm:py-4 w-full">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent overflow-hidden   md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        {!hasConnection ? (
          <CardContent className="flex flex-col gap-2 sm:p-10 sm:px-6 px-0 text-left mt-[3rem] h-[80vh] sm:h-auto">
            <div className="flex items-center justify-center">
              <Image
                src="/images/noconnectionicon.png"
                alt="connection"
                width={240}
                height={240}
              />
            </div>
            <div className="flex flex-col gap-2 items-center justify-center sm:mt-[60px] mt-[20px]">
              <h2 className="text-white text-[24px] font-normal font-serif">
                No Connections Yet
              </h2>
              <p className="text-white text-[14px] font-light text-center sm:mb-[32px] mb-[20px] max-w-[400px]">
                When you both express interest, your connection will appear here.
                Keep exploring!
              </p>
              <Button className="cursor-pointer w-full text-base h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60">
                <Search /> Discover Profiles
              </Button>
              <ul className="flex items-center justify-center gap-1 text-[#C39936] mt-[2rem]">
                <li> FAITH</li>
                <li className="flex items-center gap-1">
                  <Dot className="size-4" /> PURPOSE <Dot className="size-4" />
                </li>
                <li className="flex items-center gap-1">CONNECTION</li>
              </ul>
            </div>
          </CardContent>
        ) : (
          <CardContent className="flex flex-col gap-2 sm:p-10 sm:px-6 px-0 text-left">
            <h2 className="text-[20px] pb-4 text-white md:text-left border-b-2 border-white/10">
              Your Connections
            </h2>

            <Tabs defaultValue="new" className="w-full">
              <TabsList
                variant="line"
                className="!h-auto bg-transparent border-b-2 border-white/10 gap-6 w-full block"
              >
                <TabsTrigger
                  value="new"
                  className="size-fit py-4 me-4 w-fit cursor-pointer text-white 
               data-[state=active]:text-[#C39936]
               hover:text-[#C39936]
               data-[state=active]:after:bg-[#C39936]"
                >
                  New
                </TabsTrigger>

                <TabsTrigger
                  value="matched"
                  className="size-fit py-4 cursor-pointer text-white 
               data-[state=active]:text-[#C39936] w-fit
               hover:text-[#C39936]
               data-[state=active]:after:bg-[#C39936]"
                >
                  Matched
                </TabsTrigger>
              </TabsList>

              <TabsContent value="new">
                {connectionsData.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 w-full border-b-2 border-[#E7ECF214] py-[1rem]"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div className="rounded-full">
                        <Image
                          src={item.image}
                          alt="connection"
                          width={62}
                          height={62}
                        />
                      </div>
                      <div className="flex flex-col gap-2  w-full">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-white text-base font-normal max-w-[150px] truncate">
                            {item.name}
                          </h3>
                          <p className="text-[#FBFAF999] text-[12px] ">
                            {item.time}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button className="cursor-pointer w-auto text-base bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60 rounded-[5px]">
                            View
                          </Button>
                          <Button className="bg-[#FBFAF9] hover:bg-[#FBFAF9] text-[#1A1A1A] text-base border-white/10 cursor-pointer hover:opacity-90 rounded-[5px]">
                            Accept
                          </Button>
                          <Button className="bg-[#FDC8C8] hover:bg-[#FDC8C8] text-[#FB2424] text-base border-white/10 cursor-pointer hover:opacity-90 rounded-[5px]">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="matched">
                {matchedConnectionsData.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 w-full border-b-2 border-[#E7ECF214] py-[1rem]"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div className="rounded-full">
                        <Image
                          src={item.image}
                          alt="connection"
                          width={62}
                          height={62}
                        />
                      </div>
                      <div className="flex flex-col gap-2  w-full">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-white text-base font-normal max-w-[150px] truncate">
                            {item.name}
                          </h3>
                          <p className="text-[#FBFAF999] text-[12px] ">
                            {item.time}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button className="cursor-pointer w-auto text-base bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60 rounded-[5px]">
                            View
                          </Button>
                          <Button
                          onClick={() => router.push(`/chat/chatbox`)}
                           className="bg-[#FBFAF9] hover:bg-[#FBFAF9] text-[#1A1A1A] text-base border-white/10 cursor-pointer hover:opacity-90 rounded-[5px]"
                           >
                            Chat
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default Connectionlist;
