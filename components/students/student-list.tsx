"use client"

import { IGroup } from "@/models/group-model"
import { IGroupStudent } from "@/models/group-student-model"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

type IProps = {
  groups: IGroup[]
}

export function StudentList({ groups }: IProps) {
  const [students, setStudents] = useState<IGroupStudent[]>([])

  async function handleGroupClick(groupId: string) {
    if (!groupId) {
      setStudents([])
      return
    }
    const res = await fetch(`/api/group-students/${groupId}`)
    const data: IGroupStudent[] = await res.json()
    setStudents(data)
  }

  async function handleDelete(studentId: string) {
    await fetch(`/api/group-students/${studentId}`, { method: "DELETE" })
    setStudents((prev) => prev.filter((s) => s.id !== studentId))
  }

  return (
    <div className="grid grid-flow-row gap-y-6">
      <div className="flex items-center gap-x-3">
        <label htmlFor="group" className="text-sm font-medium text-gray-900">
          Select Group
        </label>
        <select
          id="group"
          onChange={(e) => handleGroupClick(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
        >
          <option value="">--</option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      {students.length > 0 && (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">First Name</th>
              <th className="px-6 py-3">Last Name</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white border-b">
            {students.map((s) => (
              <tr key={s.id}>
                <td className="px-6 py-4">{s.firstName}</td>
                <td className="px-6 py-4">{s.lastName}</td>
                <td className="px-6 py-4">
                  <button title="Delete" onClick={() => handleDelete(s.id ?? "")}>
                    <TrashIcon className="w-5 h-5 stroke-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
