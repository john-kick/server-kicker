import { redirect } from "next/navigation";
import { metadata } from "./metadata";

export { metadata };

export default function Home() {
  redirect("/dashboard");
}
