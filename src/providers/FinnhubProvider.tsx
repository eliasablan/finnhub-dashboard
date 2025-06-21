"use client";

import {
  finnhubClient,
  FinnhubProvider as FinnhubProviderBase,
} from "react-finnhub";

const finnhubApiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY!;
const fhClient = finnhubClient(finnhubApiKey);

export const FinnhubProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <FinnhubProviderBase client={fhClient}>{children}</FinnhubProviderBase>
  );
};

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <FinnhubProvider>
//           <NuqsAdapter>{children}</NuqsAdapter>
//         </FinnhubProvider>
//       </body>
//     </html>
//   );
// }
