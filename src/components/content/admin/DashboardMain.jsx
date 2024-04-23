import React, { useEffect, useState } from "react";
import PageHeader from "../../shared/headers/PageHeader";
import {
  getPendingApplicationsAndPaymentsStats,
  getUserStats,
} from "../../../api/dashboardAPI";
import { USER_ROLES } from "../../../constant/general";
import PreLoading from "../../shared/loading/PreLoading";

const randomColors = [
  "text-green-500",
  "text-purple-500",
  "text-orange-500",
  "text-yellow-500",
  "text-purple-500",
];

const DashboardMain = () => {
  const [userStats, setUserStats] = useState([]);
  const [pendingStats, setPendingStats] = useState([]);
  const [preLoading, setPreLoading] = useState(true);

  useEffect(() => {
    Promise.all([getUserStats(), getPendingApplicationsAndPaymentsStats()])
      .then(([userStatsRes, pendingStatsRes]) => {
        setUserStats(userStatsRes.data);
        setPendingStats(pendingStatsRes.data);
        setPreLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <>
      <PageHeader title="Welcome to the Dashboard" />
      {preLoading ? (
        <PreLoading />
      ) : (
        <div className="w-full" data-testid="all-new-applications-main">
          <p className="text-3xl font-semibold mt-4 mb-4">Pending</p>
          <div className="container mx-auto">
            <div className="grid grid-cols-3 gap-4">
              {pendingStats?.map((status, i) => (
                <div className="p-4 bg-white rounded-lg shadow" key={i}>
                  <h2 className="mb-4 text-lg font-semibold">
                    {status?.status}
                  </h2>
                  <p className="text-6xl font-semibold text-pp-primary-600">
                    {status.count}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-3xl font-semibold mt-8 mb-4">Users</p>
            <div className="grid grid-cols-4 gap-4">
              {userStats?.map((role, i) => (
                <div className="p-4 bg-white rounded-lg shadow" key={i}>
                  <h2 className="mb-4 text-lg font-semibold">
                    {role?._id?.role === USER_ROLES.PASSENGER
                      ? "Passengers"
                      : role?._id?.role === USER_ROLES.ADMIN
                      ? "Admins"
                      : "Checkers"}
                  </h2>
                  <p className={`text-6xl font-semibold ${randomColors[i]}`}>
                    {role.count}
                  </p>
                </div>
              ))}
            </div>

            {/* <p className="text-3xl font-semibold mt-8 mb-4">Users</p> */}
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardMain;
