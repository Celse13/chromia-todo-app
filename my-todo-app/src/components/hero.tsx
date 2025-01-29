import { CheckCircle2 } from "lucide-react"

export function Hero() {
  return (
    <div className="relative">
      <div className="flex flex-col items-center space-y-4 text-center md:py-16">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter text-[#323232] sm:text-4xl md:text-5xl lg:text-6xl/none">
            Organize Your Tasks
          </h1>
          <p className="mx-auto max-w-[700px] text-[#323232]/80 md:text-xl pt-4">
            The simple todo app that helps you stay organized and get more done
          </p>
        </div>
        <div className="mt-6 flex items-center justify-center gap-4 text-sm text-[#323232]/70">
          <div className="flex items-center">
            <CheckCircle2 className="mr-1 h-4 w-4 text-orange-500" />
            Free Forever
          </div>
          <div className="flex items-center">
            <CheckCircle2 className="mr-1 h-4 w-4 text-orange-500" />
            No Credit Card
          </div>
        </div>
      </div>
    </div>
  )
}

