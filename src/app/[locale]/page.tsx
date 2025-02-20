import { redirect } from "next/navigation";

export default async function LocaleIndexPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  redirect(`/${locale}/swap`);
}