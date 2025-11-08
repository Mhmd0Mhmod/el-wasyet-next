"use client";
function Error({ error }: { error: Error & { digest?: string } }) {
  console.error(error);
  return null;
}

export default Error;
