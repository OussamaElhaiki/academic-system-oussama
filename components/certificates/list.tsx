"use client"
import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"

type IProps = {
  certTypes: ICertType[]
  certificates: ICertificate[]
  setEditCert: (cert: ICertificate) => void
  onDelete: (id: string) => void
}

export function CertList(props: IProps) {
  const { certTypes, certificates, setEditCert, onDelete } = props
  const findType = (id?: string) => certTypes.find((i) => i.id === id)?.title

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">Name</th>
          <th scope="col" className="px-6 py-3">Note</th>
          <th scope="col" className="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white border-b">
        {certificates.map((c) => (
          <tr key={c.id}>
            <td className="px-6 py-4">{findType(c.typeId)}</td>
            <td className="px-6 py-4">{c.company}</td>
            <td className="px-6 py-4">
              <button title="Edit" onClick={() => setEditCert(c)}>
                <PencilIcon className="w-5 h-5 stroke-blue-600" />
              </button>
              <button title="Delete" onClick={() => onDelete(c.id ?? "")}>
                <TrashIcon className="w-5 h-5 stroke-red-600" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}