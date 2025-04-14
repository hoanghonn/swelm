import { UrlInput } from "@/components/url-input"
import { ChatInterface } from "@/components/chat-interface"
import { CategoryVisualization } from "@/components/category-visualization"

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle gradient background for light theme */}
      <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-br from-[#fff8f0] via-[#fff0f5] to-[#f0f5ff] opacity-70 -z-10"></div>

      <main className="h-screen flex flex-col">
        <h1 className="text-2xl font-bold text-gray-900 p-4 border-b border-gray-200">Software Engineering Notebook</h1>

        <div className="flex flex-1 overflow-hidden">
          {/* URL Input Section - First Column */}
          <section className="w-1/4 border-r border-gray-200 flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Add Resources</h2>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              <UrlInput />
            </div>
          </section>

          {/* Chat Interface Section - Second Column */}
          <section className="w-1/2 border-r border-gray-200 flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Chat with Your Knowledge</h2>
            </div>
            <div className="p-4 flex-1 overflow-y-auto flex flex-col">
              <ChatInterface />
            </div>
          </section>

          {/* Category Visualization Section - Third Column */}
          <section className="w-1/4 flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Your Software Engineering Knowledge</h2>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              <CategoryVisualization />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
