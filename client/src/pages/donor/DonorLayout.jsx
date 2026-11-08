import { Outlet } from "react-router-dom";
import DonorProvider from "./DonorProvider";

export default function DonorLayout() {
  return (
    <DonorProvider>
      <Outlet />
    </DonorProvider>
  );
}
