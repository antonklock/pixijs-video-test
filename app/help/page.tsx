"use client";

import React, { useEffect, useState } from "react";

const HelpPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex justify-center items-center h-full w-full px-4">
      <div
        className="min-h-screen text-white p-8 transition-opacity duration-1000"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center mb-8">Help</h1>

          <section className="space-y-6">
            <p className="text-lg">
              Having issues with the interactive music video? Make sure your
              browser version is up to date, or try switching to another
              browser. If you are playing on your smartphone, consider going on
              your computer instead. This might give you a better interactive
              experience.
            </p>

            <p className="text-lg">
              Questions? Send an email to{" "}
              <a
                href="mailto:info@yebanishedprivateers.com"
                className="text-blue-400 hover:text-blue-300"
              >
                info@yebanishedprivateers.com
              </a>
              . Please tag your email &quot;Raise Your Glass&quot;.
            </p>

            <p className="text-lg italic">
              Enjoy your stay at Cooper&apos;s Inn and good luck getting out
              before the song ends!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
