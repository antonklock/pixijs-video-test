import React from "react";
import useAlertStore from "@/stores/Alerts/AlertStore";

const Alerts = () => {
  const { alerts } = useAlertStore();

  const displayedAlerts = alerts.slice(-3);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col-reverse items-end z-50 gap-2">
      {displayedAlerts.map((alert, index) => {
        const isThirdAlert = index === displayedAlerts.length - 1;
        const opacityClass = isThirdAlert ? "opacity-25" : "opacity-100";

        const textColor = "text-" + alert.color + "-950";

        return (
          <div
            key={index}
            className={`alert bg-${alert.color}-500 ${opacityClass} transition-opacity duration-300 p-4 rounded-lg`}
          >
            <h4 className={`font-semibold ${textColor}`}>{alert.title}</h4>
            <p className={`text-sm ${textColor}`}>{alert.message}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Alerts;
