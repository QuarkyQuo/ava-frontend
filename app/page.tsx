import { InitialModal } from "@/components/modals/initial-modal";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <InitialModal />
      <h1 className="text-6xl font-bold text-center">Welcome to Next.js!</h1>

    </div>
  )
}
