// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { Check } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import todoImage from "../../public/todo-image.png"
// import { useSessionContext } from "@/components/ContextProvider";
// import { MetaMaskButton } from "@/components/MetaMaskButton";
// import { useTodos } from "@/hooks/todo";
// import TodoItem from "@/components/TodoItem";

// export default function Todo() {
//   const session = useSessionContext()
//   console.log("accountId==============>", session?.account.id)
//   const [showWalletModal, setShowWalletModal] = useState(false);
  
//   const { todos, isLoading, reload } = useTodos();

//   useEffect(() => {
//     if (session) {
//       setShowWalletModal(false);
//     }
//   }, [session]);

//   return (
//     <main className="min-h-screen bg-gray-50">
//       <header className="border-b bg-white">
//         <div className="container mx-auto px-4 h-16 flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <span className="text-2xl font-bold">TODO</span>
//             <Check className="text-orange-500 w-6 h-6" />
//           </div>
          
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-16">
//         <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
//           <div className="order-2 lg:order-1">
//             <div className="flex justify-center items-center">
//               <Image
//                 src={todoImage}
//                 alt="Todo List Illustration"
//                 width={500}
//                 height={500}
//                 priority
//                 className="w-full max-w-lg object-contain"
//               />
//             </div>
//           </div>
//           <div className="space-y-8 order-1 lg:order-2">
//             <div>
//               <h1 className="text-4xl font-bold mb-4">What We Offer</h1>
//               <div className="space-y-3">
//                 {["Organized", "Efficient", "Productive", "Focused", "Reliable"].map((feature) => (
//                   <div key={feature} className="flex items-center space-x-2">
//                     <Check className="text-green-500 w-5 h-5" />
//                     <span className="text-gray-700">{feature}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="space-y-4">
//               <Button size="lg" className="w-full md:w-auto" onClick={() => setShowWalletModal(true)}>
//                 Get Started
//               </Button>
//             </div>
//           </div>
//         </div>
//         {todos?.todos.map((todo) => (
//           <TodoItem 
//             key={todo.id} 
//             todo={todo} 
//             onUpdate={reload}
//           />
//         ))}
//       </div>
//       <Dialog open={showWalletModal} onOpenChange={setShowWalletModal}>
//         <DialogContent className="sm:max-w-[375px]">
//           <DialogHeader>
//             <DialogTitle className="text-center text-xl font-bold">Connect MetaMask</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4 p-2 flex flex-col items-center justify-center">
//             <MetaMaskButton />
//           </div>
//         </DialogContent>
//       </Dialog>
//     </main>
//   )
// }