"use client";

import type React from "react";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Phone, ArrowLeft, Bell } from "lucide-react";

const conversations = [
  {
    id: 1,
    doctor: "Dr. Matthew",
    specialty: "Cardiologist",
    lastMessage: "Hello, thank you...",
    time: "2:30 PM",
    unread: 1,
    image: "/placeholder.svg?height=40&width=40",
    online: true,
  },
  {
    id: 2,
    doctor: "Kathryn Murphy",
    specialty: "Dermatologist",
    lastMessage: "Hello, thank you...",
    time: "11:45 AM",
    unread: 0,
    image: "/placeholder.svg?height=40&width=40",
    online: false,
  },
  {
    id: 3,
    doctor: "Darlene Robertson",
    specialty: "Pediatrician",
    lastMessage: "Hello, thank you...",
    time: "Yesterday",
    unread: 0,
    image: "/placeholder.svg?height=40&width=40",
    online: true,
  },
  {
    id: 4,
    doctor: "Dianne Russell",
    specialty: "Neurologist",
    lastMessage: "Hello, thank you...",
    time: "Yesterday",
    unread: 0,
    image: "/placeholder.svg?height=40&width=40",
    online: false,
  },
  {
    id: 5,
    doctor: "Bessie Cooper",
    specialty: "Orthopedist",
    lastMessage: "Hello, thank you...",
    time: "2 days ago",
    unread: 0,
    image: "/placeholder.svg?height=40&width=40",
    online: true,
  },
  {
    id: 6,
    doctor: "Eleanor Pena",
    specialty: "Psychiatrist",
    lastMessage: "Hello, thank you...",
    time: "3 days ago",
    unread: 0,
    image: "/placeholder.svg?height=40&width=40",
    online: false,
  },
  {
    id: 7,
    doctor: "Brooklyn Simmons",
    specialty: "Ophthalmologist",
    lastMessage: "Hello, thank you...",
    time: "1 week ago",
    unread: 0,
    image: "/placeholder.svg?height=40&width=40",
    online: true,
  },
];

const messages = [
  {
    id: 1,
    sender: "doctor",
    content: "Hello",
    time: "2:25 PM",
    label: "First Message from doctor",
  },
  {
    id: 2,
    sender: "doctor",
    content:
      "How are you feeling today? I hope you're following the medication schedule we discussed.",
    time: "2:26 PM",
    label: "First Message from doctor for men",
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [newMessage, setNewMessage] = useState("");
  const [isMobileConversationOpen, setIsMobileConversationOpen] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [conversationMessages, setConversationMessages] = useState(messages);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: conversationMessages.length + 1,
        sender: "patient" as const,
        content: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        label: "Your Message",
      };
      setConversationMessages([...conversationMessages, newMsg]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 w-full p-3">
      {/* Main Content */}
      <div className="lg:ml-64 flex flex-col border-[0.5px] border-gray-100 rounded-xl h-screen bg-red-300 ">
        {/* Top Header */}
        <div className="h-16 bg-white flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-900 ml-12 lg:ml-0">
              Messages
            </h1>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search - Hide on small screens */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for anything"
                className="pl-10 w-32 md:w-60 lg:w-80"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>

            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="Albert Flores"
                />
                <AvatarFallback>AF</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-sm">
                <p className="font-medium">Albert Flores</p>
                <p className="text-xs text-gray-500">Patient</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Conversations List */}
          <div
            className={`w-full md:w-80 bg-white flex-shrink-0 ${
              isMobileConversationOpen ? "hidden md:flex" : "flex"
            } flex-col`}
          >
            <div className="p-4 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => {
                    setSelectedConversation(conversation);
                    setIsMobileConversationOpen(true);
                  }}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation.id === conversation.id
                      ? "bg-blue-50 border-blue-200"
                      : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative flex-shrink-0">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={conversation.image || "/placeholder.svg"}
                          alt={conversation.doctor}
                        />
                        <AvatarFallback>
                          {conversation.doctor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-sm truncate">
                          {conversation.doctor}
                        </h3>
                        {conversation.unread > 0 && (
                          <Badge className="bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center p-0">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-blue-600 mb-1">
                        {conversation.specialty}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div
            className={`flex-1 flex flex-col ${
              !isMobileConversationOpen ? "hidden md:flex" : "flex"
            }`}
          >
            {/* Chat Header */}
            <div className="bg-white p-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden"
                    onClick={() => setIsMobileConversationOpen(false)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="relative flex-shrink-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={selectedConversation.image || "/placeholder.svg"}
                        alt={selectedConversation.doctor}
                      />
                      <AvatarFallback>
                        {selectedConversation.doctor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold truncate">
                      {selectedConversation.doctor}
                    </h3>
                    <p className="text-sm text-blue-600 truncate">
                      {selectedConversation.specialty}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="hidden sm:flex"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
              {conversationMessages.map((message) => (
                <div key={message.id} className="space-y-2">
                  {message.label && (
                    <div className="text-center">
                      <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                        {message.label}
                      </span>
                    </div>
                  )}
                  <div
                    className={`flex ${
                      message.sender === "patient"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div className="flex items-start space-x-2 max-w-[85%] sm:max-w-xs lg:max-w-md">
                      {message.sender === "doctor" && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage
                            src={
                              selectedConversation.image || "/placeholder.svg"
                            }
                            alt={selectedConversation.doctor}
                          />
                          <AvatarFallback>
                            {selectedConversation.doctor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`px-3 sm:px-4 py-2 rounded-lg ${
                          message.sender === "patient"
                            ? "bg-blue-600 text-white rounded-br-sm"
                            : "bg-blue-50 text-gray-900 rounded-bl-sm"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "patient"
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                      {message.sender === "patient" && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage
                            src="/placeholder.svg?height=32&width=32"
                            alt="You"
                          />
                          <AvatarFallback>AF</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t-[0.2px] border-t-gray-100 p-4 flex-shrink-0">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Your Message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 !outline-none !ring-0 !border-[0.5px] border-gray-200 !focus:ring-0 !focus:outline-none"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 flex-shrink-0"
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
