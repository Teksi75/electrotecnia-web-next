import { permanentRedirect } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ElectricidadMdxLegacyRoute({ params }: PageProps) {
  const { slug } = await params;
  permanentRedirect(`/unidad/electricidad/${slug}`);
}
