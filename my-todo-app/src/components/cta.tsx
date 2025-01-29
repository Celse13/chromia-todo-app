import { MetaMaskButton } from "./MetaMaskButton"

export function CTA() {
  return (
    <section className="">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <div className="flex w-full max-w-sm flex-col gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">continue with</span>
            </div>
          </div>
          <MetaMaskButton />
        </div>
      </div>
    </section>
  )
}

