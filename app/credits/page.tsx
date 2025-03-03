"use client";

import React, { useEffect, useState } from "react";

const CreditsPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex justify-center items-center h-full w-full px-4">
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
                target="_blank"
              >
                Ye Banished Privateers
              </a>
              <span>, </span>
              <a
                href="https://www.youtube.com/@KennethLyVideography/featured"
                className="text-blue-400 hover:text-blue-300"
                target="_blank"
              >
                Kenneth Ly
              </a>{" "}
              and{" "}
              <a
                href="https://www.klockworks.se"
                className="text-blue-400 hover:text-blue-300"
                target="_blank"
              >
                Anton Klock
              </a>
              .
            </p>
          </section>

          {/* <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Technologies Used</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Next.js</li>
              <li>PixiJS</li>
              <li>Cloudflare</li>
            </ul>
          </section> */}

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Special Thanks</h2>
            <p>
              To everyone who contributed to making this interactive experience
              possible.
            </p>
          </section>

          <footer className="text-center text-sm text-gray-400 mt-16">
            <p>© 2025 All Rights Reserved</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CreditsPage;
