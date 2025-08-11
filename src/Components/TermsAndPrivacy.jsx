import React from "react";

export default function TermsAndPrivacy({ response }) {
  let htmlContent = response;

  if (htmlContent?.includes(":")) {
    htmlContent = htmlContent?.split(":")[1].trim();
  }

  htmlContent = htmlContent?.replace(/^"|"$/g, "");

  htmlContent = htmlContent?.replace(/\\r\\n/g, "");

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
