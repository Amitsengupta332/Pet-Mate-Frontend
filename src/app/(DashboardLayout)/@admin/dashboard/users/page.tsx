import UsersTable from "@/components/modules/dashboard/admin/usersTable";
import { getAllUsers } from "@/services/admin";

export default async function AdminUsersPage() {
  const res = await getAllUsers();
  const users = res?.data || [];

  return (
    <div className="p-4 sm:p-6">
      <UsersTable users={users} />
    </div>
  );
}