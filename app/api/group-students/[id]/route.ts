import { GroupStudentService } from "@/services/group-student-service"
import { NextRequest } from "next/server"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const service = new GroupStudentService()
  const students = await service.getByGroup(id)
  return Response.json(students)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const service = new GroupStudentService()
  await service.deleteStudent(id)
  return Response.json({ message: "Student deleted successfully" })
}
