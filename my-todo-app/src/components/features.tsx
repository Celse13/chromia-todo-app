import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { CheckSquare, ListTodo, Repeat, Shield, Smartphone, Zap } from "lucide-react"
import { CTA } from "./cta"

const features = [
  {
    title: "Organized",
    description: "Keep all your tasks neatly organized in one place",
    icon: ListTodo,
  },
  {
    title: "Efficient",
    description: "Streamlined interface for quick task management",
    icon: Zap,
  },
  {
    title: "Productive",
    description: "Stay focused and get more done with our intuitive tools",
    icon: CheckSquare,
  },
  {
    title: "Focused",
    description: "Minimize distractions and maximize productivity",
    icon: Smartphone,
  },
  {
    title: "Reliable",
    description: "Your tasks are safely stored and always accessible",
    icon: Shield,
  },
  {
    title: "Sync",
    description: "Automatically syncs across all your devices",
    icon: Repeat,
  },
]

export function Features() {
  return (
    <section id="features" className="space-y-8">
      <CTA />
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] text-[#323232] sm:text-3xl md:text-5xl">What We Offer</h2>
        <p className="max-w-[85%] leading-normal text-[#323232]/80 sm:text-lg sm:leading-7">
          Everything you need to manage your tasks effectively and boost your productivity.
        </p>
      </div>
      <div className="mx-auto grid gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="bg-[#F1ECE6]">
            <CardHeader>
              <feature.icon className="h-10 w-10 text-orange-500" />
              <CardTitle className="text-xl text-[#323232]">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-[#323232]/70">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

