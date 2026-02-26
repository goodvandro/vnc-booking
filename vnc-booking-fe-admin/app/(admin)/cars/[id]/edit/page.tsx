import { getCarByIdData } from "@/lib/strapi-data"
import CarForm from "../../form"
import { notFound } from "next/navigation"

interface EditCarPageProps {
  params: Promise<{ id: string }>
}

export default async function EditCarPage({ params }: EditCarPageProps) {
  const { id } = await params

  const car = await getCarByIdData(id)

  if (!car) {
    notFound()
  }

  return <CarForm initialData={car} />
}
