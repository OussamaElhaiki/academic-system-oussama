"use client"
import { FormFields } from "./form-fields"
import { CertList } from "./list"
import { useEffect, useState } from "react"
import { getApi, deleteApi } from "@/utils/server-api"
import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"

type IProps = { certTypes: ICertType[] }

export function Wrapper(props: IProps) {
  const { certTypes } = props
  const [editCert, setEditCert] = useState<ICertificate | undefined>()
  const [certificates, setCertificates] = useState<ICertificate[]>([])

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

  return (
    <div className="grid gap-y-8">
      <FormFields certTypes={certTypes} getCertFromApi={getCertFromApi} setEditCert={setEditCert} editCert={editCert} />
      <CertList certTypes={certTypes} certificates={certificates} setEditCert={setEditCert} onDelete={handleDelete} />
    </div>
  )
}