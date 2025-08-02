import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 bg-gradient-to-br from-gray-700 to-gray-800">
        <div className="h-6 w-6 rounded-sm bg-gradient-to-br from-orange-400 to-orange-500"></div>
      </div>
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-white">
          TechTitans
        </h1>
        <p className="text-xs font-medium text-gray-400">Robotics Team 2847</p>
      </div>
    </Link>
  );
}
