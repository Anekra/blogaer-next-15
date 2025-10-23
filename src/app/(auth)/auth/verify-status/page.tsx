"use client";

import { useParams, useSearchParams } from "next/navigation";
import React from "react";

export default function VerifyStatus() {
  // to be continued to make the verify status page
  const params = useSearchParams();
  return (
    <div>
      <ul>
        <li>Request: {params.get("request")}</li>
        <li>Verified: {params.get("verified")}</li>
        <li>Message: {params.get("message")}</li>
      </ul>
    </div>
  );
}
