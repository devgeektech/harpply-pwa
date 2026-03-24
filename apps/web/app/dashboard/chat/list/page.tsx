import {
  Button,
  Card,
  CardContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui";
import { ChevronLeft, Dot, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const connections = Array(7).fill({
  name: "Elena Vance",
  designation: "THE ARCHITECT",
  time: "2m ago",
  image: "https://randomuser.me/api/portraits/women/1.jpg",
});

const connectionsData = [
  {
    id: 1,
    name: "John Doe",
    designation: "THE EXPLORER",
    time: "12 hours ago",
    image: "/images/new-connect.png",
    message: "That sounds like a great plan!",
  },
  {
    id: 2,
    name: "Aman Sharma",
    designation: "THE CREATOR",
    time: "5 hours ago",
    image: "/images/new-connect.png",
    message: "Have you seen the new exhibit?",
  },
  {
    id: 3,
    name: "Priya Singh",
    designation: "THE CREATOR",
    time: "2 days ago",
    image: "/images/new-connect.png",
    message: "I've just finished the first draft of the",
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    designation: "THE CREATOR",
    time: "3 days ago",
    image: "/images/new-connect.png",
    message: "I've just finished the first draft of the",
  },
  {
    id: 5,
    name: "Sneha Patel",
    designation: "THE CREATOR",
    time: "4 days ago",
    image: "/images/new-connect.png",
    message: "I've just finished the first draft of the",
  },
  {
    id: 6,
    name: "Vikash Yadav",
    designation: "THE CREATOR",
    time: "5 days ago",
    image: "/images/new-connect.png",
    unreadcount: "2",
    message: "I've just finished the first draft of the",
  },
  {
    id: 7,
    name: "Anjali Gupta",
    designation: "THE CREATOR",
    time: "6 days ago",
    image: "/images/new-connect.png",
    unreadcount: "8",
    message: "I've just finished the first draft of the",
  },
];

const unreadConnectionsData = [
  {
    id: 1,
    name: "John Doe",
    designation: "THE EXPLORER",
    time: "12 hours ago",
    image: "/images/new-connect.png",
    unreadcount: "1",
    message: "That sounds like a great plan!",
  },
  {
    id: 2,
    name: "Aman Sharma",
    designation: "THE CREATOR",
    time: "5 hours ago",
    image: "/images/new-connect.png",
    unreadcount: "1",
    message: "Have you seen the new exhibit?",
  },
  {
    id: 3,
    name: "Priya Singh",
    designation: "THE CREATOR",
    time: "2 days ago",
    image: "/images/new-connect.png",
    unreadcount: "10",
    message: "I've just finished the first draft of the",
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    designation: "THE CREATOR",
    time: "3 days ago",
    image: "/images/new-connect.png",
    unreadcount: "4",
    message: "I've just finished the first draft of the",
  },
  {
    id: 5,
    name: "Sneha Patel",
    designation: "THE CREATOR",
    time: "4 days ago",
    image: "/images/new-connect.png",
    unreadcount: "3",
    message: "I've just finished the first draft of the",
  },
  {
    id: 6,
    name: "Vikash Yadav",
    designation: "THE CREATOR",
    time: "5 days ago",
    image: "/images/new-connect.png",
    unreadcount: "2",
    message: "I've just finished the first draft of the",
  },
  {
    id: 7,
    name: "Anjali Gupta",
    designation: "THE CREATOR",
    time: "6 days ago",
    image: "/images/new-connect.png",
    unreadcount: "8",
    message: "I've just finished the first draft of the",
  },
];

const Chatlist = () => {
  return (
    <div className="flex sm:items-center items-start justify-center sm:px-4 px-0 pb-[130px] md:py-[50px] sm:py-4 w-full">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent overflow-hidden   md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col gap-2 sm:p-10 sm:px-6 px-0 text-left">
          <Tabs defaultValue="All" className="w-full">
            <TabsList
              variant="line"
              className="!h-auto bg-transparent border-b-2 border-white/10 gap-6 w-full block"
            >
              <TabsTrigger
                value="All"
                className="size-fit py-4 me-4 w-fit cursor-pointer text-white 
               data-[state=active]:text-[#C39936]
               hover:text-[#C39936]
               data-[state=active]:after:bg-[#C39936]"
              >
                All
              </TabsTrigger>

              <TabsTrigger
                value="Unread"
                className="size-fit py-4 cursor-pointer text-white 
               data-[state=active]:text-[#C39936] w-fit
               hover:text-[#C39936]
               data-[state=active]:after:bg-[#C39936]"
              >
                Unread
              </TabsTrigger>
            </TabsList>

            <TabsContent value="All">
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
                        <h3 className="text-white text-base font-medium max-w-[150px] truncate">
                          {item.name}
                        </h3>
                        <p className="text-[#FBFAF999] text-[12px] ">
                          {item.time}
                        </p>
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <span className="py-[4px] px-[8px] rounded-[4px] bg-[#F9F6ED] text-[#C39936] text-[10px]">
                          {item.designation}
                        </span>
                        <div className="flex justify-between gap-2 w-full">
                          <p className="text-white text-sm font-light">
                            {item.message}
                          </p>
                          {Number(item.unreadcount ?? 0) > 0 && (
                            <span className="bg-[#C39936]  text-white p-[4px] text-[10px] flex items-center justify-center w-[20px] h-[20px] rounded-full">
                              {Number(item.unreadcount)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="Unread">
              {unreadConnectionsData.map((item, index) => (
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
                        <h3 className="text-white text-base font-medium max-w-[150px] truncate">
                          {item.name}
                        </h3>
                        <p className="text-[#FBFAF999] text-[12px] ">
                          {item.time}
                        </p>
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <span className="py-[4px] px-[8px] rounded-[4px] bg-[#F9F6ED] text-[#C39936] text-[10px]">
                          {item.designation}
                        </span>
                        <div className="flex justify-between gap-2 w-full">
                          <p className="text-white text-sm font-light">
                            {item.message}
                          </p>
                          {Number(item.unreadcount ?? 0) > 0 && (
                            <span className="bg-[#C39936]  text-white p-[4px] text-[10px] flex items-center justify-center w-[20px] h-[20px] rounded-full">
                              {Number(item.unreadcount)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatlist;
