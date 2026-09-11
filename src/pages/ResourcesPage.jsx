import React from "react";
import { RegistrationForm } from "../components/resources/RegistrationForm";
import { ResourceDirectory } from "../components/resources/ResourceDirectory";
import { ReliefCenterForm } from "../components/resources/ReliefCenterForm";

export const ResourcesPage = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">

      {/* Volunteer / NGO / Resource Provider */}
      <RegistrationForm />

      {/* Relief Center Registration */}
      <ReliefCenterForm />

      {/* Existing Resource Directory */}
      <ResourceDirectory />

    </div>
  );
};