// events/page.tsx
"use client";
import logoImage from "../../public/logo.png";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface Event {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  date: string;
  time: string;
  location: string;
  slug: string;
  category: string;
  type: "Workshop" | "Summit" | "Competition" | "Gala" | "Community Event";
  status: "Upcoming" | "Ongoing" | "Completed";
  registrationRequired: boolean;
  maxParticipants?: number;
  currentParticipants?: number;
}

interface NavItem {
  name: string;
  href: string;
}

// Data
const events: Event[] = [
  {
    id: 1,
    title: "Enactus Innovation Summit",
    description:
      "A summit focused on innovative solutions for social challenges.",
    fullDescription:
      "Join us for an inspiring day of innovation, collaboration, and social impact. The Enactus Innovation Summit brings together students, entrepreneurs, and changemakers to explore cutting-edge solutions for pressing social challenges. Featuring keynote speakers, panel discussions, workshops, and networking opportunities.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpQIlpyJirmYYPk_QaLwp0mXq1uE6z5U2QOmy27uFN_rMMbu5x9kab1jMvuszEXeRvIYPmjsJZkCTYRfnXNlIYRQVtXEJcMxfGMf-dC9t_mQSxAWp6fj1IILkt38VphmeAgC8IIB2hfv8EkgHFikaeva4AJ9xN9qSyp4yRHjN5Jfhyte_raLx2WBGHAiqeBJg-9obk9PL36g06svBW_wIWGol1iPUFLxvYy8YVucw0mz_eG_lOC2S8vNEvS9hUP2f7CQoYxC5C19ji",
    date: "2024-08-15",
    time: "09:00 AM - 05:00 PM",
    location: "Miranda House Auditorium",
    slug: "innovation-summit",
    category: "Innovation",
    type: "Summit",
    status: "Completed",
    registrationRequired: true,
    maxParticipants: 200,
    currentParticipants: 180,
  },
  {
    id: 2,
    title: "Social Entrepreneurship Workshop",
    description:
      "A workshop to develop entrepreneurial skills for social good.",
    fullDescription:
      "Learn the fundamentals of social entrepreneurship in this hands-on workshop. Discover how to identify social problems, develop innovative solutions, and build sustainable business models that create positive impact. Perfect for aspiring social entrepreneurs and changemakers.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAL5Gl4powpAJWaPVxlAoX-XelH35J663_VnQH9DTZKbMGJ1TIgx7mNki6RT2bGv6r96Jj9jPMNE_DZ1MnArTZfWaEIOXaeYG_K6M9kewMkGYlN_dycDVY1_Viuvc0YZPsoh0FQkXfnUxSrDXcLSVxWVXRvNJAstG9rTRB_121Hqh16qpGesTqvjm5FFGS4VyKf5jQE1hqEDPcQfxg2hivCAhYW3XRZNVX9ow54iOAgYDXqA5X7VQLMBgF_WH0FeXRkl_sY4bYXN__V",
    date: "2024-09-20",
    time: "02:00 PM - 06:00 PM",
    location: "Conference Room A",
    slug: "entrepreneurship-workshop",
    category: "Education",
    type: "Workshop",
    status: "Upcoming",
    registrationRequired: true,
    maxParticipants: 50,
    currentParticipants: 35,
  },
  {
    id: 3,
    title: "Community Impact Day",
    description:
      "A day dedicated to making a positive impact in the community.",
    fullDescription:
      "Join us for a day of community service and impact. We'll be working on various projects including environmental cleanup, educational activities with local children, and community outreach programs. A perfect opportunity to give back and make a tangible difference.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTO3T-t9xtVd3NKJr491PClO_LcBcUZQJUj6ozlXy7t9oz7nQbXGtyFIoQMt8D4nlF-WgHcsX9b-AVqIMPG_xjV79ieY2-fttm44TB65zLHZOzx6qsxCCAR-scXs6a926Kk5A-HC8h0Kj-Ri4H0Cw2wc3Ux1Jn0GX3SkzEthXtHiB4XedP5KZ1O3ciZ0UsnKuHjAIlRw0iisKIN99_gLbrqHL0H0XyriDj8ftiRrbT39EttY5hogcN12im0ntwQbQSjCILn461S_Ei",
    date: "2024-10-10",
    time: "08:00 AM - 04:00 PM",
    location: "Various Community Centers",
    slug: "community-impact-day",
    category: "Community Service",
    type: "Community Event",
    status: "Upcoming",
    registrationRequired: true,
    maxParticipants: 100,
    currentParticipants: 72,
  },
  {
    id: 4,
    title: "Enactus Annual Gala",
    description: "An annual event celebrating the achievements of Enactus.",
    fullDescription:
      "Celebrate a year of impact and achievement at our Annual Gala. Join us for an evening of recognition, networking, and inspiration as we honor outstanding projects, partnerships, and individuals who have made significant contributions to our mission of positive social impact.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBM-EVXUFEZoQWTMUraT7yxfsTYyxFMXskKsJ5zGFSbbbCWXInz1qqK1g-FENZmVIM-XhwFEocHb4sE7l5v-rH2N0Y0lxLDMEgtv9QBjs8IEORDuSH96aWw3QT3Vo-dT18zLPMiWzSrXM1EoME8QHcEBcsoVk06nbGZQnOQFx9gkZx2MA3FeflWiHuPEBmfMbHoyPBLY4LcpqrBSHggu2si_eM3tmDKlwh687pEfRbs9r7JtG_lk4-fhSRHqro7OHePWclC5gQVRMXQ",
    date: "2024-11-25",
    time: "06:00 PM - 10:00 PM",
    location: "Grand Ballroom, Hotel Imperial",
    slug: "annual-gala",
    category: "Celebration",
    type: "Gala",
    status: "Upcoming",
    registrationRequired: true,
    maxParticipants: 300,
    currentParticipants: 150,
  },
  {
    id: 5,
    title: "Startup Pitch Competition",
    description: "Compete with innovative startup ideas for social impact.",
    fullDescription:
      "Present your startup idea that addresses a social challenge and compete for exciting prizes! This competition is open to all students and entrepreneurs with innovative solutions for social problems. Judges include industry experts, investors, and successful social entrepreneurs.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpQIlpyJirmYYPk_QaLwp0mXq1uE6z5U2QOmy27uFN_rMMbu5x9kab1jMvuszEXeRvIYPmjsJZkCTYRfnXNlIYRQVtXEJcMxfGMf-dC9t_mQSxAWp6fj1IILkt38VphmeAgC8IIB2hfv8EkgHFikaeva4AJ9xN9qSyp4yRHjN5Jfhyte_raLx2WBGHAiqeBJg-9obk9PL36g06svBW_wIWGol1iPUFLxvYy8YVucw0mz_eG_lOC2S8vNEvS9hUP2f7CQoYxC5C19ji",
    date: "2024-12-05",
    time: "01:00 PM - 06:00 PM",
    location: "Innovation Hub",
    slug: "startup-pitch-competition",
    category: "Competition",
    type: "Competition",
    status: "Upcoming",
    registrationRequired: true,
    maxParticipants: 30,
    currentParticipants: 18,
  },
  {
    id: 6,
    title: "Digital Literacy Training",
    description: "Free digital literacy training for community members.",
    fullDescription:
      "Help bridge the digital divide by volunteering in our digital literacy training program. We provide free computer and internet training to community members of all ages. Volunteers will assist in teaching basic computer skills, internet navigation, and digital safety.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAL5Gl4powpAJWaPVxlAoX-XelH35J663_VnQH9DTZKbMGJ1TIgx7mNki6RT2bGv6r96Jj9jPMNE_DZ1MnArTZfWaEIOXaeYG_K6M9kewMkGYlN_dycDVY1_Viuvc0YZPsoh0FQkXfnUxSrDXcLSVxWVXRvNJAstG9rTRB_121Hqh16qpGesTqvjm5FFGS4VyKf5jQE1hqEDPcQfxg2hivCAhYW3XRZNVX9ow54iOAgYDXqA5X7VQLMBgF_WH0FeXRkl_sY4bYXN__V",
    date: "2024-10-15",
    time: "10:00 AM - 12:00 PM",
    location: "Community Computer Center",
    slug: "digital-literacy-training",
    category: "Education",
    type: "Workshop",
    status: "Ongoing",
    registrationRequired: false,
  },
];

