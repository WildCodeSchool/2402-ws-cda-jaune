import Header from "../../components/Header";
import { useRouter } from "next/router";

export default function AdDetail() {
    const router = useRouter()
  return (
      <p>Data about Ad n°{router.query.id}</p>
  );
}
