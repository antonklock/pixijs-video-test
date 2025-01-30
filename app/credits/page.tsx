"use client";

import React, { useEffect, useState } from "react";

const CreditsPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div
        className="min-h-screen  text-white p-8 transition-opacity duration-1000"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <div className="max-w-2xl mx-auto space-y-12">
          <h1 className="text-4xl font-bold text-center mb-12">Credits</h1>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Development Team</h2>
            <p>
              Created by{" "}
              <a
                href="https://www.yebanishedprivateers.com/"
                className="text-blue-400 hover:text-blue-300"
              >
                Ye Banished Privateers
              </a>
              , Kenneth Ly and{" "}
              <a
                href="https://www.klockworks.se"
                className="text-blue-400 hover:text-blue-300"
              >
                Anton Klock
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Technologies Used</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Next.js</li>
              <li>PixiJS</li>
              <li>Mux</li>
              <li>Cloudflare</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Special Thanks</h2>
            <p>
              To everyone who contributed to making this interactive experience
              possible.
            </p>
          </section>

          <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-sm text-gray-400 mt-16">
            <p>© 2025 All Rights Reserved</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CreditsPage;
