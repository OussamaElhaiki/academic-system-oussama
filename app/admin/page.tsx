import { auth } from "@/utils/auth"
import { Role } from "@/constants/role"
import { connectMongoose } from "@/utils/mongoose-client"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import mongoose from "mongoose"

interface IUser {
  _id: string
  email: string
  name?: string
  role?: string
  createdAt?: Date
}

async function getUsers(): Promise<IUser[]> {
  await connectMongoose()
  const db = mongoose.connection.db!
  return db.collection<IUser>("users").find({}).toArray()
}

async function getUserRole(userId: string): Promise<string | undefined> {
  await connectMongoose()
  const db = mongoose.connection.db!
  const user = await db.collection("users").findOne({ _id: new mongoose.Types.ObjectId(userId) })
  return user?.role
}

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user?.id) redirect("/")

  const role = await getUserRole(session.user.id)

  if (role !== Role.Administrator) {
    redirect("/")
  }

  const users = await getUsers()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin — Users</h1>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3">Created</th>
          </tr>
        </thead>
        <tbody className="bg-white border-b">
          {users.map((u) => (
            <tr key={u._id.toString()}>
              <td className="px-6 py-4">{u.name ?? "—"}</td>
              <td className="px-6 py-4">{u.email}</td>
              <td className="px-6 py-4">{u.role ?? "user"}</td>
              <td className="px-6 py-4">
                {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
