"use client";

import { Heading5 } from "@/components/atoms/Typography";
import { Checkbox } from "@/components/atoms/Checkbox";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TablePagination,
  TableActions,
} from "@/components/molecules/table";
import { useState, useMemo } from "react";
import Image from "next/image";
import { SearchBarTable } from "@/components/molecules/searchBar/SearchBarTable";
import { useUsers, User } from "@/services";

const UsersContent = () => {
  const { data, isLoading, isError } = useUsers();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All Status" | "Active" | "Inactive"
  >("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const users = data?.users ?? [];

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All Status" ||
        (statusFilter === "Active" && user.isActive) ||
        (statusFilter === "Inactive" && !user.isActive);
      return matchesSearch && matchesStatus;
    });
  }, [users, searchQuery, statusFilter]);

  const sortedUsers = useMemo(() => {
    if (!sortConfig.key || !filteredUsers) return filteredUsers;

    return [...filteredUsers].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue === undefined || aValue === null) return 1;
      if (bValue === undefined || bValue === null) return -1;

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredUsers, sortConfig]);

  const totalPages = Math.ceil((sortedUsers?.length ?? 0) / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    if (!sortedUsers) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedUsers, currentPage, itemsPerPage]);

  const handleSort = (key: keyof User) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(paginatedUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, userId]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    }
  };

  const handleViewUser = (userId: string) => {
    console.log("View user:", userId);
  };

  const handleEditUser = (userId: string) => {
    console.log("Edit user:", userId);
  };

  const handleDeleteUser = (userId: string) => {
    console.log("Delete user:", userId);
  };

  const allSelected =
    paginatedUsers.length > 0 &&
    paginatedUsers.every((user) => selectedUsers.includes(user.id));
  const someSelected =
    selectedUsers.length > 0 &&
    paginatedUsers.some((user) => selectedUsers.includes(user.id)) &&
    !allSelected;

  // Format last online date
  const formatLastOnline = (dateString: string) => {
    if (!dateString) return "Never";
    const date = new Date(Number(dateString));
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Error state
  if (isError) {
    return (
      <div className="bg-neutral-01 rounded-lg border border-grey-stroke p-5">
        <div className="text-center py-10">
          <p className="text-error">Failed to load users. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-01 rounded-lg border border-grey-stroke p-5">
      <div className="w-full flex justify-between items-center mb-5">
        <Heading5>User List</Heading5>
        <div className="flex items-center gap-3">
          <SearchBarTable
            placeholder="Search user..."
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
          />
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as "All Status" | "Active" | "Inactive"
                )
              }
              className="px-4 h-9 text-xs font-medium border border-grey-stroke rounded-lg bg-neutral-01 focus:outline-none focus:ring-1 focus:ring-moss-stone"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={handleSelectAll}
              />
            </TableHead>
            <TableHead sortable onSort={() => handleSort("fullname")}>
              Name
            </TableHead>
            <TableHead sortable onSort={() => handleSort("isActive")}>
              Status
            </TableHead>
            <TableHead sortable onSort={() => handleSort("email")}>
              Email
            </TableHead>
            <TableHead sortable onSort={() => handleSort("role")}>
              Role
            </TableHead>
            <TableHead sortable onSort={() => handleSort("lastOnline")}>
              Last Online
            </TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow
                key={i}
                className={i % 2 !== 0 ? "bg-grey-lightest" : ""}
              >
                <TableCell>
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse shrink-0" />
                    <div className="flex flex-col gap-1">
                      <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell className="text-center py-10 text-grey-dark">
                  No users found
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell />
              </TableRow>
            ) : (
              paginatedUsers.map((user, index) => (
                <TableRow
                  key={user.id}
                  className={index % 2 !== 0 ? "bg-grey-lightest" : ""}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onChange={(checked) => handleSelectUser(user.id, checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-grey-lightest overflow-hidden shrink-0">
                        {user.profilePictureUrl ? (
                          <Image
                            src={user.profilePictureUrl}
                            alt={user.fullname}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-moss-stone text-white text-xs font-medium">
                            {user.fullname.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.fullname}</span>
                        <span className="text-xs text-grey-dark">
                          @{user.username}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-3 py-1 rounded-sm text-xs font-medium ${
                        user.isActive
                          ? "bg-success/10 text-success"
                          : "bg-error/10 text-error"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className="capitalize">
                      {user.role.toLowerCase()}
                    </span>
                  </TableCell>
                  <TableCell>{formatLastOnline(user.lastOnline)}</TableCell>
                  <TableCell>
                    <TableActions
                      onView={() => handleViewUser(user.id)}
                      onEdit={() => handleEditUser(user.id)}
                      onDelete={() => handleDeleteUser(user.id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        )}
      </Table>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default UsersContent;
