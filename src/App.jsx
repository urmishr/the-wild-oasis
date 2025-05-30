import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import TestingForm from "./ui/TestingForm";
import BookingDetailPage from "./pages/BookingDetailPage";
import CheckinBooking from "./features/check-in-out/CheckinBooking";
import CheckIn from "./pages/CheckIn";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <DarkModeProvider>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace("/")}
      >
        <QueryClientProvider client={queryClient}>
          <Toaster
            gutter={12}
            containerClassName="toast-notification"
            toastOptions={{
              style: {
                padding: "16px 24px",
                maxWidth: "fit-content",
              },
            }}
          />
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="/dashboard" index element={<Dashboard />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route
                  path="/bookings/:bookingId"
                  element={<BookingDetailPage />}
                />
                <Route path="/checkin/:bookingId" element={<CheckIn />} />
                <Route path="/cabins" element={<Cabins />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/account" element={<Account />} />
              </Route>
              <Route path="/testform" element={<TestingForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ErrorBoundary>
    </DarkModeProvider>
  );
}
