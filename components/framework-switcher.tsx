"use client"

export function FrameworkSwitcher() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="text-sm font-semibold text-gray-700 mb-2">Framework:</div>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 text-sm rounded bg-blue-600 text-white">React</span>
          <a
            href="/vue"
            className="px-3 py-1.5 text-sm rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            Vue.js
          </a>
          <a
            href="/twig"
            className="px-3 py-1.5 text-sm rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            Twig
          </a>
        </div>
      </div>
    </div>
  )
}
