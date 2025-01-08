const Sidebar = () => (
  <main className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="lg:hidden py-16 text-center">
      <button
        type="button"
        className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 border border-gray-800 text-white text-sm font-medium rounded-lg shadow-sm align-middle hover:bg-gray-950 focus:outline-none focus:bg-gray-900 dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="hs-sidebar-basic-usage"
        aria-label="Toggle navigation"
        data-hs-overlay="#hs-sidebar-basic-usage"
      >
        Open
      </button>
    </div>

    <div
      id="hs-sidebar-basic-usage"
      className="hs-overlay [--auto-close:lg] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 w-64
hs-overlay-open:translate-x-0
-translate-x-full transition-all duration-300 transform
h-full
hidden
fixed top-0 start-0 bottom-0 z-[60]
bg-white border-e border-gray-200 dark:bg-neutral-800 dark:border-neutral-700"
      role="dialog"
      aria-label="Sidebar"
    >
      <div className="relative flex flex-col h-full max-h-full ">
        <header className="p-4 flex justify-between items-center gap-x-2">
          <a
            className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
            href="#"
            aria-label="Brand"
          >
            Post Generator
          </a>

          <div className="lg:hidden -me-2">
            <button
              type="button"
              className="flex justify-center items-center gap-x-3 size-6 bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              data-hs-overlay="#hs-sidebar-basic-usage"
            >
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
        </header>

        <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          <div className=" pb-0 px-2  w-full flex flex-col flex-wrap">
            <ul className="space-y-1">
              <li>
                <a
                  className="flex items-center gap-x-3 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-600 dark:bg-neutral-700 dark:text-white"
                  href="#"
                >
                  <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Your Posts
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </main>
);

export default Sidebar;
