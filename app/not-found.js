// import Link from "next/link";

// export default function NotFound() {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-200 to-gray-300 perspective-1000">
//       <h2 className="text-6xl mb-4 text-gray-800 shadow-lg transform translate-z-10 rotate-y-[-10deg]">
//         Not Found
//       </h2>
//       <p className="text-2xl text-gray-600 shadow-md transform translate-z-5">
//         Could not find requested resource
//       </p>
//       <Link
//         href="/"
//         className="mt-6 px-6 py-2 text-lg text-white bg-blue-500 rounded transition-transform transform translate-z-2 hover:scale-105 hover:translate-z-5 shadow-md"
//       >
//         Return Home
//       </Link>
//     </div>
//   );
// }

"use client"; // Add this line

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-200 to-gray-300">
      <motion.h2
        className="text-4xl mb-4 text-gray-800 shadow-lg p-2 rounded-md border border-1 border-blue-200"
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        Oops! Page Not Found
      </motion.h2>
      <motion.p
        className="text-2xl text-gray-600 shadow-lg p-2 rounded-md border border-1 border-blue-200"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        We couldn’t locate the page you were looking for.
      </motion.p>
      <motion.a
        href="/"
        className="mt-6 px-6 py-2 text-lg text-white bg-blue-500 rounded shadow transition-transform duration-300 hover:scale-110 "
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      // whileHover={{ scale: 1.1 }}
      >
        Back to Home
      </motion.a>
    </div>
  );
}
