"use client";

import ImageSlider from "@/components/common/image-slider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCarsData } from "@/lib/strapi-data";
import type { Car, CarOutputDTO, SelectedCar } from "@/lib/types";
import { useCars } from "@/lib/use-strapi-data";
import { CalendarDays, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface CarRentalSectionProps {
  t: any; // Translation object
  handleRentNowClick: (itemData: SelectedCar["data"]) => void;
}

export default function CarRentalSection({
  t,
  handleRentNowClick,
}: CarRentalSectionProps) {
  // const [cars, setCars] = useState<CarOutputDTO[]>([])
  // const [loading, setLoading] = useState(true)

  const { cars, loading, error } = useCars();

  // useEffect(() => {
  //   getCarsData()
  //     .then((carRental) => {
  //       setCars(carRental)
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch cars:", error)
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }, [])

  if (loading) {
    return (
      <section
        id="car-rental"
        className="section-container w-full py-12 md:py-16 lg:py-24 xl:py-32"
      >
        <div className="section-content">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
            <div className="space-y-2 max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-gray-700">
                {t.carRentalSectionTitle}
              </h2>
              <p className="max-w-[900px] mx-auto text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                {t.carRentalSectionSubtitle}
              </p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <Card
                key={i}
                className="flex flex-col overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <CardHeader className="pb-2">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardHeader>
                <CardContent className="flex-1 pt-0">
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (cars.length === 0) {
    return (
      <section
        id="car-rental"
        className="section-container w-full py-12 md:py-16 lg:py-24 xl:py-32"
      >
        <div className="section-content">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
            <div className="space-y-2 max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-gray-700">
                {t.carRentalSectionTitle}
              </h2>
              <p className="max-w-[900px] mx-auto text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                {t.carRentalSectionSubtitle}
              </p>
            </div>
          </div>
          {/* Coming Soon Promo */}
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/car-rental-coming-soon.png"
                alt="Car Rental - Coming Soon"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 text-white">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/90 rounded-full text-sm font-semibold mb-4 animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  {t.comingSoonBadge}
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                  {t.carPromoTitle}
                </h3>
                <p className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed">
                  {t.carPromoText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="car-rental"
      className="section-container w-full py-12 md:py-16 lg:py-24 xl:py-32"
    >
      <div className="section-content">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
          <div className="space-y-2 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-gray-700">
              {t.carRentalSectionTitle}
            </h2>
            <p className="max-w-[900px] mx-auto text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              {t.carRentalSectionSubtitle}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {cars.map((car: Car) => {
            const images: string[] = [];

            if (Array.isArray(car.images) && car.images.length > 0) {
              images.push(...car.images.map((i) => i.url));
            } else {
              images.push(
                `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(
                  car.title
                )}`
              );
            }

            return (
              <Card key={car.id} className="flex flex-col overflow-hidden w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] min-w-[300px] shadow-lg hover:shadow-xl transition-shadow duration-300">
                <ImageSlider images={images} alt={car.title} />
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl">
                    {car.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 text-sm flex-wrap">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span>
                        {car.seats} {t.seats}
                      </span>
                    </div>
                    <span className="mx-1">•</span>
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span>{car.transmission}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pt-0">
                  <p className="text-2xl sm:text-3xl font-bold">
                    €{car.price}
                    <span className="text-sm sm:text-base font-normal text-muted-foreground">
                      {t.perDay}
                    </span>
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    className="w-full text-base py-5"
                    onClick={() =>
                      handleRentNowClick({
                        id: car.id,
                        carId: car.carId,
                        images,
                        title: car.title,
                        seats: car.seats,
                        transmission: car.transmission,
                        price: car.price,
                        description: car.description,
                      })
                    }
                  >
                    {t.rentNow}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
