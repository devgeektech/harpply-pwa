import { useMemo } from "react";
import {
  CircleUserRound,
  KeyRound,
  LogOut,
  // Search,
  // X,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui";

// const suggestionsData = ["Dashboard", "Users", "Admin"];

export function AdminHeader({
  displayName,
  subtitle,
  onNavigate,
  onLogout,
}: {
  displayName: string;
  subtitle?: string;
  onNavigate: (to: "/dashboard" | "/users" | "/change-password") => void;
  onLogout: () => void;
}) {
  // const [query, setQuery] = useState("");
  // const [showDropdown, setShowDropdown] = useState(false);

  // const filteredSuggestions = suggestionsData.filter((item) =>
  //   item.toLowerCase().includes(query.toLowerCase())
  // );

  const initials = useMemo(() => {
    const name = (displayName ?? "").trim();
    if (!name) return "A";
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
  }, [displayName]);

  // const applySuggestion = (item: string) => {
  //   setQuery(item);
  //   setShowDropdown(false);
  //   if (item === "Dashboard") onNavigate("/dashboard");
  //   if (item === "Users") onNavigate("/users");
  //   if (item === "Admin") onNavigate("/dashboard");
  // };

  return (
    <header className="border-b border-white/10 bg-white flex items-center justify-between px-3 sm:px-6 py-2 shrink-0">
      <button
        type="button"
        onClick={() => onNavigate("/dashboard")}
        className="sm:me-12 text-left cursor-pointer bg-transparent border-none p-0"
        aria-label="Harpply Admin home"
      >
        <img
          src="/images/logoblack.png"
          className="min-w-[93px] min-h-[30px] max-h-[30px] w-auto object-contain object-left"
          alt="Harpply"
          width={93}
          height={30}
        />
      </button>

      {/* <div className="hidden sm:flex items-center gap-2 w-full relative">
        <Button className="absolute left-2 top-1/2 -translate-y-1/2 bg-transparent border-none px-2 pointer-events-none">
          <Search className="text-gray-400" size={18} />
        </Button>

        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black bg-transparent border-none cursor-pointer p-0"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        ) : null}

        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          placeholder="Search"
          className="h-[40px] text-base shadow-none focus-visible:ring-0 border border-gray-200 rounded-full pl-10 pr-10"
        />

        {showDropdown && query ? (
          <div className="absolute top-[110%] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-md z-50">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((item, index) => (
                <div
                  key={index}
                  role="button"
                  tabIndex={0}
                  onMouseDown={() => applySuggestion(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") applySuggestion(item);
                  }}
                  className="px-4 py-2 cursor-pointer rounded-md hover:bg-gray-100"
                >
                  {item}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-400">No results found</div>
            )}
          </div>
        ) : null}
      </div> */}

      <div className="items-center gap-2 sm:gap-3 ms-2 sm:ms-3 me-0 sm:me-4 flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              type="button"
              className="hidden sm:flex border-none relative bg-[#F5F3ED] p-2 rounded-full h-[50px] w-[50px] cursor-pointer"
            >
              <img
                src="/images/bell-icon.svg"
                alt="Notifications"
                width={30}
                height={30}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-[12px] border-[#C39936]/50 bg-gradient-to-b from-[rgba(100,28,60,0.3)] to-[rgba(7,1,26,0.74)] min-w-[280px]">
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-default focus:bg-white/5">
                <p className="text-sm text-white/80 py-2">
                  No new notifications.
                </p>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              type="button"
              className="border-none h-auto relative bg-[#F5F3ED] py-[8px] sm:py-[10px] px-[8px] sm:px-[10px] md:rounded-[8px] rounded-full cursor-pointer whitespace-nowrap"
            >
              <span className="hidden md:flex text-sm font-medium text-[#C39936] items-center gap-2 whitespace-nowrap">
                {displayName || "Admin"}
                <img
                  src="/images/circle-down.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </span>
              <span className="flex md:hidden text-[18px] font-medium text-[#C39936] items-center gap-2 whitespace-nowrap">
                <Avatar>
                  <AvatarImage alt={displayName} />
                  <AvatarFallback className="text-[18px] font-medium text-[#C39936]">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-[12px] border-[#C39936]/50 bg-gradient-to-b from-[rgba(100,28,60,0.3)] to-[rgba(7,1,26,0.74)]">
            {subtitle ? (
              <>
                <div className="px-2 py-1.5 text-xs text-[#C39936]/80 truncate max-w-[240px]">
                  {subtitle}
                </div>
                <DropdownMenuSeparator className="bg-white/10" />
              </>
            ) : null}
            <DropdownMenuItem
              className="cursor-pointer text-sm font-medium text-[#C39936]"
              onSelect={() => onNavigate("/dashboard")}
            >
              <CircleUserRound className="text-[#C39936]" /> Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              className="cursor-pointer text-sm font-medium text-[#C39936]"
              onSelect={() => onNavigate("/change-password")}
            >
              <KeyRound className="text-[#C39936]" /> Change password
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              className="cursor-pointer text-sm font-medium text-[#C39936]"
              onSelect={() => onLogout()}
            >
              <LogOut className="text-[#C39936]" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
