import { Group, IGroup } from "@/models/group-model"
import { connectMongoose } from "@/utils/mongoose-client"

export class GroupService {
  async getGroups(): Promise<IGroup[]> {
    await connectMongoose()
    return await Group.find()
  }
}
