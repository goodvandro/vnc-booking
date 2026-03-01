import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getDashboardStats } from "./actions"
import Link from "next/link"
import { Calendar, Home, Car, Clock, CheckCircle, XCircle, DollarSign, TrendingUp, Building, Package } from "lucide-react"

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do sistema de reservas</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reservas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">Todos os tipos combinados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reservas Guest House</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.guestHouseBookings}</div>
            <p className="text-xs text-muted-foreground">Reservas de alojamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alugueres de Carros</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.carRentalBookings}</div>
            <p className="text-xs text-muted-foreground">Reservas de veículos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">De todas as reservas</p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory + Status */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Inventory */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Inventário
            </CardTitle>
            <CardDescription>Recursos disponíveis no sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-blue-500" />
                <span>Carros registados</span>
              </div>
              <span className="font-medium text-lg">{stats.totalCars}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-purple-500" />
                <span>Guest Houses registadas</span>
              </div>
              <span className="font-medium text-lg">{stats.totalGuestHouses}</span>
            </div>
          </CardContent>
        </Card>

        {/* Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Estado das Reservas
            </CardTitle>
            <CardDescription>Distribuição por estado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span>Pendentes</span>
              </div>
              <span className="font-medium bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full text-sm">{stats.pendingBookings}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Confirmadas</span>
              </div>
              <span className="font-medium bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-sm">{stats.confirmedBookings}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span>Canceladas</span>
              </div>
              <span className="font-medium bg-red-50 text-red-700 px-2 py-0.5 rounded-full text-sm">{stats.cancelledBookings}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span>Concluídas</span>
              </div>
              <span className="font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-sm">{stats.completedBookings}</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Ações Rápidas
            </CardTitle>
            <CardDescription>Gerir o sistema de reservas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href="/guest-house-bookings">
                <Home className="h-4 w-4 mr-2" />
                Reservas Guest House
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/car-rental-bookings">
                <Car className="h-4 w-4 mr-2" />
                Reservas de Carros
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/guest-houses">
                <Building className="h-4 w-4 mr-2" />
                Gerir Guest Houses
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/cars">
                <Car className="h-4 w-4 mr-2" />
                Gerir Carros
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
