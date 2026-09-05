 
import AllSittersView from "@/components/modules/dashboard/sitter/allSittersView";
import { getAllSitters } from "@/services/sitter";

export default async function BrowseSittersPage() {
  const res = await getAllSitters();
  const sitters = res?.data || [];

  return <AllSittersView sitters={sitters} />;
}