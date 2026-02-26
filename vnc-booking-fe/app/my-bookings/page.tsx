"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import {
  Calendar,
  Car,
  Home,
  Clock,
  MapPin,
  Users,
  Package,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface BookingItem {
  id: number;
  documentId: string;
  bookingId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  totalPrice: number;
  bookingStatus: string;
  createdAt: string;
  specialRequests?: string;
  type: "car" | "guest_house";
  // Car fields
  startDate?: string;
  endDate?: string;
  pickupLocation?: string;
  car?: { title: string; images?: { url: string }[] };
  // Guest house fields
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  guest_house?: { title: string; images?: { url: string }[] };
}

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  pending: {
    label: "Pendente",
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
  },
  confirmed: {
    label: "Confirmada",
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
  },
  cancelled: {
    label: "Cancelada",
    color: "text-red-700",
    bg: "bg-red-50 border-red-200",
  },
  completed: {
    label: "Concluída",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
  },
};

export default function MyBookingsPage() {
  const { user, isLoaded } = useUser();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "car" | "guest_house">("all");

  useEffect(() => {
    if (!isLoaded || !user) return;

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      setLoading(false);
      return;
    }

    fetch(`/api/my-bookings?email=${encodeURIComponent(email)}`)
      .then((res) => res.json())
      .then((data) => setBookings(data.data || []))
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, [isLoaded, user]);

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.type === filter);

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "dd MMM yyyy", { locale: pt });
    } catch {
      return dateStr;
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">A carregar as suas reservas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                As Minhas Reservas
              </h1>
              <p className="text-muted-foreground mt-1">
                Acompanhe o estado das suas reservas
              </p>
            </div>
            <Link
              href="/"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              ← Voltar ao início
            </Link>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "all"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              <Package className="inline-block w-4 h-4 mr-1" />
              Todas ({bookings.length})
            </button>
            <button
              onClick={() => setFilter("car")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "car"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              <Car className="inline-block w-4 h-4 mr-1" />
              Carros ({bookings.filter((b) => b.type === "car").length})
            </button>
            <button
              onClick={() => setFilter("guest_house")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "guest_house"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              <Home className="inline-block w-4 h-4 mr-1" />
              Guest Houses (
              {bookings.filter((b) => b.type === "guest_house").length})
            </button>
          </div>
        </div>
      </div>

      {/* Bookings list */}
      <div className="container mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhuma reserva encontrada
            </h3>
            <p className="text-muted-foreground mb-6">
              {filter === "all"
                ? "Ainda não tem reservas. Explore as nossas opções!"
                : `Não tem reservas de ${filter === "car" ? "carros" : "guest houses"}.`}
            </p>
            <Link
              href="/#car-rental"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Explorar opções
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((booking) => {
              const status = statusConfig[booking.bookingStatus] || statusConfig.pending;
              const isCar = booking.type === "car";
              const title = isCar
                ? booking.car?.title
                : booking.guest_house?.title;
              const image = isCar
                ? booking.car?.images?.[0]?.url
                : booking.guest_house?.images?.[0]?.url;
              const dateStart = isCar ? booking.startDate : booking.checkIn;
              const dateEnd = isCar ? booking.endDate : booking.checkOut;

              return (
                <div
                  key={`${booking.type}-${booking.id}`}
                  className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="sm:w-48 h-40 sm:h-auto flex-shrink-0">
                      <img
                        src={image || "/placeholder.svg?height=200&width=300"}
                        alt={title || "Reserva"}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {isCar ? (
                              <Car className="w-4 h-4 text-primary" />
                            ) : (
                              <Home className="w-4 h-4 text-primary" />
                            )}
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                              {isCar
                                ? "Aluguer de Carro"
                                : "Guest House"}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {title || "Reserva"}
                          </h3>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${status.bg} ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>
                            {dateStart
                              ? formatDate(dateStart)
                              : "—"}{" "}
                            →{" "}
                            {dateEnd
                              ? formatDate(dateEnd)
                              : "—"}
                          </span>
                        </div>

                        {isCar && booking.pickupLocation && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{booking.pickupLocation}</span>
                          </div>
                        )}

                        {!isCar && booking.guests && (
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span>{booking.guests} hóspede(s)</span>
                          </div>
                        )}

                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>
                            Criada em {formatDate(booking.createdAt)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t">
                        <div>
                          <span className="text-xs text-muted-foreground">
                            Ref: {booking.bookingId}
                          </span>
                        </div>
                        <div className="text-lg font-bold text-primary">
                          €{booking.totalPrice?.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