// Icons
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 256 256"
    className={className}
  >
    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
  </svg>
);

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 256 256"
    className={className}
  >
    <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z" />
  </svg>
);

const LocationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 256 256"
    className={className}
  >
    <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z" />
  </svg>
);

const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 256 256"
    className={className}
  >
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
  </svg>
);

// Main Component
export default function EventsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Events", href: "/events" },
    { name: "Team", href: "/team" },
    { name: "Store", href: "/store" },
    { name: "Contact", href: "/contact" },
  ];

  const categories = [
    "All",
    "Innovation",
    "Education",
    "Community Service",
    "Celebration",
    "Competition",
  ];
  const statuses = ["All", "Upcoming", "Ongoing", "Completed"];
  const types = [
    "All",
    "Workshop",
    "Summit",
    "Competition",
    "Gala",
    "Community Event",
  ];

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" || event.status === selectedStatus;
    const matchesType = selectedType === "All" || event.type === selectedType;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesType && matchesSearch;
  });

  // Sort events by date (upcoming first, then by date)
  const sortedEvents = filteredEvents.sort((a, b) => {
    if (a.status === "Upcoming" && b.status !== "Upcoming") return -1;
    if (b.status === "Upcoming" && a.status !== "Upcoming") return 1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      case "Ongoing":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex flex-col flex-grow">
        {/* Navbar */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#f0f4f4] shadow-sm"
        >
          <div className="flex items-center justify-between whitespace-nowrap px-4 lg:px-10 py-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 text-[#111817]"
            >
              <div className="relative size-8">
                <Image
                  src={logoImage}
                  alt="Enactus Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-[#111817] text-lg font-bold leading-tight tracking-[-0.015em]">
                Enactus
              </h2>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-end gap-8">
              <nav className="flex items-center gap-6 xl:gap-9">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={`text-sm font-medium leading-normal transition-colors duration-200 relative group ${
                        item.name === "Events"
                          ? "text-[#13ebc7]"
                          : "text-[#111817] hover:text-[#13ebc7]"
                      }`}
                    >
                      {item.name}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-[#13ebc7] transition-all duration-200 ${
                          item.name === "Events"
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#f0f4f4] text-[#111817] gap-2 text-sm font-bold leading-normal tracking-[0.015em] px-3 hover:bg-[#e5e9e9] transition-colors duration-200"
              >
                <SearchIcon />
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuArFaV1-Xb0B6T8Ixut8louoDUVOtU6LHl8ZmucaFPi4-wEGkD-2QCwMZ86K_7s5thQ8dT0T8olqOnnNOtB99O6UPLWd8s5Toee6IvMbYuLhHD-0nAxXhu7sDIgbljz9_ai5Jcplc1kpaV1GAmax5zMOWLr34VehGjwBwqyEGtAREZpDLs1g3NH2i9nhnKiTdvDDxVqrCsg2SPpnAfH6ZDCNRtSzpS5FxKLhUm-5JgHBk1bA79_w-SZDPRZiejNL2PrPHgZiIztQGGs")',
                }}
              />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
            >
              <div className="w-6 h-6 flex flex-col justify-around">
                <motion.span
                  animate={
                    isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                  }
                  className="w-full h-0.5 bg-[#111817] block transition-all duration-200"
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-[#111817] block transition-all duration-200"
                />
                <motion.span
                  animate={
                    isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                  }
                  className="w-full h-0.5 bg-[#111817] block transition-all duration-200"
                />
              </div>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden bg-white border-t border-[#f0f4f4] overflow-hidden"
              >
                <nav className="flex flex-col p-4 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block py-2 px-4 rounded-lg transition-colors duration-200 ${
                          item.name === "Events"
                            ? "bg-[#13ebc7] text-[#111817]"
                            : "text-[#111817] hover:bg-[#f0f4f4]"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        <div className="px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-40 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            {/* Hero Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111817] mb-4">
                Our Events
              </h1>
              <p className="text-lg text-[#618983] max-w-2xl mx-auto">
                Join us for inspiring events that bring together changemakers,
                innovators, and community leaders to create positive social
                impact.
              </p>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 space-y-4"
            >
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-[#f0f4f4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13ebc7] focus:border-transparent"
                />
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#618983]" />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-4">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-[#618983] flex items-center">
                    Category:
                  </span>
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                        selectedCategory === category
                          ? "bg-[#13ebc7] text-[#111817]"
                          : "bg-[#f0f4f4] text-[#618983] hover:bg-[#e5e9e9]"
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>

                {/* Status Filter */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-[#618983]">
                    Status:
                  </span>
                  {statuses.map((status) => (
                    <motion.button
                      key={status}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                        selectedStatus === status
                          ? "bg-[#13ebc7] text-[#111817]"
                          : "bg-[#f0f4f4] text-[#618983] hover:bg-[#e5e9e9]"
                      }`}
                    >
                      {status}
                    </motion.button>
                  ))}
                </div>

                {/* Type Filter */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-[#618983]">
                    Type:
                  </span>
                  {types.map((type) => (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                        selectedType === type
                          ? "bg-[#13ebc7] text-[#111817]"
                          : "bg-[#f0f4f4] text-[#618983] hover:bg-[#e5e9e9]"
                      }`}
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Events Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            >
              {sortedEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 },
                  }}
                  className="group"
                >
                  <Link href={`/events/${event.slug}`}>
                    <div className="bg-white rounded-xl shadow-sm border border-[#f0f4f4] overflow-hidden cursor-pointer transition-shadow duration-300 group-hover:shadow-lg">
                      <div
                        className="w-full h-48 bg-center bg-cover transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url("${event.image}")` }}
                      />
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              event.status
                            )}`}
                          >
                            {event.status}
                          </span>
                          <span className="text-xs text-[#618983]">
                            {event.type}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#111817] mb-2 group-hover:text-[#13ebc7] transition-colors duration-200">
                          {event.title}
                        </h3>
                        <p className="text-[#618983] text-sm mb-4 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-[#618983]">
                            <CalendarIcon className="size-4" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-[#618983]">
                            <ClockIcon className="size-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-[#618983]">
                            <LocationIcon className="size-4" />
                            <span>{event.location}</span>
                          </div>
                          {event.registrationRequired &&
                            event.maxParticipants && (
                              <div className="text-xs text-[#13ebc7] font-medium">
                                {event.currentParticipants}/
                                {event.maxParticipants} registered
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* No Results Message */}
            {sortedEvents.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <h3 className="text-xl font-medium text-[#618983] mb-2">
                  No events found
                </h3>
                <p className="text-[#618983]">
                  Try adjusting your search criteria or filters.
                </p>
              </motion.div>
            )}

            {/* Call to Action */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center bg-[#f0f4f4] rounded-xl p-8 mt-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111817] mb-4">
                Stay Updated
              </h2>
              <p className="text-[#618983] mb-6 max-w-2xl mx-auto">
                Don't miss out on our upcoming events! Subscribe to our
                newsletter or follow us on social media to get the latest
                updates on events, workshops, and initiatives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-[#13ebc7] text-[#111817] rounded-xl font-bold hover:bg-[#11d4b4] transition-colors duration-200"
                >
                  Subscribe to Newsletter
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-[#111817] border border-[#13ebc7] rounded-xl font-bold hover:bg-[#13ebc7] hover:text-[#111817] transition-colors duration-200"
                >
                  Follow Us
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
