import { useParams } from "react-router";

export default function CategoryTypeDetail() {
  const { id } = useParams();
  return <div>Detail for category type with ID: {id}</div>;
}
