import { useParams } from "react-router";

export default function AssetType() {
  const { id } = useParams();

  return <div>AssetType {id}</div>;
}
