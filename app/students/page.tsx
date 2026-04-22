import { StudentList } from "@/components/students/student-list"
import { IGroup } from "@/models/group-model"
import { getApi } from "@/utils/server-api"

export default async function StudentsPage() {
  const groups = await getApi<IGroup[]>("/api/groups")

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Group Students</h1>
      <StudentList groups={groups ?? []} />
    </div>
  )
}
