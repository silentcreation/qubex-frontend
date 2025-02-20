import { redirect } from "next/navigation";

export default async function LocaleIndexPage(props: {
  params: { locale: string };
}) {
  const resolvedParams = await Promise.resolve(props.params);
  const { locale } = resolvedParams;
  
  redirect(`/${locale}/swap`);
}
