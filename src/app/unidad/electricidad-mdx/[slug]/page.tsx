import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ElectricidadMdxRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/unidad/electricidad/${slug}`);
}
