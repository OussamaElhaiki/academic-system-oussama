import { GroupStudent, IGroupStudent } from "@/models/group-student-model"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"

export class GroupStudentService {
  async getByGroup(groupId: string): Promise<IGroupStudent[]> {
    await connectMongoose()
    return await GroupStudent.find({ groupId })
  }

  async deleteStudent(studentId: string): Promise<void> {
    await connectMongoose()
    await GroupStudent.deleteOne({ _id: new Types.ObjectId(studentId) })
  }
}
