import { GroupService } from "@/services/group-service"

export async function GET() {
  const groupService = new GroupService()
  const groups = await groupService.getGroups()
  return Response.json(groups)
}
