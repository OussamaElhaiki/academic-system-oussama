"use client"
import { FormFields } from "./form-fields"
import { CertList } from "./list"
import { useEffect, useState } from "react"
import { getApi, deleteApi } from "@/utils/server-api"
import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"
import { XMarkIcon } from "@heroicons/react/24/outline"

type IProps = { certTypes: ICertType[] }

export function Wrapper(props: IProps) {
  const { certTypes } = props
  const [editCert, setEditCert] = useState<ICertificate | undefined>()
  const [certificates, setCertificates] = useState<ICertificate[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const getCertFromApi = () => {
    getApi<ICertificate[]>(`/api/certificates`).then((res) => {
      setCertificates(res ?? [])
    })
  }

  useEffect(() => { getCertFromApi() }, [])

  const handleDelete = async (id: string) => {
    await deleteApi(`/api/certificates`, id)
    getCertFromApi()
  }

  const handleEdit = (cert: ICertificate) => {
    setEditCert(cert)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setEditCert(undefined)
  }

  const handleSaved = () => {
    getCertFromApi()
    handleClose()
  }

  return (
    <div className="grid gap-y-8">
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          + Add Certificate
        </button>
      </div>

      <CertList
        certTypes={certTypes}
        certificates={certificates}
        setEditCert={handleEdit}
        onDelete={handleDelete}
      />

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold mb-4">
              {editCert ? "Edit Certificate" : "Add Certificate"}
            </h2>
            <FormFields
              certTypes={certTypes}
              getCertFromApi={handleSaved}
              setEditCert={setEditCert}
              editCert={editCert}
            />
          </div>
        </div>
      )}
    </div>
  )
}
